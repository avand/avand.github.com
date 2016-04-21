---
layout: blog
title: AJAX Form Validation for Rails
---

Last Saturday at the [Chicago Ruby User Group][1] I gave a short presentation on Rails and AJAX. For part of the presentation I decided to solve a problem that’s haunted me as a web developer for some time – form validation.

## Here’s the dilemma:

You start with server side validation, then build your form. To validate the inputs, you have to make a round trip to the server, and re-render the entire page with the validation messages. Not the smoothest process, given the bar set by Web 2.0. But at the same time, if you try to engage the user more, you find yourself writing the same validation in JavaScript for the client – not fun.

## Here’s the solution:

Again, start with server side validation and a form. Then use JavaScript not to validate the data, but to facilitate an AJAX request to the server, where you there validate the field and send simple feedback to the user.

I started by searching for solutions for this. As it appears, I’m not the only developer in the room who wants AJAX validation. Here’s what I found: 

* <http://www.davidjrice.co.uk/articles/2006/11/29/inline-ajax-form-validation-plugin-for-ruby-on-rails>
* <http://www.ineightydays.com/archives/validating-an-ajax-form-in-ruby-on-rails>
* <http://www.bigsmoke.us/ajax-validation-on-rails/>

I opted, for the sake of practice, to use these as inspiration to my own solution, which goes something like this:

{% highlight ruby %}
def error_message_for(model, field, options = {})
  tag_id = "#{model}_#{field}_validator"

  # generate javascript for AJAX request and field observation
  function = "new Ajax.Request('/users/validate?field=#{field}&value=' + value, {" +
    "method: 'get'," +
    "onSuccess: function(transport) {" +
      "element = document.getElementById('#{tag_id}');" +
      "var output = transport.responseText;" +
      "var css_class = '#{options[:error_css_class]}';" +
      "if (output.length == 0) {" +
        "output = '#{options[:success]}';" +
        "css_class = '#{options[:success_css_class]}';" +
      "}" +
      "element.innerHTML = output;" +
      "element.setAttribute('class', css_class)" +
    "}" +
  " });"

  js = observe_field "#{model}_#{field}", :function => function

  # generate html for placing error message
  tag = content_tag(options[:tag], options[:hint], {
    :id => tag_id, :class => options[:hint_css_class]
  })

  return tag + js
end
{% endhighlight %}

I wanted my solution to be equally elegant as [Rails’ non-Ajax solution][3], so I created a method `error_message_for`, which takes the model, field name, and various options. First, it creates the JavaScript I’ll need with [`observe_field`][4], wiring up the Ajax request to the field we’re monitoring. Then, using [`content_tag`][5] produces an empty tag which will serve as our feedback placeholder. It returns all that HTML/JS to the browser. But, we haven’t done any validation yet. For that we need a validate action that can be called on whatever model you’re working with (in this case I’m working with a User):

{% highlight ruby %}
def validate
  field  = params[:field]
  user   = User.new(field => params[:value])
  output = "" user.valid? # trigger the errors hash to be filled

  if user.errors[field] != nil
    if user.errors[field].class == String
      output = "#{field.titleize} #{user.errors[field]}"
    else
      output = "#{field.titleize} #{user.errors[field].to_sentence}"
    end
  end
  
  render :text => output
end
{% endhighlight %}

Now, we’re cooking. As the user moves from field to field, the AJAX request we wrote is created, firing `validate`. Validate then uses the `valid?` method to populate the `errors` collection on our model which in turn allows us to return the same error messages Rails would if we were using [`error_message_on`][3].

Now we just implement it. Call our new `error_message_for` method right after the input field like so and that’s a wrap. The HTML and JS is returned to the browser when the page renders the first time. When focus leaves a particular field, its value is sent down to the server for validation, and the server replies with whatever applicable error messages, which are displayed in the originally empty HTML generated to begin with.

{% highlight ruby %}
form.text_field :email
error_message_for :user, :email, {
  :tag     => :span,
  :hint    => "Your email must be formatted properly.",
  :success => "Looking good!"
}
{% endhighlight %}

You may have noticed some code in there referring to `:success` and `:hint`. I figure, while we’re in there let’s add support for a hint to be displayed before any validation occurs, and a success message to display when validation is passed.

The best part of the whole thing, is it’s really DRY (Don’t Repeat Yourself), and therefore simple. Change your validation rules, and the UI updates dynamically. In addition the same approach can be used on any form that has an underlying model associated with it.

[Download an example from GitHub.][6]

[1]: http://chicagoruby.org/
[2]: http://www.ineightydays.com/archives/validating-an-ajax-form-in-ruby-on-rails
[3]: http://api.rubyonrails.org/classes/ActionView/Helpers/ActiveRecordHelper.html#M001005
[4]: http://api.rubyonrails.org/classes/ActionView/Helpers/PrototypeHelper.html#M000966
[5]: http://api.rubyonrails.org/classes/ActionView/Helpers/TagHelper.html#M001033
[6]: http://cloud.avandamiri.com/3L1z1Y0U2f3P
