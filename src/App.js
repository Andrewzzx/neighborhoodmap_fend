import React, { Component } from 'react';

class App extends Component {
  constructor(props) {
    super();
    this.state = {
      map: '',
      info: '',
      markers: [
        {
          lat:
          lng:
          name:
        }
      ],
    }
  }

  componentDidMount() {
    window.initMap = this.initMap;
    loadMap();
  }

  initMap() {
    var self = this;
    var mapImage = document.getElementById("map");
    mapImage.style.height = window.innerHeight + 'px';
    var map = new window.google.maps.Map(mapview, {
      center: {lat: 3, lng: 11},
      zoom: 15,
      mapTypeControl: false
    });

    var markerInfo = new window.google.maps.InfoWindow({});
    window.google.maps.event.addListener(markerInfo, 'closeclick', function() {
      self.closeInfoWindow();
    });

    this.setState({
      map: map,
      infoWindow = markerInfo
    });

    window.google.maps.event.addDOMListener(window, 'resize', function() {
      var center = map.getCenter();
      window.google.maps.event.trigger(map, 'resize');
      self.state.map.setCenter(center);
    });

    window.google.maps.event.addListener(map, 'click', function() {
      self.closeInfoWindow();
    });

    var markers = [];
    this.state.markers.forEach(function(marker) {
      var name = marker.name;
      var mapMarker = new window.google.maps.Marker({
        position: new window.google.maps.LatLng(marker.lat, marker.lng),
        animation: window.google.maps.Animation.DROP,
        map: map
      });

      mapMarker.addListener('click', function() {
        self.openInfoWindow(mapMarker);
      });

      marker.longname = name;
      marker.marker = marker;
      marker.display = true;
      markers.push(marker);
    });
    this.setState({
      markers: markers
    });
  }

  render() {
    return (
      <div className="App">

      </div>
    );
  }
}

export default App;

//function that loads google maps

function loadMap(map) {
  var script = window.document.createElement('script');
  script.src = map;
  script.async = true;
  script.onerror = function() {
    document.write('Maps do not load');
  }
  var ref = window.document.getElementsByTagName('script')[0];
  ref.parentNode.insertBefore(script, ref);
}
