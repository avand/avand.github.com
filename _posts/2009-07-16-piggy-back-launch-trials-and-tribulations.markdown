---
layout: blog
title: "The Race to a Beta Launch: The Trials and Tribulations of Piggy Back"
---
I haven't posted in a while, and here's why: [Piggy Back](http://www.piggybackme.com);. If you follow me on [Twitter](http://www.twitter.com/avand), or are friends with me on [Facebook](http://www.facebook.com/avand), you've probably seen the updates crawling by.

Piggy Back is a web site that helps users manage debts between each other. It was inspired while I was consulting at [Echo Global Logistics](http://www.echo.com/), where Rob Freas, Bryan Dougherty, Antuan Kinnard and I were constantly going out for lunch. One of us invariably didn't have cash, and to make things simpler one person would just always pay. We shared out a spreadsheet and whoever paid would update it.

The pain: with every new record we added we had to go through the mental anguish of actually figuring out who owed what to whom. Piggy Back was born from that concept. Initially code named "Balancr," in true Web 2.0 style, Piggy Back takes debts between people and nets them out. If Rob owes Bryan and Bryan owes me, well then Rob just owes me. It really is "the shortest distance between two wallets."

I whipped something together over a year ago, using it as more of a sandbox for Ruby on Rails wizardry than an actual product, then shelved it for quite some time as I pursued other endeavors. I finally decided to revisit the project about 3 weeks ago with a commitment to launching it, and here's my story:

##Focusing on What Matters##

When I cracked open the source code again, there was a lot that had to change. Some were some obligatory upgrades, but in order to take this site from "no" to "pro" the amount of work was a bit overwhelming.

So I decided to focus on only what mattered and that was the balancing algorithm. At the core Piggy Back had to be able to net out debts and find the simplest way for money to exchange hands. I started work on this part of the project solely with tests. Using [Shoulda](http://www.thoughtbot.com/projects/shoulda/) I created a sea of nested contexts describing every possible debt situation I could think of, then I tweaked the algorithm, which was already pretty solid, to make the tests pass.

Then I started pounding it as a test user, building up more and more complicated scenarios. As was expected, but not hoped for, the algorithm buckled. Something was clearly wrong, so I went back to the drawing board.

I created more test cases and found the bug, but now, paranoid that there were other errors, I decided to map out every possible debt scenario I could think of... on paper:

<table>
  <tr>
    <td><a href="http://www.flickr.com/photos/amiriav/4125753470/" title="page1 by Avand Amiri, on Flickr"><img src="http://farm3.static.flickr.com/2584/4125753470_557ae0236e_m.jpg" width="209" height="240" alt="page1" /></a></td>
    <td><a href="http://www.flickr.com/photos/amiriav/4124984705/" title="page2 by Avand Amiri, on Flickr"><img src="http://farm3.static.flickr.com/2766/4124984705_cacdf056a2_m.jpg" width="240" height="229" alt="page2" /></a></td>
  </tr>
</table>

There was so many more fun things to work on. I wanted to build the bells and whistles that make it fun to use, pretty, and more useful. But I kept catching myself: no one would use it if it didn't crunch the numbers correctly, including me. Two more late nights, and I was ready to move on to the fun stuff, with my mind at ease that Piggy Back could do the math right, although I'm still keeping my fingers crossed.

##Racing to Production##

After that little problem was over and done with, it became a sprint to get it live. No marathons here. I got an account with [Slicehost](http://www.slicehost.com), and knocked out all the little annoying things that had to happen before going live: user registration workflow, invitations, [error handling with Hoptoad](http://www.hoptoadapp.com), [Google analytics](http://www.google.com/analytics), hosting, and ultimately deployment. Boom, it was live!

There was so much more that had to happen, but at least it was up and running and I was accountable to my users and immediately started getting feedback.

##Feedback is Deafening##

Just like holding a microphone up to a speaker, the feedback started pouring in: where's the remember your password button, can I create private debts, why is this over here, etc., etc., etc. I guess it's really easy to criticize something.

At times I got annoyed, sitting back and taking the attitude of, "well, if you want it to work that way, why don't you build it!" Then I caught myself. These are _my_ users. This is exactly what I had been working so hard to achieve. I can't swear them off just yet!

##Build it to Use It##

Piggy Back was inspired by a pain that I felt. I was tired of curbing my own generosity because I was afraid I'd never get paid back. I want Piggy Back to have a mobile interface to make it easier to add debts, for me first and foremost. Having worked on a lot of different projects, it's really refreshing to really feel the need of the user and be able to act on it.

##Build it to Use It, Again##

Apparently the way I use software, and the way others use software is totally different: make no assumptions about user behavior. Given a text box that says "Name" I type "Avand Amiri," while others type "ben" or "G." When I click a link and it takes a second to load, I look to the browser's status bar to see if browser is loading something. Other's just give up.

I've spent a few hours talking to people, and looking over people's shoulders to see how they move their mouse, and ask them "why'd you do that?" Pay attention to how people phrase questions, and how many they're asking.

##Testing##

For the technical people out there, how well is this application tested? Not really. The part that matters, Debt#balance, is heavily tested, but everything else really hasn't been a priority. There's 73 tests with 81 assertions, and absolutely zero controller testing.

How does that make me feel? Not great. But it's been eye opening to test what actually matters. If I don't test that user's have many debts, I guess I don't really care, because the application will disintegrate if that becomes the case. Seriously, when was the last time a developer on a whim said, "meh, this <code>has_many</code> declaration can't be that important." It doesn't happen. At the end of the day, my tests are the product of necessity. Some new functionality I'm releasing, requires my user registration to be much more robust, and I'm a little scared of the edge cases, so I'll test them.

So going back then, I guess I'd rather have a product that I use that has a few bugs, than a fully tested product that has yet to ship.

##Conclusion##

All things considered I'm having a lot of fun building Piggy Back and I think that's because it directly impacts me. It's fun to be user number 1, and it's fun to see user number 10. Getting feedback has been huge, because it's made me think about things I didn't consider important or necessary. More than anything, it's dynamic. Don't get too comfortable with Piggy Back, just yet, there's a lot more to come.
