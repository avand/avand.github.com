---
layout: blog
title: "CSS Tricks (1 of 2): First, Get Down with the OOP"
---
##Introduction##

I recently stumbled upon an [interesting web design blog](http://www.evoart.info/) that featured an article about some [CSS "essentials"](http://www.evoart.info/10-essential-considerations-when-designing-a-website/) and commonly used [CSS code snippets](http://www.evoart.info/7-essential-css-code-snippets/). I read it with a great amount of interest and found that I had a few tricks and tips up my sleeve that I'd like to contribute as well. So this is the first in a two part post about how to improve your CSS and make the design process more fun and less stressful.

I immediately found that a lot of my tricks don't actually have anything to do with visual design or CSS at all, but more about structure and design patterns. Funny, how that sort of thing happens when you learn how to code first. I've found that you can bring a lot of the organization and philosophies that come from structuring application code right into the presentation layer. Here's what I've learned...

##Embrace a Convention Through and Through##

Seriously, if you're not using some kind of structure when it comes to building an application, you should probably [go read some other blog](http://failblog.org/). I'm somewhat infatuated with the MVC pattern these days, but for the sake of what we're doing here I don't know that it matters.

The idea is that you have various objects or models throughout your code. You may have some Users, Products, or Messages. The problem is that by the time they get to the view part of your application, their meaning has been diluted. Distill it.

You have a fairly [common set of tasks for any object](http://en.wikipedia.org/wiki/Create,_read,_update_and_delete): List (index), view (show), create (new), update (edit), and delete (destroy). Almost all of those require a presentation of some kind, with the exception of delete, usually. There's an obvious Ruby slant in these snippets, but I think you can handle it:

Users#index

{% highlight erb %}
<div id="users"><!-- Derive this from the controller -->
  <% for user in @users -%>
  <div class="user">
    <p><%= user.name -%></p>
  </div>
  <% end -%>
</div>
{% endhighlight %}

Users#show

{% highlight erb %}
<div id="user">
  <h3><%= @user.name -%></h3>
</div>
{% endhighlight %}

Users#new

{% highlight erb %}
<div id="user">
  <form><!-- Key off this in the CSS (i.e. #user form input) -->
    <input type="text" value="<%= @user.name -%>" />
  </form>
</div>
{% endhighlight %}

With this kind of structure, your CSS stays organized and follows much of the meaning defined by the business objects themselves. I would encourage designers to try and think as much like this as possible.

Instead of reinventing names for classes and ID's look to the structure of the application code first and let it drive the front end.

##Don't Over Refactor CSS##

Just like with code, your CSS can become overly abstract. If you need to style a single element on a single page, start with inline styles. An ASP.NET developer once told me, "never use inline styles - everything needs to have corresponding class or ID." That attitude is part of what's contributed to my career switch to Ruby on Rails. Don't create a class for it until you see commonalities start to evolve.

An example: You may find that you're putting a paragraph that needs a particularly attention grabbing look. Start with a paragraph and set its style attribute. Make it look just the way you need to for that one instance. As you continue to work on the site you may find that you want a link to actually look similar to that paragraph, maybe they're both a specific shade of red. Go back to that paragraph, remove the color property, and create a class called .red, which you can now apply to both. The growth is now organic and maintainable.

##Tame the CSS File##

Whether it be in a Controller, Stored Procedure, or CSS, it's not OK for files to just grow to thousands of lines without taking a step back and saying, "woah", what just happened here? To avoid this little conundrum I like to use the [CSS @import function](http://www.cssnewbie.com/css-import-rule/). Group common styles together and import them when the page renders to make the developers lives easier.

I know what you're going to say. There's a significant performance hit for this, and I hear you. It's not OK to go to production using @import, because each file will require [another HTTP request, which isn't cool](http://developer.yahoo.com/performance/rules.html). But, if you're doing anything serious, you'll have a deployment process and you should let that piece of the puzzle take care of grabbing the CSS and compiling it all together into one file.

###Be #as .Specific .as:Possible##

It's very easy to be lazy with CSS and end up with thousands of styles that conflict with one another. You also may not realize that there is common styling between elements that could be "refactored."

Let your CSS selectors follow the DOM as closely as possible. If you look back to the index example above you could easily just style off of .user, but that's exactly the type of laziness I'm talking about. Use #users .user instead. It will make life easier in the long run, and isn't that what development is all about?

##Conclusion and What's to Come...##

The approaches here are pretty high level, but in the next part of this post (Part 2, for those you playing at home), I'll talk with about more concrete examples on a line-by-line basis.
