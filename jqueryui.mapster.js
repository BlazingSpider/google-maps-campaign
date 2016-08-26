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
(function(window, Mapster) {
  

  $.widget("mapster.mapster", {

      // default options
      options: {  },


 
      // the constructor
      _create: function() {
        var element = this.element[0],
            options = this.options;
        this.map = Mapster.create(element, options);
        window.mapref = this.map;
      },
 
      // called when created, and later when changing options
      _refresh: function() {
        
      },
      // dddfdf
      setOptions: function (mode) {
        var self = this;
        window.drawMode = mode;
        if ( mode === 3) {
          this.map.addPoly();
        }
      },
 
      // Add a marker onto the map
      addMarker: function( opts ) {
      var self = this;
        opts.position = opts.latLng;
        if (opts.location) {
          this.map.geocode({
            address: opts.location,
            success: function(results) {
              results.forEach(function(result) {
                opts.lat = result.geometry.location.lat();
                opts.lng = result.geometry.location.lng();
                self.map.addMarker(opts);
              });
            },
            error: function(status) {
              console.error(status)
            }
          });
        } else {
          this.map.addMarker(opts);  
        }
      },

       // Add a Listener onto the map
      addListener: function( opts ) {
          this.map.gMap.addListener(opts, this.addLatLng);
      },

      addLatLng: function (opts) {
        var self = this;
        opts.events = [{
          name: 'click',
          callback: function (e, marker) {
            if (window.drawMode === 2) {
              //Remove the marker from Map                   
              marker.setMap(null);
              //Remove the marker from array.
              this.markers.remove(marker);
            }
          }
        }];
        if (window.drawMode === 1) {
          var $mapster = $('#map-canvas').mapster(Mapster.MAP_OPTIONS);
          $mapster.mapster('addMarker',opts);
        } else if (window.drawMode === 3) {
          var $mapster = $('#map-canvas').mapster(Mapster.MAP_OPTIONS);
          $mapster.mapster('addVertexToPoly',opts.latLng);         
        }
      },
      addVertexToPoly: function(point) {
        this.map.addVertexToPoly(point);
      },
      addLoopPoly: function() {
        this.map.addLoopPoly();
      },

      findMarkers: function(callback) {
        return this.map.findBy(callback);
      },
      
      findPolygons: function(callback) {
        return this.map.findPolyBy(callback);
      },

      removeMarkers: function(callback) {
        this.map.removeBy(callback);
      },
      
      markers: function() {
        return this.map.markers.items;
      },
      
      getCurrentPosition: function(callback) {
        this.map.getCurrentPosition(callback);
      },
      
      setPano: function(selector, opts) {
        var elements = $(selector),
            self = this;
        $.each(elements, function(key, element) {
          self.map.setPano(element, opts);             
        });
      },
 
      // events bound via _on are removed automatically
      // revert other modifications here
      _destroy: function() {
        
      },
 
      // _setOptions is called with a hash of all options that are changing
      // always refresh when changing options
      _setOptions: function() {
        // _super and _superApply handle keeping the right this-context
        this._superApply( arguments );
        this._refresh();
      },
 
      // _setOption is called for each individual option that is changing
      _setOption: function( key, value ) {
        this._super( key, value );
      },

      // Get Map Zoom
      GetZoom: function() {
        window.MapZoom = this.map.gMap.getZoom();
        window.MapCenter = this.map.gMap.getCenter();
      }
    });
  
}(window, Mapster))