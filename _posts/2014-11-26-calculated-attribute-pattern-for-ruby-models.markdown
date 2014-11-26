---
layout: blog
title: Calculated Attribute Pattern for Ruby Models
---

Sometimes in a Rails application a model has attributes whose values need to be computed. For example, at [Mystery Science][1], we have a `Viewing` model that is created when a lesson has been viewed. This model is associated with actions that a teacher took with a lesson (e.g., playing a video, entering full screen mode, etc.). If we want to know how much time the teacher spent watching the videos, we need to calculate the value:

{% highlight ruby %}
class Viewing

  def seconds_spent_watching_videos
    @seconds_spent_watching_videos ||= videos_played.sum do |play|
      play.duration
    end
  end

end
{% endhighlight %}

It's advisable to at least [memoize][2] this attribute so it doesn't have to be recalculated more than once for the same instance. But, when dealing with a collection of viewings, the calculation has to be performed on each one. That means querying is very expensive and can't be done in SQL. Let's store the value in the table instead:

{% highlight ruby %}
class AddSecondsSpentWatchingVideosToViewings < ActiveRecord::Migration

  def change
    add_column :viewings, :seconds_spent_watching_videos, :float
  end

end
{% endhighlight %}

Now, you need a method to update that value. You might be inclined to write a `calculate_seconds_spent_watching_videos` method that you call `before_validation`. That approach works just fine but it clutters up your model; consider that there may be more other attributes like this one. Here's a pattern that I've used that works really well in these cases:

{% highlight ruby %}
class Viewing

  def seconds_spent_watching_videos(options = {})
    if options[:reload]
      @seconds_spent_watching_videos ||= videos_played.sum do |play|
        play.duration
      end
    else
      read_attribute :seconds_spent_watching_videos
    end
  end

end
{% endhighlight %}

Here, I'm overwritting the attribute's accessor method to take options. If you call it normally, `viewing.seconds_spent_watching_videos`, you'll get the value from the database. But if you call it with the reload option, `viewing.seconds_spent_watching_videos(reload: true)`, you'll get the calculated value. You still need to `write_attribute` at some point — a callback may still be the right place for that — but I'm of the opinion that your "getter" shouldn't double as a "setter."

I've used this pattern throughout my Rails applications and it's been really useful. Hopefully, it's useful for you as well.

[1]: http://mysteryscience.com
[2]: http://www.justinweiss.com/blog/2014/07/28/4-simple-memoization-patterns-in-ruby-and-one-gem/
