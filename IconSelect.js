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
(function(window) {
  var IconSelect = (function() {
    function IconSelect() {
    }
    IconSelect.prototype = {
      getStrokeColor: function() {
        return $("#showStrokePalette").spectrum("get").toHexString();
      },
      getFillColor: function() {
        return $("#showFillPalette").spectrum("get").toHexString();
      }
    };
    return IconSelect;
  }());
  
  IconSelect.create = function() {
    return new IconSelect();  
  };
  
  window.IconSelect = IconSelect;


  
}(window));
