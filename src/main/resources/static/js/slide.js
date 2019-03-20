$(document).ready(function() {
  console.log( "ready!" );
  $('#slide-right').click(function () {
    $('.content-wrapper').slideDown();
  });

  $('#slide-left').click(function () {
    $('.map-wrapper').slideDown();
  });
});

