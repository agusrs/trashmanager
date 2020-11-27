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
import 'leaflet.polyline.snakeanim/L.Polyline.SnakeAnim.js'

const tailUrl = "https://{s}.tile.osm.org/{z}/{x}/{y}.png";
class CustomMap extends Component {
  constructor(props) {

    super(props)

    this.state = {
      
    }
    this.auxLines = []
    this.drawPolyLine = this.drawPolyLine.bind(this)
    this.drawRoute = this.drawRoute.bind(this)
  }

  componentDidMount() {
    this.props.onRef(this)

    this.map.leafletElement.addControl(new window.L.Control.Fullscreen())
    this.drawPolyLine(this.auxLines)
  }

  componentDidUpdate({ prevProps, prevState }) {
    
  }

  createIcon(garbageLevel) {
    let className
    if ( garbageLevel >= 75 ) {
      className = "redMarker"
    } else if ( garbageLevel >= 50 ) {
        className = "yellowMarker"
    } else if ( garbageLevel == null ) {
        return 
    } else {
        className = "greenMarker"
    }
    return new L.Icon({
      iconUrl: DeleteIcon,
      iconSize: [30, 30],
      iconAnchor: [20, 40],
      popupAnchor: L.Icon.Default.prototype.options.popupAnchor,
      tooltipAnchor: L.Icon.Default.prototype.options.tooltipAnchor,
      // shadowUrl: L.Icon.Default.prototype.options.shadowUrl,
      // shadowRetinaUrl: L.Icon.Default.prototype.options.shadowRetinaUrl,
      // shadowSize: L.Icon.Default.prototype.options.shadowSize,
      // shadowAnchor: L.Icon.Default.prototype.options.shadowAnchor,
      className: L.Icon.Default.prototype.options.className + " " + className
    })
  }

  drawMarkers() {
    return this.props.markers.map(m => 
      <Marker position={[m.lat,m.long]} icon={this.createIcon(parseInt(m.garbageLevel))} onclick={this.props.onMarkerClick} id={m.id} >
        <Popup>ID: {m.id}<br/>Dirección: {m.address}<br/>Capacidad: {m.garbageLevel}</Popup>
      </Marker>
    )
  }

  drawRoute() {
    let containers = []
    let auxStaticLines = []
    if (this.props.streetRoute && this.props.streetRoute.length > 0 ) {
      containers = this.props.streetRoute
      
    } else {
      containers = this.props.markers
    }
    if (!containers )
        return
    if (this.props.route){
      for (let i = 0; i < containers.length - 1; i++) {

        if (!containers)
          continue;

        if (!containers[i])
          continue;
        

        const positionFrom = [containers[i]?.lat, containers[i]?.long]
        const positionTo = [containers[i + 1]?.lat, containers[i + 1]?.long]

        const polyline = L.polyline([positionFrom, positionTo], {color:"#004209"})
        const staticPolyline = <Polyline key={"line-" + i} positions={[positionFrom, positionTo]} color={"#8a8a8a"}></Polyline>;
        
        this.auxLines.push(polyline);
        auxStaticLines.push(staticPolyline)
      }
    }
    return auxStaticLines
  }

  drawPolyLine(polylines) {
    var route = L.layerGroup(polylines, { snakingPause: 0 });
      this.map.leafletElement.addLayer(route);
      route.snakeIn();
      route.on("snakeend",(p) => {
 
        p.target.remove()
        // p.target.addTo(this.map.leafletElement)
        this.drawPolyLine(polylines)
      })
      // route.on("snake", (args) => {
      //   var layers = Object.values(args.target._layers)
      //   var last = layers[layers.length - 1]
      //   if( this.toggleWatch)
      //     this.map.leafletElement.panInsideBounds(last._bounds, {duration: 1})
      // })
  }

  render() {

    return (
      <div id={this.props.id}>
            <Map ref={(ref) =>  {this.map = ref; }} center={this.props.markers.length > 0 ? (this.props.className == "mapaMonitoreo" ? {lat:this.props.markers[193]?.lat, lng: this.props.markers[193]?.long} : {lat:this.props.markers[0]?.lat, lng: this.props.markers[0]?.long}) : {lat:-39.130060242135094, lng: -66.1809052440923}} zoom={12} className={this.props.className}>
              <TileLayer url={tailUrl} />
              {this.props.enableClusters && 
                <MarkerClusterGroup>
                  {!this.props.hidePins &&
                    this.drawMarkers()
                  }
                </MarkerClusterGroup>
              }
              {this.props.route && 
                this.drawRoute()
              }
            </Map>
      </div>
    )
  }
}

export default CustomMap;