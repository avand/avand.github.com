---
layout: blog
title: Tests Pass. You Fail.
---
Shit breaks. It'd be so much cooler if things just worked the way we expected, but they don't. For better or worse, we live in a world where everything eventually fails. And software is definitely not an exception.

So we write tests. If 1 + 1 should be 2, we make assertions that that's **always** the case. Seems like an all-upside no-brainer.

**But could your tests being doing more harm than good?**

## You Stop Looking Forward

<img src="http://farm6.static.flickr.com/5134/5575368800_3a1e157df1_m.jpg" alt="Looking Forward Fail" title="Looking Forward Fail" class="right">

Just because your tests look back doesn't mean you should. In fact the exact opposite is true. As a developer you have to keep your head up, scanning the horizon for opportunities. Ideally, you're looking for opportunities to make your product better. But even if you're not responsible for the decisions that create happier customers, babysitting your test suite is still probably not the best use of your time.

If you're interested in actually moving the needle, perhaps the better benchmark is not how often your tests pass, but how often they fail.

## You Lose Site of Your Customer

<img src="http://farm6.static.flickr.com/5265/5574782175_e9b08ab39a_m.jpg" alt="Focusing on Customer Fail" title="Focusing on Customer Fail" class="right">

Passing tests are quite a high. Engineers are always looking for cold hard facts. Passing tests take the edge off: "I wrote code to solve a problem, and now this test I wrote **proves** that I really solved the problem!"

It can be a good thing. If the problem matters and the tests actually test the right things then it's a great thing. But it's easy to chase that high by writing tests that don't test the right thing, test something that's already tested or, worse, pass despite a feature that still doesn't work correctly.

Don't lose site of your customers in spite of your test coverage.

## You Fear Failure 

<img src="http://farm6.static.flickr.com/5253/5574803627_2129538b6c_m.jpg" alt="Failing at Failing" title="Failing at Failing" class="right">

The tolerance for failure is probably a lot higher than you imagine; your customer is probably much more forgiving than you (or your boss) think, especially if you [handle it the right way][12].

OK, that's not always true. If you're engineering the rules for credit card approval, the launch sequence for a missle, or the internals of a pacemaker, most of this post is irrelevant. But if you're like me, trying to break through to [meaty part of the adoption curve][4], then isn't the ultimate test simply feedback from your users?

If you think about your product from that perspective code coverage suddenly becomes less important. Are users signing up? Are they coming back? Are they [raving fans][7]? Is your product a vitamin or a pain-killer? Make **those** tests pass.

> ["90% of coding is debugging. The other 10% is writing bugs"][8]
>
> -- @bramcohen

Show-stopping bugs are easy to prevent. At [Sqoot][6] we use a few tools that I consider just as important as `rake test`. [Squawk][9], a gem I wrote that let's our app tweet, gives us live feedback (good, bad and ugly). [Pingdom][10] hits our endpoints every minute to ensure uptime. [Hoptoad][11] is invaluable to trap and report on errors.

So I say release some bugs! The benefit of being 10-20% more nimble over the lifetime of a project totally outweighs the cost of breaking things from time to time.

## You Slow Down

No matter how lean and mean you think you are tests are a process and process can slow you down:

1. **Chasing 100% coverage**: Once you start testing, you don't want to stop. Untested code becomes a second-class citizen. But that's fine! Not all code is created equal.
2. **Calcification**: Deleting code is awesome, but when it's tested, you think twice. This is especially true when you're new to a project.
3. **You become the customer**: Tests are one part of your app where the customers are other developers. It's easy to get lost in a world of tools and process. Unless you're GitHub, your product is probably not other developers.

> ["New process is reluctantly introduced only right before the point where things tip into chaos"][5]
>
> -- Yishan Wong on Facebook

## Now, Before You Roast Me on HN...

By this point, I've probably ruffled some feathers. So let me be clear that testing isn't all downside. There are several critical reasons you **have** to test:

1. **Implementation first thinking**: When you write tests you end up thinking about how other parts of your application will use that code. This means less refactoring down the line.
2. **Free regression suite**: Rarely do engineers go back to test untested code, so it's good to know that the feature you built works now and will forever. This is especially true for teams.
3. **Framing the problem**: Originally for [PiggyBack.it][2], I built some code that balanced debts between a bunch of people. To think about that problem conceptually would have taken me forever to solve. By laying out the expectations first, the solution came naturally.

See, even I write tests!

{% highlight bash %}
Loaded suite /Users/avand/.rvm/gems/ruby-1.9.2-p0/gems/rake-0.8.7/lib/rake/rake_test_loader
Started
..................................................................................................................................................................................................
Finished in 5.778192 seconds.

194 tests, 290 assertions, 0 failures, 0 errors, 0 skips

Test run options: --seed 50633
Loaded suite /Users/avand/.rvm/gems/ruby-1.9.2-p0/gems/rake-0.8.7/lib/rake/rake_test_loader
Started
..............................................
Finished in 13.691397 seconds.

46 tests, 56 assertions, 0 failures, 0 errors, 0 skips
{% endhighlight %}

If you're saying to yourself "13 seconds to run 46 tests is slow," you may want to re-read this post or double-down and check out [riot][3].

## Happy Customers are All That Matters

I don't enjoy writing [code for code's sake][1]. It's ironic to think you might even evaluate a software engineer by the code he doesn't write. Coding is fun, it's addictive and it's a bit hypnotic. So you have to be really careful that the code you're writing actually matters!

**Are you making your customer happier?**

If the line of code you're working on doesn't answer that question with a huge "yes" then you're probably wasting your time.



[1]: http://avandamiri.com/2010/02/08/getting-it-what-makes-a-great-software-engineer.html
[2]: http://piggyback.it/
[3]: https://github.com/thumblemonks/riot
[4]: http://en.wikipedia.org/wiki/Diffusion_of_innovations
[5]: http://algeri-wong.com/yishan/engineering-management-process.html
[6]: http://www.sqoot.com
[7]: http://www.amazon.com/Raving-Fans-Revolutionary-Approach-Customer/dp/0688123163
[8]: http://twitter.com/bramcohen/status/51714087842877440
[9]: http://github.com/avand/squawk
[10]: http://pingdom.com
[11]: http://hoptoadapp.com
[12]: http://robots.thoughtbot.com/post/4191116705/updates-on-hoptoad