$(document).ready(function () {
  console.log("ready!");
  var map_wrapper = $('#map-wrapper');
  var content_wrapper = $('.content-wrapper');
  var slide_down_menu_button = $("#slide-down-menu-button");
  var slide_up_menu_button = $("#slide-up-menu-button");

  slide_down_menu_button.hide();

  $('#slide-right').click(function () {
    if (map_wrapper.width() < 50) {
      map_wrapper.css('min-width', '50%');
      content_wrapper.css('min-width', '50%');
    } else {
      map_wrapper.css('min-width', '100%');
      content_wrapper.css('min-width', '0%');
    }
  });

  $('#slide-left').click(function () {
    if (content_wrapper.width() < 50){
      map_wrapper.css('min-width', '50%');
      content_wrapper.css('min-width', '50%');
    } else {
      map_wrapper.css('min-width', '2.67%');
      map_wrapper.css('width', '0');
      content_wrapper.css('min-width', '100%');
    }

  });

  slide_up_menu_button.click(function (e) {
    slide_up_menu_button.hide();
    $(".sidenav").width(250);
    slide_down_menu_button.show("slow");
  });

  slide_down_menu_button.click(function (e) {
    slide_down_menu_button.hide();
    $(".sidenav").width(50);
    slide_up_menu_button.show("slow");
  });
});

