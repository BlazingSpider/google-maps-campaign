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
(function(window, google, List, IconSelect) {

  var Mapster = (function() {
    function Mapster(element, opts) {
      this.gMap = new google.maps.Map(element, opts);
      this.markers = List.create();
      this.polygons = List.create();
      this.iconSelect = IconSelect.create();
      this.uniqueId = 1;
      this.loopPoly = 0;
      if (opts.cluster) {
        this.markerClusterer = new MarkerClusterer(this.gMap, [], opts.cluster.options);
      }
      if (opts.geocoder) {
        this.geocoder = new google.maps.Geocoder();
      }
    }
    Mapster.prototype = {
      zoom: function(level) {
        if (level) {
          this.gMap.setZoom(level);
        } else {
          return this.gMap.getZoom();
        }
      },
      addPoly: function() {
        var self = this;
        self.poly = new google.maps.Polygon({
          strokeColor: this.iconSelect.getStrokeColor(),
          strokeOpacity: 0.5,
          strokeWeight: 2,
          fillColor: this.iconSelect.getFillColor(),
          fillOpacity: 0.15,
          draggable: false,
          editable: true
        });
        self.poly.StrokeColor = this.iconSelect.getStrokeColor();
        self.poly.FillColor = this.iconSelect.getFillColor();
        self.poly.FillOpacity = 0.15;
        self.poly.strokeOpacity = 0.5;
        // if textarea has text, assign as conten
        if (window.InfoText !== "") {
          self.poly.content = window.InfoText;
          window.InfoText = '';
        }
        self.poly.setMap(self.gMap);
        this.loopPoly = 0;
        self._addPolygons(self.poly);

        google.maps.event.addListener(self.poly, 'click', function (event) {
          if (window.drawMode === 4) {
            //Remove the polygon from Map                   
            this.setMap(null);
            //Remove the marker from array.
            window.mapref.polygons.remove(this);
          }
        });  

      },
      addVertexToPoly: function(point) {
        var self = this;
        var path = self.poly.getPaths();
        path.b[self.loopPoly].push(point);
        if (path.b[self.loopPoly].length >= 3) {
          $('#new-poly-loop').show();
        } else {
          $('#new-poly-loop').hide();
          $('#new-poly').show();
        }
      },
      addLoopPoly: function() {
        var self = this;
        self.loopPoly++;
        var emp = new google.maps.MVCArray([]);
        var path = self.poly.getPaths();
        path.push(emp);
      },

      _on: function(opts) {
        var self = this;
        google.maps.event.addListener(opts.obj, opts.event, function(e) {
          opts.callback.call(self, e, opts.obj);
        });
      },
      geocode: function(opts) {
        this.geocoder.geocode({
          address: opts.address
        }, function(results, status) {
          if (status === google.maps.GeocoderStatus.OK) {
            opts.success.call(this, results, status);
          } else {
            opts.error.call(this, status);
          }
        });
      },
      getCurrentPosition: function(callback) {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            callback.call(this, position);
          });
        }
      },
      setPano: function(element, opts) {
        var panorama = new google.maps.StreetViewPanorama(element, opts);
        if (opts.events) {
          this._attachEvents(panorama, opts.events);
        }
        this.gMap.setStreetView(panorama);
      },

      addMarker: function(opts) {
        var marker,
          self = this;
        marker = this._createMarker(opts);
        if (marker == null) {
          return null;
        }
        // if textarea has text, assign as conten
        if (window.InfoText !== "") {
          opts.content = window.InfoText;
          marker.content = window.InfoText;
          window.InfoText = '';
        }
        //Set unique id
        marker.id = this.uniqueId;
        this.uniqueId++;

        if (this.markerClusterer) {
          this.markerClusterer.addMarker(marker);
        }
        this._addMarker(marker);
        if (opts.events) {
          this._attachEvents(marker, opts.events);
        }
        if (opts.content) {
          this._on({
            obj: marker,
            event: 'click',
            callback: function() {
              var infoWindow = new google.maps.InfoWindow({
                content: opts.content
              });

              infoWindow.open(this.gMap, marker);
            }
          })
        }
        return marker;
      },
      _attachEvents: function(obj, events) {
        var self = this;
        events.forEach(function(event) {
          self._on({
            obj: obj,
            event: event.name,
            callback: event.callback
          });
        });
      },
      _addPolygons: function(poly) {
        this.polygons.add(poly);
      },
      _addMarker: function(marker) {
        this.markers.add(marker);
      },
      findBy: function(callback) {
        return this.markers.find(callback);
      },
      findPolyBy: function(callback) {
        return this.polygons.find(callback);
      },
      removeBy: function(callback) {
        var self = this;
        self.markers.find(callback, function(markers) {
          markers.forEach(function(marker) {
            if (self.markerClusterer) {
              self.markerClusterer.removeMarker(marker);
            } else {
              marker.setMap(null);
            }
          });
        });
      },
      _createMarker: function(opts) {
        var iconName = $("#select-icon option:selected").val();
        if (iconName != null) {
          opts.map = this.gMap;
          //opts.icon = this.iconSelect.getIcon();
          opts.icon = {
            nIndex: this._addIconNameToList(iconName),
            path: (iconName.substring(0, 1) === "_")? window.BlazingIcons[iconName] : fontawesome.markers[iconName],
            scale: 0.5,
            strokeWeight: 0.2,
            strokeColor: this.iconSelect.getStrokeColor(),
            strokeOpacity: 1,
            fillColor: this.iconSelect.getFillColor(),
            fillOpacity: 0.7,
            rotation: window.RotationAngle
          };
          return new google.maps.Marker(opts);
        }
        return null;
      },
      _addIconNameToList: function(name) {
        var bExist = false;
        for (i=0; i< window.IconList.length; i++) {
          if ( name === window.IconList[i]) {
            bExist = true;
            break;
          }
        }
        if ( !bExist && name != null) {
          window.IconList.push(name);
        }
        return i;
      }
    };
    return Mapster;
  }());

  Mapster.create = function(element, opts) {
    return new Mapster(element, opts);
  };

  window.Mapster = Mapster;
  window.drawMode = 1;


}(window, google, List, IconSelect));