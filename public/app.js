// Generated by CoffeeScript 1.3.3
(function() {
  var apartments, clearMarkers, findApartments, map, mapApartments, markers;

  apartments = [];

  markers = [];

  map = null;

  $(function() {
    var mapOptions;
    mapOptions = {
      center: new google.maps.LatLng(29.9728, -90.05902),
      zoom: 13,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    map = new google.maps.Map(($('#map_canvas'))[0], mapOptions);
    $.getJSON('/apartments', function(data) {
      var a;
      apartments = (function() {
        var _i, _len, _results;
        _results = [];
        for (_i = 0, _len = data.length; _i < _len; _i++) {
          a = data[_i];
          _results.push(new Apartment(a));
        }
        return _results;
      })();
      return mapApartments(apartments);
    });
    return ($('button#filter')).click(function() {
      var max_beds, max_price, min_beds, min_price;
      min_price = ($('#min-price-input')).val();
      max_price = ($('#max-price-input')).val();
      min_beds = ($('#min-beds-input')).val();
      max_beds = ($('#max-beds-input')).val();
      return mapApartments(findApartments(min_price, max_price, min_beds, max_beds));
    });
  });

  mapApartments = function(apartments) {
    var apartment, infoWindow, marker, _i, _len, _results;
    clearMarkers();
    _results = [];
    for (_i = 0, _len = apartments.length; _i < _len; _i++) {
      apartment = apartments[_i];
      marker = new google.maps.Marker({
        position: new google.maps.LatLng(apartment.latitude, apartment.longitude),
        html: '<a href="' + apartment.url + '" target="_blank">' + apartment.title + '</a>' + ' beds: ' + apartment.beds + 'price: ' + apartment.price
      });
      markers.push(marker);
      infoWindow = new google.maps.InfoWindow();
      marker.setMap(map);
      _results.push(google.maps.event.addListener(marker, 'click', function() {
        infoWindow.setContent(this.html);
        return infoWindow.open(map, this);
      }));
    }
    return _results;
  };

  clearMarkers = function() {
    var marker, _i, _len;
    for (_i = 0, _len = markers.length; _i < _len; _i++) {
      marker = markers[_i];
      marker.setMap(null);
    }
    return markers = [];
  };

  findApartments = function(min_price, max_price, min_beds, max_beds) {
    var a, matchingApartment, _i, _len, _results;
    matchingApartment = function(a) {
      var result;
      result = true;
      if (min_price) {
        result = result && a.price >= min_price;
      }
      if (max_price) {
        result = result && a.price <= max_price;
      }
      if (min_beds) {
        result = result && a.beds >= min_beds;
      }
      if (max_beds) {
        result = result && a.beds <= max_beds;
      }
      return result;
    };
    _results = [];
    for (_i = 0, _len = apartments.length; _i < _len; _i++) {
      a = apartments[_i];
      if (matchingApartment(a)) {
        _results.push(a);
      }
    }
    return _results;
  };

}).call(this);
