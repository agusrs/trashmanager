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
            loadMap: false
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
        this.streetRoute = this.streetRoute.bind(this)
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
            }, this.streetRoute)
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
    streetRoute() {
        let auxAddresses = this.state.route
        let auxPositions = []
        let auxPositionsString = ""
        let streetRoute = []
        let routeTime = ""
        let routeDistance = ""
        auxAddresses.forEach(a => {
            auxPositions.push([a.long, a.lat])
        })
        auxPositionsString = auxPositions.join(';')
        if (auxAddresses.length > 1) {
            fetch("https://router.project-osrm.org/route/v1/driving/" + auxPositionsString + "?overview=simplified&geometries=geojson&steps=true")
                .then((res) => {
                    res.json().then((json) => {
                        json.routes[0].geometry.coordinates.forEach(c => {
                            streetRoute.push({ lat: c[1], long: c[0] })
                        })
                        routeTime = "Duración: " + (json.routes[0].duration / 60).toFixed(0) + " minutos"
                        routeDistance = "Recorrido: " + (json.routes[0].distance / 1000).toFixed(2) + " Km"
                        this.setState({
                            streetRoute: streetRoute,
                            routeTime: routeTime,
                            routeDistance: routeDistance,
                            loadMap: true
                        })
                    })
                        .catch((err) => {
                            this.setState({
                                streetRoute: [],
                                routeTime: "No disponible",
                                routeDistance: "No disponible",
                                openPopupRouteStreet: true,
                                loadMap: true
                            })
                        })
                })
                .catch((err) => {
                    this.setState({
                        streetRoute: [],
                        routeTime: "No disponible",
                        routeDistance: "No disponible",
                        openPopupRouteStreet: true,
                        loadMap: true
                    })

                })
        } else {
            this.setState({
                loadMap: true
            })
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
                                {this.state.loadMap && <CustomMap className="mapaRecoleccion" id="mapDivRecoleccion" onRef={ref => (this.map = ref)}  markers={this.state.route} enableClusters={true} hidePins={false} streetRoute={this.state.streetRoute} route={true} onMarkerClick={() => console.log("")} />}
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