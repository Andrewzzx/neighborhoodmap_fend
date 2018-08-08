import React, {Component} from 'react';
import Marker from './Marker';

export default class MenuBar extends Component {
  constructor(props) {
    super();
    this.state = {
      markers: ''
    };
    this.filterMarkers = this.filterMarkers.bind(this);
  }

  //query check and filtering
    filterMarkers(event) {
      this.props.closeInfoWindow();
      const {value} = event.target;
      var locations = [];
      this.props.markers.forEach(function(location) {
        if (location.longname.toLowerCase().indexOf(value.toLowerCase()) >= 0) {
          location.marker.setVisible(true);
          locations.push(location);
        } else {
          location.marker.setVisible(false);
        }
      });
      this.setState({
        markers: locations,
        query: value
      });
  }

  componentWillMount() {
    this.setState({
      markers: this.props.markers
    });
  }

  render() {
    var list = this.state.markers.map(function(listItem, index) {
      return (<Marker key={index}
                      openInfoWindow={this.props.openInfoWindow.bind(this)}
                      data={listItem} />);
    }, this);

    return (
      <div className="search">
        <input role="search"
                id="search-field"
                className="search-input"
                aria-labelledby="filter"
                type="text"
                placeholder="Type name"
                value={this.state.query}
                onChange={this.filterMarkers} />
        <ul className="location-list">
          {list}
        </ul>
      </div>
    )
  }
}
