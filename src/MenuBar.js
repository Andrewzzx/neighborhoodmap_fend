import React, {Component} from 'react';
import Marker from './Marker';
import { slide as Menu } from 'react-burger-menu';

export default class MenuBar extends Component {
  constructor(props) {
    super();
    this.state = {
      markers: '',
      menuOpen: false
    };
    this.filterMarkers = this.filterMarkers.bind(this);
  }

  handleStateChange (state) {
    this.setState({menuOpen: state.isOpen})
  }

  closeMenu () {
    this.setState({menuOpen: false})
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
                      data={listItem}
                      />);
    }, this);

    return (
      <Menu width={'250px'} isOpen={this.state.menuOpen}
            onStateChange={(state) => this.handleStateChange(state)}>
      <div className="search">

        <input role="search"
                className="search-input"
                aria-labelledby="filter"
                type="text"
                placeholder="Type name"
                value={this.state.query}
                onChange={this.filterMarkers} />
        <ul className="location-list" onClick={() => this.closeMenu()}>
          {list}
        </ul>
      </div>
    </Menu>
    )
  }
}
