# Add PDF and XLS Download Support in Minutes with DocRaptor

There's many projects that need to report on data to their users. [Sqoot][1], for example, makes it dead simple to add daily deals to any website. By just dropping in a few HTML and JS tags you can add a comprehensive deal page to your site. But that's just half the battle. Customers want to know how many deals were shown, clicked on and, ultimately, purchased. We want to make our customers' lives as easy as possible, so allowing them to export this data to an Excel or PDF is a no brainer. We used [DocRaptor][3] to get this functionality built in a few minutes.

## Building the Report

For this example the most important thing to do was first to generate our report within our Rails app. We ended up with something like this:

{% highlight html %}
<table id="summary">
  <tr>
    <td>120 pageviews</td>
    <td>400 impressions</td>
    <td>13 clicks</td>
  </tr>
</table>

<table id="details">
  <tr>
    <th>Deal</th>
    <th>Impressions</th>
    <th>Clicks</th>
  </tr>
  <tr>
    <td>50% Off at Yoga</td>
    <td>14</td>
    <td>1</td>
  </tr>
  <!-- and so on -->
</table>
{% endhighlight %}

Of course, there would be some logic looping over each deal, counting the clicks and impressions, but this shows us the end result.

## Export to PDF

We wanted to provide our customers the ability to download a PDF version of the report, but we didn't want to break our backs doing it. So we used DocRaptor's API to generate PDF's and XLS's on the fly.

You can point DocRaptor to a URL or give them the content you need converted directly. Since our server had already done the work of generating the report, we opted to do the later. DocRaptor has good Ruby support but at the end of the day they just wrap simple HTTP POSTs. So we decided to use JS to do that work.

Building off of [DocRaptor's jQuery example][2], we laid down some JS:

{% highlight js %}
function download(docData) {  
  var data   = { doc: docData, user_credentials => 'API_KEY' };
  var action = 'http://docraptor.com/docs?' + $.param(data);

  $('<form method="post" style="display: none" action="' + action + '"></form>')
    .appendTo('body').submit().remove();
};

$(document).ready(function() {
  $('a[rel=docraptor]').click(function(event) {
    event.preventDefault();

    var docType = $(this).data('doc-type');

    download(, {
      test: true,
      document_type: docType,
      name: $('title').text().substring(0, 199),
      document_content: $('#' + docType + '-content').html(),
      strict: 'none'
    })
  });
});
{% endhighlight %}

Let's walk through that code:

1. We define a function `download` that sets up the data hash we'll send to DocRaptor.
2. Using that hash we build a URL, which we `POST` to from a temporary form.
3. We bind that `download` action to the click event of any `a` tag where `rel="docraptor"`.
4. The title of the doc becomes the title of the page (limited to 200 characters).
5. The type of document we're converting is extracted from the `a` tag's `data-doc-type` attribute. For example: `<a href="#" data-doc-type="pdf" rel="docraptor">...</a>`
6. The actual contents of the PDF become the contents of a DOM element with the id of "pdf-content" (in the PDF case). For example: `<div id="pdf-content">...</div>`

So with a little modification to our HTML, we're up and running:

{% highlight html %}
<a href="#" rel="docraptor" data-doc-type="pdf">Download as PDF</a>

<div id="pdf-content">
  <table id="summary">
    <!-- same as before -->
  </table>

  <table id="details">
    <!-- same as before -->
  </table>
</div>
{% endhighlight %}

## Export to XLS

Exporting to an Excel doc is actually just as easy, because of the way we structured the JS. However, for the Excel doc, we figured that the summary table probably wasn't as important. We'll just hand off the details table to DocRaptor and get one spreadsheet back.

{% highlight html %}
<a href="#" rel="docraptor" data-doc-type="xls">Download as Excel</a>

<div id="pdf-content">
  <div id="xls-content">
    <table id="details">
      <!-- same as before -->
    </table>
  </div>
</div>
{% endhighlight %}

## A Couple Caveats

There's a couple things to keep in mind:

* We didn't care to have DocRaptor conver the whole page. Our header, menu, footer and backgrounds weren't components we thought a PDF would need. However, we could have simply passed DocRaptor `{ doc: { document_url: 'http://...' } }` if were were comfortable doing that.
* We also didn't care to preserve all the styling of our tables. If this was really important, we could simply have moved our stylesheets into the HTML. For us, it was sufficient to add the most basic CSS declarations directly inline: `<table id="details" style="width: 100%">`.

[1]: http://www.sqoot.com/
[2]: http://docraptor.com/examples
[3]: http://docraptor.com/