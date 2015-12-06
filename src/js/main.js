var microsoftLatLong = { lat:-34.5991426, lng:-58.3695557},
    mapCanvas,map,marker;

$(document).foundation();

$(document).on("ready", function () {
  $("#menu").removeClass("hide");
});

function initialize() {
  mapCanvas = document.getElementById("map");
  map = new google.maps.Map(mapCanvas, {
    center: new google.maps.LatLng(microsoftLatLong),
    zoom: 18,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    scrollwheel: false,
    disableDefaultUI: true
  });

  marker = new google.maps.Marker({
    position: microsoftLatLong,
    map: map,
    title: "Microsoft Argentina"
  });

  google.maps.event.addDomListener(window, "resize", function() {
      map.setCenter(microsoftLatLong);
  });
}

$(function() {
  $("a[href*=#]:not([href=#])").click(function() {
    if (location.pathname.replace(/^\//,"") == this.pathname.replace(/^\//,"") && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $("[name=" + this.hash.slice(1) +"]");
      if (target.length) {
        $("html,body").animate({
          scrollTop: target.offset().top
        }, 500);
        return false;
      }
    }
  });

  google.maps.event.addDomListener(window, "load", initialize);
});