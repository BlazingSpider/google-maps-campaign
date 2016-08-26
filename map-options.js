/**
 * Google Maps Campaign
 * Version 1.1.2 - 2016-08-02
 * Licensed under MIT (https://github.com/BlazingSpider/google-maps-campaign/blob/master/LICENSE)
 * Copyright 2015-2016 Blazing Spider Web Solutions
 * @author Massoud Shakeri (http://www.blazingspider.com)
 *
 *  Modifications include:
 *  . enhanced user interface to a Tabbed one.
**/
(function(window, google, mapster) {

  // remove labels
  // water - 3498db
  // landscape - 27ae60
  // poi - 27ae60
  // transit - 27ae60
  // highways - 34495e
  // main roads - ecf0f1
  
  var styles = [{
    featureType: 'all',
    elementType: 'labels',
    stylers: [
      { visibility: 'on' }  
    ]
  }];
  
  mapster.MAP_OPTIONS = {
    center: {
      lat: 37.791350,
      lng: -122.435883
    },
    zoom: 10,
    disableDefaultUI: false,
    scrollwheel: true,
    draggable: true,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    zoomControlOptions: {
      position: google.maps.ControlPosition.LEFT_BOTTOM,
      style: google.maps.ZoomControlStyle.DEFAULT
    },
    panControlOptions: {
      position: google.maps.ControlPosition.LEFT_BOTTOM
    },
    cluster: false,
    geocoder: true,
    styles: styles
  };
  
}(window, google, window.Mapster || (window.Mapster = {})))