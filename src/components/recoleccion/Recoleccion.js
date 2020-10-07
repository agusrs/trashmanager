import React from 'react'
import TruckSelect from '../select/TruckSelect';
import { Grid, Button, Typography } from '@material-ui/core';
import CustomMap from '../map/Mapa';
import './Recoleccion.css'

export default class Recoleccion extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            selectedTruck: null,
            initialPage: true,
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
        this.renderInitialItems = this.renderInitialItems.bind(this )
    }

    componentDidMount() {
        
    }

    changeTruck(truck) {
        this.setState({
            selectedTruck: truck
        })
    }

    generateRoute() {
        if (this.state.initialPage) {
            document.getElementById("initialItems").classList.toggle('fade');
            setTimeout(() => {
                this.setState({
                    initialPage: false
                })
                document.getElementById("initialItems").classList.toggle('fade');
            }, 1000)
        } else {

        }
    }

    renderInitialItems(sizeInput, sizeButton){
        return (
            <div>
                <Grid container direction="row" spacing={0} alignItems={"center"}>
                    <Grid item xs={sizeInput} >
                        <TruckSelect selected={this.state.selectedTruck} data={this.data} onChange={(truck) => this.changeTruck(truck)} />
                    </Grid>
                    <Grid item xs={sizeButton} >
                        <Button size="medium" variant='contained'
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
                            </Grid>
                        </Grid>   
                    </div>
                }
            </div>
        )
    }
}