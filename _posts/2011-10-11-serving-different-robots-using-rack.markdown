---
layout: blog
title: Serving Different Robots.txt Using Rack
---

While doing an SEO audit for the [daily deal API][1] I'm working on, the subject of the [robots.txt][2] came up. In addition to our production environment (what you and everyone else see), we also use an "edge" environment. It's a place we can push the latest and greatest changes and test them before they go live. Edge is an exact copy of production just running on a different domain. Since we didn't want to get dinged with content duplication we had to disallow spiders from crawling our edge environment. Here's how we serve different robots.txt files based on environment using Rack within Rails.

1. Move public/robots.txt to config/robots.txt. This is now your production robots.txt. Any other environment will disallow everything for all user-agents.
2. Create a `RobotsGenerator` in lib
3. Point `/robots.txt` to the generator in your routes

lib/robots_generator.rb:

{% highlight ruby %}
class RobotsGenerator
  # Use the config/robots.txt in production.
  # Disallow everything for all other environments.
  def self.call(env)
    body = if Rails.env.production?
      File.read Rails.root.join('config', 'robots.txt')
    else
      "User-agent: *\nDisallow: /"
    end

    # Heroku can cache content for free using Varnish
    headers = {
      'Content-Type'  => 'text/plain',
      'Cache-Control' => "public, max-age=#{1.year.seconds.to_i}"
    }

    [200, headers, [body]]
  rescue Errno::ENOENT
    headers = { 'Content-Type' => 'text/plain' }
    body    = '# A robots.txt is not configured'

    [404, headers, [body]]
  end
end
{% endhighlight %}

config/routes.rb

{% highlight ruby %}
require 'robots_generator'

YourApplication::Application.routes.draw do
  # ...

  match '/robots.txt' => RobotsGenerator

  # ...
end
{% endhighlight %}

**Update** *(Sept. 23, 2013)*: Thanks to [@michaelbaudino][3] for pointing out that
routes.rb needs the `require 'robots_generator'` since Rails 3 does not autoload files
in lib. Additionally, the request headers should always include `Content-Type` to avoid
a `Rack::Lint::LintError` error. 

[1]: http://www.sqoot.com/
[2]: http://www.robotstxt.org/
[3]: https://twitter.com/michaelbaudino
