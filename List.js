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
  var List = (function() {
    function List() {
      this.items = [];
    }
    List.prototype = {
      add: function(item) {
        this.items.push(item);
      },
      remove: function(item) {
        var indexOf = this.items.indexOf(item);
        if (indexOf !== -1) {
          this.items.splice(indexOf, 1);
        }
      },
      find: function(callback, action) {
        var callbackReturn,
            items = this.items,
            length = items.length
            matches = [],
            i = 0;
        
        for(; i < length; i++) {
          callbackReturn = callback(items[i], i);
          if (callbackReturn) {
            matches.push(items[i]);
          }
        }
        
        if (action) {
          action.call(this, matches);
        }
        
        return matches;
      }
    };
    return List;
  }());
  
  List.create = function() {
    return new List();  
  };
  
  window.List = List;


  
}(window));
