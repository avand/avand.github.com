---
layout: blog
title: Snappy Dashboards with Redis
guest_blog_name: Redis To Go
guest_blog_url: http://blog.togo.io/how-to/snappy-dashboards-with-redis/
---

It seems that almost every application I've worked on has some sort of dashboard
component. It’s not usually the first feature but it often becomes the most useful.

**But dashboards are hard to build.**

They break resource-oriented design patterns and often rely on complicated one-off
SQL queries. Dashboards also usually feature graphs and activity streams, both of
which are not trivial to implement well.

At [Sqoot][sqoot], a local deal API, we have a [simple dashboard][img] for our
customers. Given a time frame, it tells developers how many deals they've served
(impressions), how many clicks they've driven, and how much affiliate revenue
they've earned (earnings). It might also be interesting to know how many API calls
they've made.

![Sqoot Dashboard Screenshot](http://f.cl.ly/items/141f053h2P3t0m1r3g2R/Image%202012.10.15%202:49:43%20PM.png "Sqoot Dashboard Screenshot")

All of these stats follow a pretty standard query pattern:

{% highlight sql %}
SELECT COUNT(*) FROM collection WHERE USER = ? AND TIME > ? AND TIME < ?
{% endhighlight %}

This works great for small collections or well-indexed relational tables. For example,
earnings are reported exactly like this. But enormous collections, especially when stored
in document-centric databases, become slow to query. This is especially true if you have
to join disparate data sources.

So we developed another way to store the counts we need. It's a thin Ruby wrapper around
Redis and we call it The Count (ah ah ah ah ah!). Here's how it works.

For every stat we're interested in, we set a few keys:

{% highlight text %}
{stat}/year:{YYYY}
{stat}/year:{YYYY}/month:{MM}
{stat}/year:{YYYY}/month:{MM}/day:{DD}
{stat}/user:{id}/year:{YYYY}
{stat}/user:{id}/year:{YYYY}/month:{MM}
{stat}/user:{id}/year:{YYYY}/month:{MM}/day:{DD}
{% endhighlight %}

The first three keys tell us totals for all users by year, month, and day. The last three
scope the same totals to one user. For example, if you want to know how many clicks user
5 drove in September:

{% highlight ruby %}
REDIS.get("clicks/user:5/year:2012/month:09").to_i
{% endhighlight %}

You can also query across date ranges with the help of some Ruby:

{% highlight ruby %}
REDIS.mget([
  "clicks/user:5/year:2012/month:06",
  "clicks/user:5/year:2012/month:07",
  "clicks/user:5/year:2012/month:08"
]).inject { |sum, i| sum + i.to_i }
{% endhighlight %}

Every time an API call, impression, or click happens, we update all the relevant keys at
once:

{% highlight ruby %}
REDIS.multi { keys.each { |key| REDIS.incr key } }
{% endhighlight %}

If Redis isn't available, for whatever reason, we could rebuild the gaps from the canonical
data in Mongo. We've never had to do this.

Now, when our customers load their dashboard, we don't need to go slogging through millions
of records. This makes our dashboards snappy. It's also worth noting that this approach takes
up very little space. If we segment by day, each year for each stat only uses 375 keys per user
and another 375 for the aggregate data. The values are almost inconsequential since their just numbers. All our dashboard data is stored in this way with our friends at [Redis To Go][redis]
in a 20 MB instance.



[sqoot]: http://www.sqoot.com/
[img]: http://f.cl.ly/items/141f053h2P3t0m1r3g2R/Image%202012.10.15%202:49:43%20PM.png
[redis]: http://redistogo.com
