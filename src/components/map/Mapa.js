import React, { Component } from 'react'
import { Button } from '@material-ui/core';
import { Map, TileLayer, Marker, Polyline, Popup, GeoJSON } from 'react-leaflet'
import { Grid } from '@material-ui/core'
import MarkerClusterGroup from "react-leaflet-markercluster";
import L from 'leaflet'
import 'leaflet-fullscreen/dist/leaflet.fullscreen.css';
import 'leaflet-fullscreen/dist/Leaflet.fullscreen';
import './Mapa.css'
import DeleteIcon from '../../utils/baseline_delete_black_18dp.png';

const icon = new L.Icon({
  iconUrl: DeleteIcon,
  iconSize: [30, 30],
  iconAnchor: [20, 40],
  popupAnchor: L.Icon.Default.prototype.options.popupAnchor,
  tooltipAnchor: L.Icon.Default.prototype.options.tooltipAnchor,
  // shadowUrl: L.Icon.Default.prototype.options.shadowUrl,
  // shadowRetinaUrl: L.Icon.Default.prototype.options.shadowRetinaUrl,
  // shadowSize: L.Icon.Default.prototype.options.shadowSize,
  // shadowAnchor: L.Icon.Default.prototype.options.shadowAnchor,
  className: L.Icon.Default.prototype.options.className
})

const tailUrl = "https://{s}.tile.osm.org/{z}/{x}/{y}.png";

class CustomMap extends Component {
  constructor(props) {

    super(props)

    this.state = {
      
    }
  }

  componentDidMount() {
    this.props.onRef(this)

    this.map.leafletElement.addControl(new window.L.Control.Fullscreen())
  }

  componentDidUpdate({ prevProps, prevState }) {
    
  }

  drawMarkers() {
    return this.props.markers.map(m => 
      <Marker position={[m.lat,m.long]} icon={icon} onclick={this.props.onMarkerClick} id={m.id} >
        <Popup>ID: {m.id}<br/>Dirección: {m.address}<br/>Capacidad: {m.garbageLevel}</Popup>
      </Marker>
    )
  }

  render() {

    return (
      <div id={this.props.id}>
            <Map ref={(ref) =>  {this.map = ref; }} center={this.props.markers.length > 0 ? {lat:this.props.markers[193]?.lat, lng: this.props.markers[193]?.long} : {lat:-39.130060242135094, lng: -66.1809052440923}} zoom={12} className={this.props.className}>
              <TileLayer url={tailUrl} />

              {this.props.enableClusters && 
                <MarkerClusterGroup>
                  {!this.props.hidePins &&
                    this.drawMarkers()
                  }
                </MarkerClusterGroup>
              }
            </Map>
      </div>
    )
  }
}

export default CustomMap;