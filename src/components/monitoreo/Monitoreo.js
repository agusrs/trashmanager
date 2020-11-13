import React from 'react'
import { Grid, Button, Typography } from '@material-ui/core';
import MonitorGrid from '../grid/Grid';
import AlertDialog from '../dialog/AlertDialog';
import CustomMap from '../map/Mapa';
import './Monitoreo.css'
import {dataContainers} from '../../utils/dataContainers'

export default class Monitoreo extends React.Component {
    constructor(props){
        super(props)

        this.sortModel = [
            {
              field: 'garbageLevel',
              sort: 'desc',
            },
          ];

        this.id = 1

        this.state = {
            containerOverload: false,
            overloaded: [],
            columns: [
                { field: 'id', headerName: 'ID', width: 70, headerAlign: 'center' },
                { field: 'address', headerName: 'Dirección', width: 250, headerAlign: 'center' },
                {
                    field: 'garbageLevel',
                    headerName: 'Capacidad (%)',
                    width: 130,
                    headerAlign: 'center',
                    type: 'number',
                    cellClassName: (params) => {
                        if ( parseInt(params.value) >= 75 ) {
                            return "redCapacity"
                        } else if ( parseInt(params.value) >= 50 ) {
                            return "yellowCapacity"
                        } else if ( params.value == null ) {
                            return 
                        } else {
                            return "greenCapacity"
                        }
                        },
                    sortComparator: (v1, v2, row1, row2) => parseInt(row1.data.garbageLevel) - parseInt(row2.data.garbageLevel),
                },
            ],
            rows: [],
        }
        this.getContainers = this.getContainers.bind(this)
        this.handleClose = this.handleClose.bind(this)
        this.convertData = this.convertData.bind(this)
        this.markerClick = this.markerClick.bind(this)
        this.rowClick = this.rowClick.bind(this)
    }

    componentDidMount() {
        this.convertData(dataContainers)
        this.interval = setInterval(() => this.convertData(dataContainers), 90000);
    }

    componentWillUnmount() {
        clearInterval(this.interval)
    }

    markerClick(args){
        console.log(args)
    }

    rowClick(args) {
        if(this.map.map.leafletElement)
            this.map.map.leafletElement.flyTo([args.data.lat, args.data.long], 17, { duration: 0.50 })
    }

    convertData(data) {
        this.setState({
            overloaded: []
        })
        let rowTemplate = []
        if (!this.props.data) {
            data.map(d => {
                rowTemplate.push({
                    id: this.id,
                    address: d.calle_nombre + ' ' + d.calle_altura,
                    garbageLevel: Math.floor(Math.random() * 100) + 1 + '%',
                    isCollected: false,
                    long: d.long,
                    lat: d.lat
                })
                this.id++
            })
            this.id = 1
        } else {
            this.props.data.map(d => {
                rowTemplate.push({
                    id: d.id,
                    address: d.address,
                    garbageLevel: Math.floor(Math.random() * 100) + 1 + '%',
                    isCollected: d.isCollected,
                    long: d.long,
                    lat: d.lat
                })
            })
        }
        this.props.dataUpdater(rowTemplate)
        this.setState({
            rows: rowTemplate
        })
        this.getContainers(rowTemplate)
    }

    getContainers(rows) {
        let containers = []
        rows.map(r => {
            if (parseInt(r.garbageLevel) >= 75)
                containers.push(r)
        })
        if (containers.length > 0) {
            this.setState({
                containerOverload: true,
                overloaded: containers
            })
        }
    }

    handleClose() {
        this.setState({
            containerOverload: false
        })
    };

    render() {
        return (
            <div>
                <div className="gridTitle">
                    <Typography variant="h6">
                        Contenedores
                    </Typography>
                </div>
                <Grid container direction="row" justify="space-between">
                    <Grid item xs={7}>
                        <CustomMap id="mapDivMonitoreo" onRef={ref => (this.map = ref)} className="mapaMonitoreo" markers={this.state.rows} enableClusters={true} hidePins={false} 
                        onMarkerClick={this.markerClick} />
                    </Grid>
                    <Grid item xs={5}>
                        <div style={{width: '81%', float: 'right'}}>
                            <MonitorGrid rowClick={this.rowClick} onRef={ref => (this.gridInstance = ref)} rows={this.state.rows} columns={this.state.columns} sortModel={this.sortModel}/>
                        </div>
                    </Grid>
                </Grid>
                <Button size="medium" variant='contained'
                    onClick={() => clearInterval(this.interval)}>
                    Parar get de datos
                </Button>
                {this.state.containerOverload && <AlertDialog open={this.state.containerOverload} handleClose={this.handleClose} containers={this.state.overloaded} />}
            </div>
        )
    }
}