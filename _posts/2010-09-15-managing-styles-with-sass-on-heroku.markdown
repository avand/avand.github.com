---
layout: blog
title: Managing Styles with Sass on Heroku
hacker_news_link: http://news.ycombinator.com/item?id=1698139
---
I've generally found stylesheets to be the messiest part of any website. And I'm not surprised:

* Cross browser support means kludgy code
* Functionality usually takes the drivers seat to well thought out styles
* [It's someone else's job][1]

But organizing styles doesn't have to be a mess and here's one strategy that may make your life easier.

## But First...

Since [REST][17] became the de facto way to design [Rails][18] apps, I've focused on organizing stylesheets by the same patterns. It just seemed natural that if you had a folder <code>/views/users/new.html.erb</code> you should have a similiar folder <code>/stylesheets/users/new.css</code>. Back in 2008, I wrote a [two part post][2] on how to do this nicely with Rails. Three years later, I'm [not the only one][3] who thinks that this is a decent idea.

But CSS has grown old and weary and is in desperate need of an [update][13]. [Sass][4] is clearly a more expressive way to define styles.

So, it seemed like a great time to refresh the way I manage styles in my Rails apps.

## Why Start from Scratch?

<img src="http://farm5.static.flickr.com/4124/4994576910_2986eef71b_m_d.jpg" alt="Beware of Dog" title="Beware of Dog" class="right">

Simply put, this was a pain in the ass. Why was it harder than it should have been?

* **I'm masochistic**: I wanted it to work a certain way. I didn't want to wrangle with a [bloated framework][5] or sacrifice on simplicity.
* **Heroku**: [Heroku][14] has a ([mostly][19]) read-only filesystem. [Waaa, waaa!][15]. Since Sass needs to be compiled, this poses a bit of a problem. There are a [few workarounds][6] that involve serving CSS from <code>/tmp</code>, but I didn't want a hack.
* **Organization**: I resisted Sass for a long time. I think by just organizing your selectors you can get a lot of the same benefits. My new setup had to have the same clarity.
* **Packages**: [Everyone should know][7] [by now][8] that the HTTP overhead of requesting multiple CSS files degrades client performance. But you can't just pile them all into one file because you need to separate styles for print, screen, IE, or mobile. This problem [had a solution][9], but not with [Git based deployments][16] on Heroku and the [Amazon S3 workaround][10] sounded like trouble.
* **Javascript**: Javascript and CSS are very very different. I wanted my solution to organizing styles to inspire the way I manage Javascript, not muddle it up.

Seriously, it shouldn't be this god damn complicated.

## FTW!

* **Sass**: I was commited to porting to Sass, specifically because you don't have to rewrite all your CSS to get started. [Scss plays nice][20]. It's part of [Haml][21], so throw it in your <code>Gemfile</code>:

{% highlight ruby %}
gem 'haml', '3.0.18'
{% endhighlight %}

* **Migrate your CSS to Scss**: Using the command line tool <code>sass-convert</code> I migrated all my CSS to Scss. I know it needs a lot of refactoring to take advantage of Sass, but I'll do that later.

{% highlight bash %}
$> sass-convert source.css destination.scss
{% endhighlight %}

* **Organize**: I wanted stylesheet packages to be derived by how styles were organized - not by a configuration file. So while it made sense to have the Sass files live next to my erb (remember, I have a one-to-one mapping of styles to my templates), [Chris Powers][11] noted that it was cleaner to store them in <code>/app/stylesheets/:package/</code>. For me, <code>:package</code>  was just "desktop." Later, I can easily create packages called "mobile," "print," or "ie" if I need to. See?

<img src="http://farm5.static.flickr.com/4088/4994576870_31e45aceab_d.jpg" alt="Template and Styles, Happily Ever After" title="Template and Styles, Happily Ever After" />

* **Use Rack to do all the heavy lifting**: Compiling Scss isn't hard. Concatinating all the stylesheets isn't hard either. [Ryan Bates' 222nd Railscast][22] helped me write a Rack application that does the work:

{% highlight ruby %}
class AssetsApp < ActionController::Metal  
  include ActionController::Rendering

  def stylesheets
    @output = ''

    Dir.glob("#{Rails.root}/app/stylesheets/#{params[:package]}/**/*.css*") do |filename|
      sass_options = { :syntax => :scss }
      sass_options[:style] = :compressed unless Rails.env.development?

      @output += Sass::Engine.new(File.open(filename, 'r').read, sass_options).render
    end

    response.headers['Cache-Control'] = "public, max-age=#{1.year.seconds.to_i}" unless Rails.env.development?
    response.content_type = 'text/css'

    render :text => @output
  end
end
{% endhighlight %}

* **Add the route and reference it**: With Rack doing all the hard work, I just point to it:

{% highlight ruby %}
Sqoot::Application.routes.draw do |map|
  match "/stylesheets/:package.css" => AssetsApp.action(:stylesheets), :as => 'stylesheets'
end
{% endhighlight %}

{% highlight erb %}
<%= stylesheet_link_tag stylesheets_path(:package => :desktop) %>
{% endhighlight %}

## All together now!

* Instead of 15-some stylesheets being downloaded at ~50 KB, now I send the client one 8 KB file.
* **No writing to disk!** So Heroku's happy.
* **[Varnish][12]** leverages HTTP to cache the compiled CSS.
* **I can sleep again** because all my styles are now served in one tight bundle.
* You get a nice free [gist][23] of the code to try for yourself.


[1]: http://video.google.com/videoplay?docid=-4101280286098310645
[2]: http://avandamiri.com/2008/11/19/css-tricks-2-of-2-using-rails-to-manage-styles.html
[3]: http://2009.windycityrails.org/videos#8
[4]: http://sass-lang.com
[5]: http://compass-style.org/
[6]: http://github.com/pedro/hassle
[7]: http://developer.yahoo.com/yslow/
[8]: http://code.google.com/speed/page-speed/
[9]: http://synthesis.sbecker.net/pages/asset_packager
[10]: http://github.com/dim/sphere
[11]: http://chrisjpowers.com/
[12]: http://www.varnish-cache.org/
[13]: http://www.css3.info/
[14]: http://www.heroku.com
[15]: http://www.hulu.com/watch/19280/saturday-night-live-debbie-downer-birthday-party
[16]: http://docs.heroku.com/git
[17]: http://edgeguides.rubyonrails.org/routing.html
[18]: http://rubyonrails.org
[19]: http://docs.heroku.com/constraints#read-only-filesystem
[20]: http://sass-lang.com/docs/yardoc/file.SASS_CHANGELOG.html
[21]: http://haml-lang.com/
[22]: http://asciicasts.com/episodes/222-rack-in-rails-3
[23]: http://gist.github.com/581728
