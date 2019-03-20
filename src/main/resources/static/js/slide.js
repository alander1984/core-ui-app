$(document).ready(function () {
  console.log("ready!");
  $("#slide-down-menu-button").hide();

  $('#slide-right').click(function () {
    $('#map-wrapper').css('min-width', '100%');
    $('.content-wrapper').css('min-width', '0%');
  });

  $('#slide-left').click(function () {
    $('#map-wrapper').css('min-width', '2.67%');
    $('.content-wrapper').css('min-width', '100%');
  });

  $("#slide-up-menu-button").click(function (e) {
    $("#slide-up-menu-button").hide();
    $(".sidenav").width(250);
    $("#slide-down-menu-button").show("slow");
  });

  $("#slide-down-menu-button").click(function (e) {
    $("#slide-down-menu-button").hide();
    $(".sidenav").width(50);
    $("#slide-up-menu-button").show("slow");
  });
});

