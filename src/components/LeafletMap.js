import React, { Component } from 'react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Map, TileLayer, Marker } from 'react-leaflet';
import WeatherData from './WeatherData';

const map = {
  height: '50vh',
  width: '100vw',
};

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

class LeafletMap extends Component {

  constructor() {
    super();
    this.state = {
      lat: 52.12776972930117,
      lng: 18.984375000000004,
      zoom: 5,
      marker: [[]],
      markerPlaced: false,
    };
  }

  addMarker = (e) => {
    const { marker } = this.state;
    marker.pop();
    marker.push(e.latlng);
    this.setState({ marker, markerPlaced: true });
  }

  render() {
    return (
      <div>
        <Map style={map} worldCopyJump={false} tap={false} center={[this.state.lat, this.state.lng]} zoom={this.state.zoom} onClick={this.addMarker}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {this.state.markerPlaced && this.state.marker.map((position, index) =>
            <Marker key={`marker-${index}`} position={position} />
          )}
        </Map>
        <WeatherData coords={this.state.marker} />
      </div>
    );
  }
}

export default LeafletMap;