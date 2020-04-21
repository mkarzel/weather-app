import React, { Component } from 'react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'

const map = {
  height: '60vh',
  width: '100vw'
}

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

class LeafletMap extends Component {

  // state = {
  //   lat: 52.2277,
  //   lng: 19.3579,
  //   zoom: 5,
  // }

  constructor() {
    super();
    this.state = {
      lat: 53.4327,
      lng: 14.5481,
      zoom: 9,
      markers: [[53.4327, 14.5481]],
    };
  }

  addMarker = (e) => {
    const { markers } = this.state
    markers.pop();
    markers.push(e.latlng)
    this.setState({ markers })

    const { lat, lng } = e.latlng
    console.log(`Clicked at ${lat}, ${lng}`)
  }

  // handleClick = event => {
  //   const { lat, lng } = event.latlng
  //   console.log(`Clicked at ${lat}, ${lng}`)
  // }

  render() {
    // const position = [this.state.lat, this.state.lng]
    return (
      <Map style={map} center={[this.state.lat, this.state.lng]} zoom={this.state.zoom} onClick={this.addMarker}>
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {this.state.markers.map((position, idx) =>
          <Marker key={`marker-${idx}`} position={position}>
          {/* <Popup>
            <span>A pretty CSS3 popup. <br/> Easily customizable.</span>
          </Popup> */}
        </Marker>
        )}
      </Map>
    )
  }
}

export default LeafletMap