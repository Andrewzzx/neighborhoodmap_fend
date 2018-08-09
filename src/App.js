import React, { Component } from 'react';
import MenuBar from './MenuBar';

class App extends Component {
  constructor(props) {
    super();
    this.state = {
      map: '',
      info: '',
      markers: [
        {
          lat: 55.7497641,
          lng: 37.5915945,
          name: 'Vakhtangov Theater'
        },
        {
          lat: 55.7602082,
          lng: 37.6183911,
          name: 'Bolshoi Theatre'
        },
        {
          lat: 55.7597077,
          lng: 37.6203653,
          name: 'Malyy Theatre'
        },
        {
          lat: 55.7602217,
          lng: 37.6128953,
          name: 'Art Theatre'
        },
        {
          lat: 55.7568289,
          lng: 37.6014191,
          name: 'Mayakovskogo Theater'
        }
      ],
      pmarker: ''
    };

    this.initMap = this.initMap.bind(this);
    this.openInfoWindow = this.openInfoWindow.bind(this);
    this.closeInfoWindow = this.closeInfoWindow.bind(this);
  }

  componentDidMount() {
    window.initMap = this.initMap;
    loadMap('https://maps.googleapis.com/maps/api/js?key=AIzaSyC4mrbpxYXYHA2asFPjQsoR6jPQrr3P4P4&callback=initMap');
  }

  initMap() {
    var self = this;
    var mapImage = document.getElementById("map");
    mapImage.style.height = window.innerHeight + 'px';
    var map = new window.google.maps.Map(mapImage, {
      center: {lat: 55.7559553, lng: 37.6117459},
      zoom: 15,
      mapTypeControl: false
    });

    var markerInfo = new window.google.maps.InfoWindow({});
    window.google.maps.event.addListener(markerInfo, 'closeclick', function() {
      self.closeInfoWindow();
    });

    this.setState({
      map: map,
      infoWindow: markerInfo
    });

    window.google.maps.event.addDomListener(window, 'resize', function() {
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
      marker.marker = mapMarker;
      marker.display = true;
      markers.push(marker);
    });
    this.setState({
      markers: markers
    });
  }

  openInfoWindow(marker) {
    this.closeInfoWindow();
    this.state.infoWindow.open(this.state.map, marker);
    marker.setAnimation(window.google.maps.Animation.BOUNCE);
    this.setState({
      pmarker: marker
    });
    this.state.infoWindow.setContent('Loading...');
    this.state.map.setCenter(marker.getPosition());
    this.state.map.panBy(0, -200);
    this.getMarkerInfo(marker);
  }

  //Information is got from the Foursquare API
  getMarkerInfo(marker) {
    var clientId = '3TQXSCSZARLE5ABTLSPG2MQ0IS3SEBY12MYIOPRTIX3SBG3R';
    var clientSecret = 'GL1C0OUIKIMF05KJ2R2RSOLD3QBVI40UZS1TFFQOT3C1WQZA';

    var foursquare = 'https://api.foursquare.com/v2/venues/search?client_id=' +
                      clientId + '&client_secret=' + clientSecret +
                      '&v=20180323&ll=' + marker.getPosition().lat() + ',' +
                      marker.getPosition().lng() + '&limit=1';
    var self = this;
    fetch(foursquare).then(function(response) {
      if (response.status !== 200) {
        self.state.infoWindow.setContent('Load is failed.');
        return ;
      }
      response.json().then(function(data) {
        console.log(data);
        var locationData = data.response.venues[0];
        var name = `<h3>${locationData.name}</h3>`;
        var street = `<p>${locationData.location.formattedAddress[0]}</p>`;
        var link = '<a href="https://foursquare.com/v/' + locationData.id +
        '"target="_blank">More...</a>';
        self.state.infoWindow.setContent(name + street + link);
      });
    })
    .catch(function(error) {
      self.state.infoWindow.setContent('Load is failed...')
    });
  }

  //close the previous InfoWindow

  closeInfoWindow() {
    if(this.state.pmarker) {
      this.state.pmarker.setAnimation(null);
    }
    this.setState({
      pmarker: ''
    });
    this.state.infoWindow.close();
  }

  render() {
    return (
      <div className="App">
        <MenuBar  markers={this.state.markers}
                  openInfoWindow={this.openInfoWindow}
                  closeInfoWindow={this.closeInfoWindow} />
        <div id="map" />
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
