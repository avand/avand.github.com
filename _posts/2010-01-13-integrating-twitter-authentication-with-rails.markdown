---
layout: blog
title: Integrating Twitter Authentication with Rails
hacker_news_link: http://news.ycombinator.com/item?id=1096473
---
I'm working on a project called [Piggy Back][1], a simple service where friends can keep track of debts between one another. To encourage user registration, I'm lowering the barriers, allowing users to sign up their [Twitter][3] and [Facebook][4] accounts. I'd like share with you how I got this functionality into this Rails app. A shout out to [Chris Powers](http://twitter.com/chrisjpowers) and [Jeff Talbot](http://twitter.com/nevernormal1) for their feedback along the way.

## Eliminating Plugin Magic

I needed to get my hands into the authentication code if I was going to allow Twitter and Facebook integration. I was using [Authlogic][5] and could have extended it with other plugins to give me this support, but I wanted the process for my users to be as seamless as possible. I knew this would probably involve some Piggy Back specific customizations.

Furthermore, I was actually only using about 20% of the functionality Authlogic provides. I had "magic columns" (<code>last_logged_in_at</code>, <code>failed_login_count</code>, etc.) because they were free, but I didn't actually need them.

Finally, making it possible for users to sign up with their Twitter accounts meant a user record with no email or password, fields [Authlogic][5] required. There were likely workarounds available, but that meant hacking [Authlogic][5], not working on my app.

## Hand Rolling Authentication

Authentication isn't complicated. I liberated the heavy lifting cryptography algorithms from Authlogic. Obviously, it was important for me to use the exact same algorithm in my own system. Then I got inspired with [Jamis Buck's Bucketwise project](http://github.com/jamis/bucketwise/) and prepped my user to be authenticated.

[See the code!][6]

Authlogic encourages you to use a <code>UserSession</code> model which lends itself to restful design, but I found it much easier to just create two actions on my <code>SiteController</code> that simply responded to <code>GET</code> requests. Originally, I had used <code>require_authentication</code> <code>before_filter</code>s, so I ported those over to the new system as well. Check it all out in the [gist][6].

## Now, Let's Get Twitter Up in There!

Twitter supports [OAuth](http://oauth.net) authentication. It's a little trickier to implement than basic HTTP authentication, but isn't terribly complicated. Your application, the consumer, gets a couple tokens, which you exchange for request tokens. Then you use the request tokens to do what you will with Twitter, including obtaining access tokens to, well, access users accounts.

There's a lot that OAuth does and I wasn't prepared to start from scratch, so I installed the [oauth Ruby gem](http://oauth.rubyforge.org/) and included it into my application. I also added 4 columns to my users table to store the Twitter information, <code>twitter_id</code>, <code>twitter_handle</code>, <code>twitter_token</code>, and <code>twitter_secret</code>. My user validation rules adapted to this change to, permitting users without emails or passwords in favor of these attributes.

You need two actions to support Twitter OAuth. One to start the request and the other, known as the callback, to finish it. In examples, these actions are nestled in among other controllers, but I decided for clarity to create a standalone <code>TwitterController</code>.

It's a bit too large to embed here, but you can still [take a look at the <code>TwitterController</code>][2].

The trickiest part was actually making the workflow seamless for all the users. I'm referencing comments in the [TwitterController][2]:
1. A new users comes to Piggy Back and creates an account by logging in to Twitter. (C)
2. An existing user comes back to Piggy Back and logs in via Twitter, but:
  1. Piggy Back doesn't now about their Twitter account and the two must be linked (B) or
  2. Piggy Back knows about their Twitter account and logs them in (A).

To get this split behavior, I simply altered the callback URL that Twitter uses to return flow back to the application. This was simple enough with two named routes:

{% highlight ruby %}
map.with_options({ :user_action => 'create' }) do |twitter_map|
  twitter_map.twitter_oauth '/twitter/oath/:user_action', { :controller => :twitter, :action => :oauth }
  twitter_map.twitter_callback '/twitter/callback/:user_action', { :controller => :twitter, :action => :callback }
end
{% endhighlight %}

To handle the case where accounts may be linked, I store the users Twitter attributes in session for a moment, while I redirect to my <code>SiteController#login</code> action. Here, the user is asked to login specifically to link their account to Twitter. Jeff Talbot offered great feedback about this workflow, suggesting that anywhere there's a "Sign in with Twitter" link, it should just seamless create a users account. This creates a problem for existing users, however, where they could easily end up with two accounts. To solve this, I'm adding a big button to this login page, "Don't Have an Account, Create One Instantly."

## Conclusion

So many web apps need to do exactly what I spent Monday doing, so hopefully you can reuse some of the strategies I implemented here.

Chris Powers asked if I thought this could be pulled out into a plugin, and I'm sure the answer is yes. However, it's not a lot of code and there's a lot of customizations your app will need within the areas I commented out. I'm not a control freak (I did, after all, convert from C# and ASP.net), but I do believe there is value in controlling your apps code.

## References
* [jnunemaker/twitter](http://github.com/jnunemaker/twitter/)
* [tardate/rails-twitter-oauth-sample](http://github.com/tardate/rails-twitter-oauth-sample/)

[1]: http://piggyback.it/ "Piggy Back"
[2]: http://gist.github.com/276329#file_twitter_controller.rb "GitHub Gist: TwitterController"
[3]: http://twitter.com "Twitter"
[4]: http://facebook.com "Facebook"
[5]: http://github.com/binarylogic/authlogic/ "GitHub: binarylogic/authlogic"
[6]: http://gist.github.com/276329 "GitHub Gist: Hand Rolled Authentication"