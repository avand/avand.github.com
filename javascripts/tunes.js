function initJumps() {
  $(".jumps a").click(function(e) {
    e.preventDefault();
    var jump = $(e.target)
    jump.parents('.track').find('audio')[0].currentTime = jump.data('seconds');
  })
}

function domReady() {
  initJumps();
}

$(document).ready(domReady);
