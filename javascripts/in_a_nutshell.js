$(document).ready(function() {
  var flickr_url = "http://api.flickr.com/services/feeds/photoset.gne?set=72157622591314010&nsid=10385270@N02&lang=en-us&format=json&jsoncallback=?"
  
  $.getJSON(flickr_url, function(data) {
    var bikeUnorderedList = $('dd.bike > ul');
    bikeUnorderedList.hide();
    
    $.each(data.items, function(i, item) {
      if (i > 4) return;
      var src = this.media.m;
      var bikeListElement = $("<li />").css('background-image', "url(\"" + src + "\")");
      bikeUnorderedList.append(bikeListElement);
    });
    
    bikeUnorderedList.find('li:last-child').addClass('last');
    
    bikeUnorderedList.show();
    // elements.append($.flickr.thumbnail(data.photos))
  })
  
  var dl = $('dl');
  $('dd.work > ul > li, dd.play > ul > li').click(function() {
    dl.css('opacity', 0.0);
    
    var lightbox = $('div.lightbox.' + $(this).attr('class').split(' ')[0]);
    lightbox.show();
    lightbox.children('div.close').click(function() {
      dl.css('opacity', 1.0);
      lightbox.hide();
    });
  });
});
