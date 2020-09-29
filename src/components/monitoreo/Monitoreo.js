import React from 'react'
import { Grid, Button } from '@material-ui/core';
import MonitorGrid from '../grid/Grid';
import AlertDialog from '../dialog/AlertDialog';
import CustomMap from '../map/Mapa';
import './Monitoreo.css'

export default class Monitoreo extends React.Component {
    constructor(props){
        super(props)

        this.id = 1
        this.data = [
            {
                lat: "x",
                long: "y",
                calle_nombre: 'Av Callao',
                calle_altura: '7523'
            },
            {
                lat: "x",
                long: "y",
                calle_nombre: 'Corrientes',
                calle_altura: '2000'
            },
            {
                lat: "x",
                long: "y",
                calle_nombre: 'Santa fe',
                calle_altura: '1800'
            },
            {
                lat: "x",
                long: "y",
                calle_nombre: 'Carlos Pellegrini',
                calle_altura: '900'
            },
            {
                lat: "x",
                long: "y",
                calle_nombre: 'Mitre',
                calle_altura: '3020'
            },
            {
                lat: "x",
                long: "y",
                calle_nombre: 'Pueyrredon',
                calle_altura: '4300'
            },
            {
                lat: "x",
                long: "y",
                calle_nombre: 'Rio negro',
                calle_altura: '1460'
            },
            {
                lat: "x",
                long: "y",
                calle_nombre: 'Tucuman',
                calle_altura: '2300'
            },
            {
                lat: "x",
                long: "y",
                calle_nombre: 'Rosales',
                calle_altura: '300'
            }
        ]

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
        this.updateProps = this.updateProps.bind(this) 
        this.getContainers = this.getContainers.bind(this)
        this.handleClose = this.handleClose.bind(this)
        this.convertData = this.convertData.bind(this)
    }

    componentDidMount() {
        this.convertData(this.data)
        this.interval = setInterval(() => this.convertData(this.data), 10000);
    }

    componentWillUnmount() {
        clearInterval(this.interval)
    }

    convertData(data) {
        this.setState({
            overloaded: []
        })
        let rowTemplate = []
        data.map(d => {
            rowTemplate.push({
                id: this.id,
                address: d.calle_nombre + ' ' + d.calle_altura,
                garbageLevel: Math.floor(Math.random() * 100) + 1 + '%'
            })
            this.id++
        })
        this.setState({
            rows: rowTemplate
        })
        this.getContainers(rowTemplate)
    }
    
    updateProps() {
        this.setState({
            rows: [
                { id: 1, address: 'Av Callao 7523', garbageLevel: '35%' },
                { id: 2, address: 'Corrientes 2000 ', garbageLevel: '42%' },
            ]
        })
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
                <Grid container direction="row" justify="space-between">
                    <Grid item xs={7}>
                        <br/>
                        <CustomMap className="mapa" />
                    </Grid>
                    <Grid item xs={5}>
                        <div style={{width: '81%', float: 'right'}}>
                            <MonitorGrid rows={this.state.rows} columns={this.state.columns} />
                        </div>
                    </Grid>
                </Grid>
                <Button size="medium" variant='contained'
                    onClick={this.updateProps}>
                    Actualizar grilla
                </Button>
                <Button size="medium" variant='contained'
                    onClick={() => this.getContainers(this.state.rows)}>
                    Detectar contenedores
                </Button>
                {this.state.containerOverload && <AlertDialog open={this.state.containerOverload} handleClose={this.handleClose} containers={this.state.overloaded} />}
            </div>
        )
    }
}