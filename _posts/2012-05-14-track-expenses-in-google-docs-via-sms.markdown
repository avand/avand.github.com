---
layout: blog
title: Track Expenses in Google Docs via SMS
---

<img src="http://farm9.staticflickr.com/8145/7199153550_d3a50c9809_n.jpg" alt="Track Expenses in Google Docs via SMS" title="Track Expenses in Google Docs via SMS" class="right">

Tracking expenses is a pain in the butt. At Sqoot, we use Google Docs for almost everything, including expenses, but entering anything on the go is cumbersome. Today, I got frusted and decided to take an hour and hack something together.

I wanted to be able to text something like this:

* "35 Burgers with the team"
* "420.15 Hosting costs"

Those text should become entries in a spreadsheet like this:

<table style="width: 300px">
  <tr>
    <th>Description</th>
    <th>Date</th>
    <th>Amount</th>
  </tr>
  <tr>
    <td>Burgers with the team</td>
    <td>5/14/2012</td>
    <td>$35.00</td>
  </tr>
  <tr>
    <td>Hosting costs</td>
    <td>5/12/2012</td>
    <td>$420.15</td>
  </tr>
</table>

## Twilio

I had never worked with [Twilio][1] before but it was a cinch.

I set up a new account and funded it. For $1.00/mo, I got myself a phone number that I could start texting. Twilio will POST to whatever URL you specify when a text comes into that number. So getting texts into my app was basically done.

Eventually, I would also need to send back a confirmation text. Turns out that's pretty trivial as well with the [Twilio Ruby gem][3]:

{% highlight ruby %}
TWILIO = Twilio::REST::Client.new "twilio-account-sid", "twilio-auth-token"

TWILIO.account.sms.messages.create({
  to:   "from-phone-number",
  from: "to-phone-number",
  body: "Success!"
})
{% endhighlight %}


## Google Drive Gem

After a little sleuthing, I found a [Google Drive gem][2] that would let me interact with our expense spreadsheet with just a few lines of Ruby:

{% highlight ruby %}
require "google_drive"

session     = GoogleDrive.login("avand@sqoot.com", "would-you-like-to-know")
spreadsheet = session.spreadsheet_by_key("...")
worksheet   = spreadsheet.worksheets[1]
row         = worksheet.num_rows + 1

worksheet[row, 1] = "Burgers with the team"
worksheet[row, 2] = "5/14/2012"
worksheet[row, 3] = "35.00"

worksheet.save
{% endhighlight %}

This simply grabs the spreadsheet, opens up the worksheet, and adds a row with three columns to end.

## Brioche

Finally, I wrapped up all this code into a very simple [Sinatra][4] app called [Brioche][5]. It responds to a POST to /expenses and expects the parameters Twilio sends over. Brioche then parses the body of the text, connects to Google Docs, and adds a row to a worksheet. Finally, it composes a confirmation message and sends it back via the Twilio API.

It doesn't handle errors and you'll need to set your Google password as an environmental variable on Heroku (shudder), but for an hour's worth of work, it works pretty well!

Cheers!

[1]: http://twilio.com
[2]: https://github.com/gimite/google-drive-ruby
[3]: https://github.com/twilio/twilio-ruby
[4]: http://www.sinatrarb.com/
[5]: https://github.com/avand/brioche
