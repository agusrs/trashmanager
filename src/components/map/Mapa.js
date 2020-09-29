import React, { Component } from 'react'
import { Button } from '@material-ui/core';
import { Map, TileLayer, Marker, Polyline, Popup, GeoJSON } from 'react-leaflet'
import { Grid } from '@material-ui/core'
import MarkerClusterGroup from "react-leaflet-markercluster";
import L from 'leaflet'
import 'leaflet-fullscreen/dist/leaflet.fullscreen.css';
import 'leaflet-fullscreen/dist/Leaflet.fullscreen';
import './Mapa.css'

const tailUrl = "https://{s}.tile.osm.org/{z}/{x}/{y}.png";

class CustomMap extends Component {
  constructor(props) {

    super(props)

    this.state = {
      
    }
  }

  componentDidMount() {
    //this.props.onRef(this)

    this.map.leafletElement.addControl(new window.L.Control.Fullscreen())
  }

  componentDidUpdate({ prevProps, prevState }) {
    
  }

  render() {

    return (
      <div id="mapDiv">
            <Map ref={(ref) =>  {this.map = ref; }} center={{lat:-39.130060242135094, lng: -66.1809052440923}} zoom={4} className="mapa" >
              <TileLayer url={tailUrl} />

              {/* {enableClusters && 
                <MarkerClusterGroup>
                  {!hidePins &&
                    this.markers
                  }
                </MarkerClusterGroup>
              } */}
            </Map>
      </div>
    )
  }
}

export default CustomMap;