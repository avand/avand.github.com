---
layout: blog
title: Write Less JavaScript
---

How many lines of JavaScript code were used to create the following interface?

<iframe src="//player.vimeo.com/video/114599646" width="650" height="420" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>

At [Mystery Science][mysci], we recently released this feature to capture feedback after a teacher has taught a lesson. There are four possible screens or states:

1. Prompt (did you teach?)
2. Rating (stars)
3. Comments (open-ended feedback)
4. Done

Each state (except the last one) prompts and subsequently saves user input. The server knows I taught a lesson as soon as I click "yes." The star rating and comments work the same way — all responses are submitted via [XHR][xhr].

**How little JS code can we write to get this feature working?**

**The first trick to writing less JS is to find the right abstractions.** Let's explore the two key abstractions here. When a teacher submits a response, JS is advancing the interface's state. This can be accomplished in any number of ways but at the end of the day some elements are being shown (`display: inherit`<sup>[1](#inherit)</sup>) and others are being hidden (`display: none`). JS also has to send the response to the server, which in jQuery-terms eventually means a call to `$.ajax()`.

Let's wire this up:

{% highlight js %}
// Let's assume this feature lives inside <div class="lesson-feedback">.
var container = $('.lesson-feedback');

// First, let's wire up the UI:
container.find('.yes-control').click(enterRatingState);
container.find('.rating-control').click(enterCommentsState);
container.find('.no-control, .submit-comments-control, .skip-comments-control')
  .click(enterDoneState);

// Now, let's wire up the response submissions:
container.find('form').submit(submitViaXHR);
{% endhighlight %}

This is a great start! This code is readable and there's not much of it. But we've introduced some event handlers like `enterRatingState()` that are not defined. Presumably, these functions will reach into the container and show and hide their respective elements. But given that each state has many elements, how can we do this without introducing a bunch of JS? Let's introduce some CSS to do the heavy-lifting. **This is the second trick to writing less JS: defer view logic to CSS whenever possible.**

{% highlight css %}
.lesson-feedback.state-rating .rating,
.lesson-feedback.state-rating .visible-during-rating {
  display: inherit;
}
.lesson-feedback.state-rating .prompt,
.lesson-feedback.state-rating .comments,
.lesson-feedback.state-rating .done,
.lesson-feedback.state-rating .hidden-during-rating {
  display: none;
}
{% endhighlight %}

Let's unpack this. Obviously, `.lesson-feedback` is the container. We'll modify the container with `.state-*` classes to enter and exit the four states. This means there will also be `.state-prompt`, `.state-comments`, and `.state-done`. Each state needs blocks like the ones above. I've also included `.visible-during-*` and `.hidden-during-*` helper classes to control elements that span states (like the header and image). It may seem like a lot of CSS but once it's there you shouldn't need to change it unless you add or remove a state. Some of the repetition can also be reduced with a preprocessor like [LESS][less] or [SASS][sass].

Now, `enterRatingState()` and the other state-related functions are really lightweight:

{% highlight js %}
// You'll need a function like this for each state:
function enterRatingState() {
  enterState('rating');
}

function enterState(state) {
  container.removeClass('state-prompt state-rating state-comments state-done');
  container.addClass('state-' + state);
}
{% endhighlight %}

That's all we need to drive the interface; looking good! Now, let's look at data submission. In the first code example, I introduced `submitViaXHR()`. Let's define that now.

{% highlight js %}
function submitViaXHR(event) {
  event.preventDefault()

  var form = $(event.target);

  $.ajax(form.attr('action'), {
    type: form.attr('method'),
    data: form.serialize()
  }
}
{% endhighlight %}

Remember, all the forms have `submitViaXHR()` bound as an event handler on submit. Instead of submitting to the server with a traditional page refresh, jQuery steps in and submits the data via XHR instead — this is nothing new. The real elegance here is that they all submit the same way. There are not three different handlers for the prompt, rating, and comments forms. **The third trick to writing less JS is to keep data in HTML.** Here's an example of the HTML for the first state, prompt:

{% highlight html %}
<div class="lesson-feedback state-prompt">
  <div class="prompt">
    <div class="answer">
      <form action="/viewings" method="PUT" style="display: inline;">
        <input type="hidden" name="viewing[actually_taught]" value="true">
        <input type="submit" value="Yes" class="yes-control button button-green">
      </form>

      <form action="/viewings" method="PUT" style="display: inline;">
        <input type="hidden" name="viewing[actually_taught]" value="false">
        <input type="submit" value="No" class="no-control button button-red">
      </div>
    </div>
  </div>

  <!-- And so on for the other states... -->
</div>
{% endhighlight %}

There are two really lightweight forms with hidden values that submit to the server. That's all we need. The destination of the request (`/viewings`), the HTTP verb (`PUT`), and the request data (`{ viewing: { actually_taught: true} }`) are all stored in the markup and that's a good thing.

So let's recap. To write less JavaScript:

1. Find the right abstractions.
2. Defer view logic to CSS whenever possible.
3. Keep data in the HTML.

<div class="footnotes">
<p id="inherit">1: <code>inherit</code> is a better choice than <code>block</code> for visible elements. This approach will allow inline elements to preserve their inline display type.</p>
</div>

[mysci]: http://mysteryscience.com
[less]: http://lesscss.org
[sass]: http://sass-lang.comx`
[xhr]: https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest
