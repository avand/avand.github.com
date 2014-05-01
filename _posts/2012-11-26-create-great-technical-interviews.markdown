---
layout: blog
title: Create Great Technical Interviews
guest_blog_name: Take the Interview
guest_blog_url: http://blog.taketheinterview.com/2012/11/26/create-great-technical-interviews/
discussion: http://news.ycombinator.com/item?id=4832429
---

A technical interview or screening is a crucial part of reviewing a candidate
for an engineering position. It's usually the second step in the review process
and is a prerequisite to an in-person interview. Here are some lessons I've
learned in the last few years of taking and giving a dozen or so interviews.

You learn bits and pieces about the personality of a candidate throughout the
entire interview process. The technical interview is a chance for them to
highlight their expertise, aptitude, and style, not their charm, wit, or lack
thereof. I set aside an hour for technical interviews: 10 minutes for
introductions, 40 minutes to code, and 10 minutes at the end for Q&A.

I start with a three to five minute summary of who I am and what I do. Humans
naturally [mirror][1] each other's behavior. In an interview, I find this
to be amplified so I make sure to stick to the facts and ask the candidate to
do the same.

If you've got a "Chatty Cathy," keep your eye on the clock. Make sure chit-chat
doesn't eat into their time to code. Interrupt your candidate politely by saying,
"I want to make sure you have enough time to get through the code so let's come
back to this during Q&A." Inversely, if the candidate is taciturn, have some
questions ready to open them up. What projects are they working on? What type
of role are they looking for? How do they stay current with technology?

When it comes time to code, there are thousands of interview questions to choose
from. I look for a single problem that flexes several computer science muscles
like recursion, object-oriented programming, queues, or data structures. The more
ways there are to solve the problem, the better chance you'll have to see how
the candidate thinks. I also prefer problems that start simply, build in complexity
and lend themselves to test-driven development (TDD).

Practice explaining the problem clearly to avoid wasting time and encourage
candidates to think out loud. Most technical interview problems have a really
elegant and non-intuitive solution. Candidates often know this and can spin
their wheels trying to figure it out on the first pass. TDD helps alleviate
these symptoms. Remind candidates that you're looking for thoughtfulness over
correctness to help them feel more comfortable.

It's crucial to see every keystroke. An engineer's cursor is an extension of
her thought process. In the past, I've used Skype or Messages (formerly iChat)
to screen share. Besides being a little invasive, screen sharing can lead to
"rabbit holes," especially during setup. For example, I've seen confused
candidates create entirely new Rails projects or bundle a gem when a single Ruby
file would have sufficed. The less wiggle-room the better. Google Docs works
but you really want an editor designed for code. I recommend [Stypi][2].

Run the code. Engineers iterate on solutions by executing the code they've written.
I think it's unfair to make anyone think through a whole problem in their head.
If you're using a web-based editor, you may be able to pipe the code directly
to a local interpreter. The folks at Stypi made this easy:

{% highlight bash %}
# Just replace the URL (don't forget "/raw")
$> curl --silent https://www.stypi.com/raw/avand/interviews/reverse_polish_notation.rb | ruby
Loaded suite -
Started
.
Finished in 0.000427 seconds.

1 tests, 4 assertions, 0 failures, 0 errors, 0 skips
{% endhighlight %}

Be helpful, engaged, and bail candidates out of sticky situations. It's easy to
go into "spectator mode." By actively following a candidate's thought process
you'll better understand how they think and keep the interview on track. To stay
engaged, introduce a big problem one small piece at a time, give examples of input
and output, and point out potential bugs or edge cases as they come up.

Cut candidates off at the time limit, even if their work is unfinished. If
you made it clear up front that you're not necessarily looking for the correct
answer, this should be easy. Change gears quickly to Q&A by asking them if they
have any questions for you and wrap up the call from there. Great candidates have
great questions that open up really interesting conversation. I like to indulge
in good conversation, especially if the coding exercise went well. It helps me
understand if the candidate would be a good mental and cultural fit.

Pull the plug if a candidate is bombing. Like going on a blind date, you may
know within minutes that the candidate isn't a good fit. I prefer to pull the
cord immediately when this happens. I'll say, "this isn't going as I expected"
and then site a reason (e.g., "we're looking for folks that understand a language,
not framework" or "a solid understanding of these data structures is really
important to us").

Finally, If the candidate is a no-go, give a good reason why. "We don't think
there's a good technical fit" isn't a real reason. Describing why a candidate
is or is not a fit is hard but it's worth doing. It forces you to objectively
distill your thoughts, which will make it easier to discern other candidates.
And it's great feedback for the candidates too as they, no doubt, will learn
from this experience.

Creating great technical interviews is a key piece of growing an engineering
team. Doing it well means objectively screening candidates without tying up a
lot of resources. Having sat on both sides of the interview table, I've found
this approach to be a really good baseline. I look forward to reading your
thoughts in the comments.

[1]: http://en.wikipedia.org/wiki/Mirroring_(psychology)
[2]: http://www.stypi.com/
