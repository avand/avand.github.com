---
layout: blog
title: "CSS Tricks (2 of 2): Using Rails to Manage Styles"
---

For the second half of my CSS "tips n' tricks" tutorial, I'd like to take some time and discuss how Rails can help manage stylesheets. As you start out any Rails application, there are some huge conventions you follow within the 'app' folder. I think these conventions make it much easier for developers to find, maintain and create code. But when it comes to stylesheets I find there to be a notable absence of these conventions.

My web applications have, in the past, began as one stylesheet called "default.css" or "application.css" and placed in the stylesheets folder. I'd try and arrange similar styles in similar places, and use comments to help organize it. Pretty soon I had a 800 line CSS file on my hands and was hunting to find styles on various pages. I knew there had to be a better way, and thanks to Rails and some conventions I've started following, I think I've got a decent system. It involves 3 basic components: using controllers and actions as CSS selectors; many shorter CSS files; and Rails stylesheet caching.

##1. Controllers and actions as CSS selectors##

Depending on the application, you'll be using some kind of layout in the views/layouts. I usually stick with something like views/layouts/application.html.erb early on in the game. The first thing I do is make whatever div I have wrapping my main content area adopt the current controller and action names as CSS classes:

{% highlight erb %}
<html>
  <head>...</head>
  <body>
    <div id="wrapper" class="<%= "#{@controller.controller_name} #{@controller.action_name}" -%>">
      <%= yield %>
    </div>
  </body>
</html>
{% endhighlight %}

This means that now in any stylesheet I have full control over what gets rendered and no style can step on the feet of another. For example:

{% highlight css %}
div#wrapper {
  /* insert styles common to all controllers here */
}
div#wrapper div.users {
  /* insert common styles for all user actions here */
}
div#wrapper div.users.index {
  /* insert users#index specific styles here */
}
{% endhighlight %}

The key is to religiously obey these prefixes. In [Part 1 of this CSS series][1] I talked about being as specific as possible with CSS selectors, and this is why. If you're not, you'll spend hours trying to figure out why something is rendering a certain way only to find that it's inheriting something entirely irrelevant. So once you have that sorted you can then make...

##2. Many shorter CSS files##

So if you have a controller like UsersController, you'll have a folder, views/users. Within that you'll have files that respond to each action. Do the same thing for your styles. Create a folder public/stylesheets/users and create a stylesheet for each view that warrants its own styles. To follow the example above, you can now take any CSS that starts with `div#wrapper div.users.index`, and place it in public/stylesheets/users/index.css. Same thing for every other action, and partials too... hell, I even prefix those files with an underscore. I try and make the files stylesheets folder mirror the views.

You have to get a little more creative when it comes to common styles (those that span multiple controllers or actions). For styles spanning multiple actions, simply create a common.css inside the controllers folder. For styles that span multiple controllers, chances are that a layout exists for that part of the application. For example, navigation that may be common to administration would go in public/stylesheets/admin.css to correspond to app/views/layouts/admin.html.erb. 

This process, actually works really well with javascripts too. It may seem ridiculous to include so many stylesheets into the final HTML that gets rendered, but fortunately you can send it all down as one.

##3. Rails stylesheet caching##

This is where it all comes together. With one simple command we can get the web server to concatenate all these files into one sheet that gets sent to the client:

{% highlight erb %}
<html>
  <head>
    <%= stylesheet_link_tag 'application', 'users/index', 'users/new', 'users/common', cache => 'cached/users' %>
  </head>
  <body>
    ...
  </body>
</html>
{% endhighlight %}


In some cases I'll just bundle every CSS file I create into one sheet, or if the application is a bit more stratified you can create sets of caches. Usually the structure of your layouts will determine how you set these up.

This set up means you as a developer don't have to loose time trying to find the styles that correspond to their respective view HTML, can save time when debugging by eliminating accidental style inheritance, and still send one file to the client. Enjoy.

[1]: /2008/09/18/css-tricks-1-of-2-first-get-down-with-the-oop.html
