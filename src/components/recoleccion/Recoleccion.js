import React from 'react'
import TruckSelect from '../select/TruckSelect';
import { Grid, Button, Typography } from '@material-ui/core';
import CustomMap from '../map/Mapa';
import './Recoleccion.css'
import CustomSnackbar from '../snackbar/Snackbar';
import RouteList from '../routeList/RouteList';

export default class Recoleccion extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            selectedTruck: null,
            initialPage: true,
            showSnackbar: false,
            snackbarTimer: 6000,
            snackbarType: "",
            snackbarMessage: "",
            route: [],
        }
        
        this.data = [
            {
                id: 0,
                name: "Marcelo Aguero"
            },
            {
                id: 1,
                name: "Jorge Gonzalez"
            },
            {
                id: 2,
                name: "Tomas Piñeda"
            },
            {
                id: 3,
                name: "Ruben Costa"
            },
            {
                id: 4,
                name: "Ivan Malandro"
            },
        ]

        this.changeTruck = this.changeTruck.bind(this)
        this.generateRoute = this.generateRoute.bind(this)
        this.renderInitialItems = this.renderInitialItems.bind(this)
        this.openSnackbar = this.openSnackbar.bind(this)
        this.closeSnackbar = this.closeSnackbar.bind(this)
    }

    componentDidMount() {
        if (!this.props.data) {
            this.openSnackbar('warning', 'Ingrese a la sección de monitoreo primero, para obtener los datos de los contenedores.', 6000)
        }
    }

    openSnackbar ( type, message, time ) {
        this.setState( ( prevState ) => ( {
            ...prevState,
            showSnackbar: true,
            snackbarType: type,
            snackbarMessage: message,
            snackbarTimer: time !== undefined ? time : 5000
        } ) )
    }

    closeSnackbar () {
        this.setState( ( prevState ) => ( {
            ...prevState,
            showSnackbar: false
        } ) )
    }

    changeTruck(truck) {
        this.setState({
            selectedTruck: truck
        })
    }

    generateRoute() {
        let orderedRoute = []
        let data = this.props.data
        if (this.props?.data?.length === 0 || !this.props.data) {
            this.openSnackbar('error', 'No hay datos de los contenedores!', 6000)
        } else {
            var totalGarbage = 0
            data.map(c => {
                if (parseInt(c.garbageLevel) > 74 && (totalGarbage + parseInt(c.garbageLevel)) < 1000){
                    orderedRoute.push(c)
                    c.isCollected = true
                    totalGarbage = totalGarbage + parseInt(c.garbageLevel)
                }
            })
            data.map(c => {
                if (parseInt(c.garbageLevel) > 49 && parseInt(c.garbageLevel) < 75  && (totalGarbage + parseInt(c.garbageLevel)) < 1000) {
                    orderedRoute.push(c)
                    c.isCollected = true
                    totalGarbage = totalGarbage + parseInt(c.garbageLevel)
                }
            })
            orderedRoute.sort(this.compare)
            this.props.dataUpdater(data)
            this.setState({
                route: orderedRoute
            })
            if (this.state.initialPage) {
                document.getElementById("initialItems").classList.toggle('fade');
                setTimeout(() => {
                    this.setState({
                        initialPage: false
                    })
                    document.getElementById("initialItems").classList.toggle('fade');
                }, 1000)
            }
        }
    }

    compare( a, b ) {
        if ( parseInt(a.garbageLevel) > parseInt(b.garbageLevel) ){
            return -1;
        }
        if ( parseInt(a.garbageLevel) < parseInt(b.garbageLevel) ){
            return 1;
        }
        return 0;
    }

    renderInitialItems(sizeInput, sizeButton){
        return (
            <div>
                <Grid container direction="row" spacing={0} alignItems={"center"}>
                    <Grid item xs={sizeInput} >
                        <TruckSelect selected={this.state.selectedTruck} data={this.data} onChange={(truck) => this.changeTruck(truck)} />
                    </Grid>
                    <Grid item xs={sizeButton} >
                        <Button size="medium" variant='contained' disabled={!this.state.selectedTruck}
                            onClick={this.generateRoute}>
                            Generar ruta
                        </Button>
                    </Grid>
                </Grid>
            </div>
        )
    }

    render() {
        return (
            <div id="initialItems">
                {this.state.initialPage && 
                    this.renderInitialItems(3,2)
                }
                {!this.state.initialPage &&
                    <div>
                        <Grid container direction="row" justify="space-between">
                            <Grid item xs={7}>
                                <CustomMap className="mapaRecoleccion" />
                            </Grid>
                            <Grid item xs={5}>
                                {this.renderInitialItems(6,3)}
                                <div>
                                    <Typography variant="h6">
                                        Ruta
                                    </Typography>
                                    <RouteList containers={this.state.route} />
                                </div>
                            </Grid>
                        </Grid>   
                    </div>
                }
                <CustomSnackbar open={this.state.showSnackbar} handleClose={this.closeSnackbar} timer={this.state.snackbarTimer} type={this.state.snackbarType} message={this.state.snackbarMessage} />
            </div>
        )
    }
}