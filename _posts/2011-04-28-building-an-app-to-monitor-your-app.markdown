---
layout: blog
title: Building an App to Monitor Your App
hacker_news_link: 
---

Keeping a web application up and running usually requires lots of moving parts. Since these parts are all codependent, when the whole app goes down, the immediate question is: **what broke?**

I want to share with you the solution we came up with at [Sqoot][5]. Let's dive right into the code and then talk about how we got here.

## Diving Right In

We start with a simple [Sinatra][3] web app:

{% highlight ruby %}
require 'erb'
require 'sinatra'
require 'active_support'

PROCESSES = [:solr, :memcached, :mongo] # ...can be anything

get '/' do
  # Ask each process what its status is (e.g., { :solr => true, ... })
  @process_statuses = PROCESSES.inject({}) do |memo, process|
    memo[process] = self.send("#{process}_up?")
    memo
  end

  # Set the response code to 200 if all the statuses are up
  status @process_statuses.all? { |k, v| v } ? 200 : 503

  erb :index
end
{% endhighlight %}

Then we just need a bunch of `_up?` methods to do the checking, like this:

{% highlight ruby %}
require 'httparty'

def solr_up?
  solr_host = '...' # replace with your Solr server
  HTTParty.get("http://#{solr_host}/admin/ping").success?
end
{% endhighlight %}

In addition to [Solr][8], we also make sure that [Mongo][1] and [Memcached][2] are running.

Finally, we need a couple endpoints for [Pingdom][6] to hit (e.g, [`/solr`][9]) so that we can check each service independently:

{% highlight ruby %}
PROCESSES.each do |process|
  get "/#{process}" do
    @process = process
    @status  = self.send("#{process}_up?")

    status @status ? 200 : 503

    erb :process
  end
end
{% endhighlight %}

Add a couple trivial views, some CSS3 awesome, and voilà, you've got [status.sqoot.com][4]!

## Taking a Step Back

The first thing we did to monitor uptime was point [Pingdom][6] at [Sqoot][5]'s homepage. We would perform some trivial check and when the site went down we dealt with a deluge of errors we couldn't do anything about (e.g., `Timeout::Error`). Since we use [Hoptoad][7] to stay on top of application exceptions all these errors got really noisy. We also still didn't know which dependency had gone down. We just knew the site was hosed.

We had to be able to monitor each service independently. So we created a `StatusesController` in the app that had an action for every service we wanted to monitor. The good thing was that we could now really introspect the process (like above) to make sure it was OK. For example, we might want to know that search is running and there are a certain number of documents indexed too. Unfortunately, if the status of one service changed, they usually all changed (due to requests queuing up, etc.). So we still didn't have great insight as to what broke.

By creating a separate application that performed the checks, we were able to get detailed insight as to what services were running (or not). We can use Ruby to make each check meaningful and since it lives outside our app, it reports on each service exclusively.

Boom!

[1]: https://gist.github.com/950677
[2]: https://gist.github.com/950680
[3]: http://www.sinatrarb.com/
[4]: http://status.sqoot.com/
[5]: http://www.sqoot.com/
[6]: http://www.pingdom.com/
[7]: http://hoptoadapp.com/
[8]: http://lucene.apache.org/solr/
[9]: http://status.sqoot.com/solr/
