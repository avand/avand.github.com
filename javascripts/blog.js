$(document).ready(function() {
  $('#start-comment > a').click(function () {
    $(this).parents('#comments').find('h1, p').remove();
    $('#disqus_thread').show();

    return false;
  })
});
