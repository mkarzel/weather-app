import React, { Component } from 'react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet'
import { Map, TileLayer, Marker } from 'react-leaflet'

const map = {
  height: '50vh',
  width: '100vw'
}

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

class LeafletMap extends Component {

  constructor() {
    super();
    this.state = {
      lat: 53.4327,
      lng: 14.5481,
      zoom: 9,
      marker: [[53.4327, 14.5481]],
    };
  }

  addMarker = (e) => {
    const { marker } = this.state
    marker.pop();
    marker.push(e.latlng)
    this.setState({ marker })

    const { lat, lng } = e.latlng
    console.log(`marker coords: ${lat} ${lng}`)
  }

  render() {
    return (
      <Map style={map} center={[this.state.lat, this.state.lng]} zoom={this.state.zoom} onClick={this.addMarker}>
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {this.state.marker.map((position, index) =>
          <Marker key={`marker-${index}`} position={position}>
          </Marker>
        )}
      </Map>
    )
  }
}

export default LeafletMap