---
layout: blog
title: Adventures with Ad Delivery in Rails
---
It's always hard to find the line between buy vs. build - or as it's known in the open-source world, buy vs. "borrow." I find this to be more true in Rails than in any other application framework. You want authentication, you got it; you need paging, done. Before you know it you've got an application that does almost everything you need, almost everything you don't and you're stuck in the middle.

Now, it's time to _actually_ write code.

At GetFave.com, we had a problem on our hands. We needed to deliver ads from our own inventory - space on the site that our sales team sells to our clients. I immediately asked - how can we do this without writing anything. You can anticipate the complexity that comes from adding a feature like that: find ads contextually, figure out which one to show, show it, track that it was shown, all while not slowing down the page. We take performance very seriously at GetFave.com

So we tried on [Google AdManager](https://www.google.com/admanager/) for size. It seemed to be the right fit. First off, it's Google, so it's gotta be good (debatable, I think). Secondly, it promised to do all the heavy lifting for us: tracking impressions, click-throughs, reporting, delivery, impression distribution, inventory management, and more. They even worked with us to open up an advanced custom attribute targeting system. The only known draw back was that it wasn't going to work with other ad network APIs. Plus, it was a drop in replacement for AdSense - so we had nothing to loose.

A few weeks later, a day before one of our clients ads had been promised to be delivered, AdManager has yet to perform as we've expected. The interface is clunky and convoluted. I can't blame them, they've built a behemoth catch-all advertising management system. But most importantly it wasn't delivering the ads we needed to satisfy our customers (I later discovered that AdManager requires several weeks for custom targeting data to propagate and effectively deliver ads.)

With our lovely [sales director](http://lindsayinchicago.wordpress.com/) popping her head in to make sure we on target for ads to be delivered, I found myself between a rock and a hard place. Then it occurred to me: "wait, I know how to write code!"

Queue Pandora. I started with a basic ActiveRecord model and stubbed out what I thought we'd need - borrowing heavily from my experience on the Google side of the wall. The biggest issue was performance and although I was reluctant to have ad delivery happen synchronously, I decided to go with it (we'd have some time to refactor before we had enough inventory to slow things down). I had already written a nifty tracking class to help me keep track of the context of the page such as keywords and geography. In an afternoon I had the whole thing done.

Pretty soon it was in production and getting feedback from sales people and customers. There were bugs, as was to be expected, but we've since worked them out in addition to adding several new features. Shameless plug: All you small business owners out there may be interested in our new geo-targeted ad product.

The moral of the story was that sometimes - I'll say maybe even the majority of the time - it pays just to write it yourself. To borrow from my friend [Michael Dwan](http://twitter.com/MichaelDwan/status/1928071321), and then in turn [DHH](http://www.loudthinking.com/), "don't use code you couldn't write yourself."

Next up, Google Analytics.