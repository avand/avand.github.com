---
layout: blog
title: "The Big Bang Rewrite (Part 2): API First"
---
As I discussed in my [previous post][p1], rebuilding Fave was motivated entirely by the desire for better data. The core focus was not rapid front facing development, but almost entirely back end work. In essence, we started with our API.

One of the features Rails boasts as an application framework is that out of the box, it lends itself to API support. Every controller/action that is generated includes responses for XML based requests. I would challenge most applications to try and publicize an API using the default Rails setup. It's likely not even close to the end result you'd expect. But that's OK - no application framework should satisfy that expectation.

At first, our API, was <code>script/console</code>. But, of course, that only got us so far. With our new data model, objects that used to be represented as one were now two three or four different objects. We had normalized our data - aware of the penalties and overhead that would haunt us along the way.

As a result of this normalization, we make heavy use of virtual attributes. It had to be possible to create a Business with one HTTP POST. Phone numbers on businesses, for example, work like so:

{% highlight ruby %}
class Business < ActiveRecord::Base
  attr_writer :phone_numbers_attributes # [{ :area_code => 312, :exchange => 123, :suffix => 3333 }, ...]
  
  before_validation :set_phone_numbers_from_virtual_attribute
  
  private
    
    def set_phone_numbers_from_virtual_attribute
      @phone_numbers_attributes.each do |phone_number_attributes|
        self.phone_numbers << PhoneNumber.new(phone_number_attributes)
      end if @phone_numbers_attributes
    end
end
{% endhighlight %}

In some places take advantage of <code>accepts_nested_attributes_for</code>, however, we found it wouldn't play nicely with polymorphic associations and were uncomfortable with unknowns it introduced. We've found it's best to write it yourself first, then find abstractions and helpers on a need by need basis.

The controllers, all the meanwhile, have remained "skinny" in spite of complexity. We've rigorously moved logic down into the model layer so that the various security components would be the only core responsibility for the controllers. I will go into detail with our approach to security in the next post.

We needed to get data into the application as quickly as possible. As a result, we spent time on an application to simply wrap up the HTTP side of things. It enabled us to create a hash on one end that represented the structure we desired, make the post to the server, and end up with a usable object on the other end. In some ways it is a lot like ActiveResource, and in fact we made enormous progress simply using ActiveResource. But again, our needs grew.

For the longest time, the views of the new site were simply a wrapper to the API. The majority of the teams effort was building the API and other scripts/applications that consumed it. This made for quite a refreshing approach to views, which I'll discuss in more detail in a later post. The API had forced us to think about what data inputs and outputs were core to the application. It satisfied all the application's needs first. We no longer had to include messy scripts into our application that relied on directly interfacing with our models to import data. Everything consumed the API. Even the views simply consumed that core data. 

All things considered, the API first approach is not one I would recommend to everyone. At Fave, our data is completely core to our business and as a result it seemed appropriate and has paid us in dividends. A site like [Piggy Back](http://piggyback.it) has far simpler data structures with the user interface demanding much more focus. In this case an "API first" approach would likely be the wrong choice. Although even there I will note that through the process of making the interface more accessible, for example from an iPhone or mobile device, I was forced to clean up my controller and think harder about what data they should and should not be passing in and out. It's an exercise that every developer should practice and one that has become our regiment at Fave.

Go back to [part one][p1] or read [part three][p3].

[p1]: /2009-12-07-the-big-bang-rewrite-first-ask-why.html
[p3]: /2009/12/13/the-big-bang-rewrite-part-3-auth.html
