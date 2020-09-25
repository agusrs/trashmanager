import React from 'react'
import { Grid, Button } from '@material-ui/core';
import MonitorGrid from '../grid/Grid';
import AlertDialog from '../dialog/AlertDialog';
export default class Monitoreo extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            containerOverload: false,
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
            rows: [
                { id: 1, address: 'Av Callao 7523', garbageLevel: '35%' },
                { id: 2, address: 'Corrientes 2000 ', garbageLevel: '42%' },
                { id: 3, address: 'Lannister', garbageLevel: '45%' },
                { id: 4, address: 'Stark', garbageLevel: '16%' },
                { id: 5, address: 'Targaryen', garbageLevel: null },
                { id: 6, address: 'Melisandre', garbageLevel: '150%' },
                { id: 7, address: 'Clifford', garbageLevel: '44%' },
                { id: 8, address: 'Frances', garbageLevel: '36%' },
                { id: 9, address: 'Roxie', garbageLevel: '65%' },
            ],
        }
        this.updateProps = this.updateProps.bind(this) 
        this.getContainers = this.getContainers.bind(this)
        this.handleClose = this.handleClose.bind(this)
    }
    
    updateProps() {
        this.setState({
            rows: [
                { id: 1, address: 'Av Callao 7523', garbageLevel: '35%' },
                { id: 2, address: 'Corrientes 2000 ', garbageLevel: '42%' },
            ]
        })
    }

    getContainers() {
        this.setState({
            containerOverload: true
        })
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
                        Mapa
                    </Grid>
                    <Grid item xs={4}>
                        <MonitorGrid rows={this.state.rows} columns={this.state.columns} />
                    </Grid>
                </Grid>
                <Button size="medium" variant='contained'
                    onClick={this.updateProps}>
                    Actualizar grilla
                </Button>
                <Button size="medium" variant='contained'
                    onClick={this.getContainers}>
                    Detectar contenedores
                </Button>
                {this.state.containerOverload && <AlertDialog open={this.state.containerOverload} handleClose={this.handleClose} />}
            </div>
        )
    }
}