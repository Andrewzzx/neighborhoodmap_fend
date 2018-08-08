import React, {Component} from 'react';

export default class Marker extends Component {
  render() {
    return (
      <li role="button"
          className="marker"
          tabIndex="0"
          onClick={this.props.openInfoWindow.bind(this, this.props.data.marker)}>
            {this.props.data.longname}
          </li>
    );
  }
}
