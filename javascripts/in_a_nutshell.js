function displayLightbox(lightbox, background) {
  background.hide();
  lightbox.fadeIn();
  
  lightbox.children('div.close').click(function() {
    lightbox.fadeOut();
    background.fadeIn();
  });
}

function extractDate(date) {
  var dateParts = /(\d{4})-(\d{2})-(\d{2})T/.exec(date);
  var date = new Date(dateParts[1], dateParts[2], dateParts[3]);
  
  return dateFormat(date, 'fullDate');
}

$(document).ready(function() {
  var flickr_url = "http://api.flickr.com/services/feeds/photoset.gne?set=72157622591314010&nsid=10385270@N02&lang=en-us&format=json&jsoncallback=?"
  var dl = $('dl');
  
  $.getJSON(flickr_url, function(data) {
    var bikeUnorderedList = $('dd.bike > ul');
    var contentDiv = $('#content');
    
    bikeUnorderedList.hide();
    
    $.each(data.items, function(i, item) {
      if (i > 4) return; // Only allow up to 5 bikes to be shown
      
      var src = this.media.m;
      var dateTaken = extractDate(this.date_taken)
      
      var bikeListElement = $("<li />").css('background-image', "url(\"" + src + "\")");
      var bikeLightbox = $(
        "<div class='lightbox bike'>" +
          "<div class='close'>Close</div>" +
          "<h1>" + dateTaken + "</h1>" +
          "<p><img src='" + src.replace('_m.jpg', '_d.jpg') + "' /></p>" +
        "</div>"
      );
      
      contentDiv.append(bikeLightbox);
      bikeUnorderedList.append(bikeListElement);
      
      bikeListElement.click(function() {
        displayLightbox(bikeLightbox, dl);
      });
    });
    
    bikeUnorderedList.find('li:last-child').addClass('last');
    
    bikeUnorderedList.show();
  })
  
  $('dd.work > ul > li, dd.play > ul > li').click(function() {
    var lightbox = $('div.lightbox.' + $(this).attr('class').split(' ')[0]);
    
    displayLightbox(lightbox, dl);
  });
});
