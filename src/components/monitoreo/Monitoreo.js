import React from 'react'
import { Grid } from '@material-ui/core';
import MonitorGrid from '../grid/Grid';
export default class Monitoreo extends React.Component {
    render() {
        return (
            <div>
                <Grid container direction="row" justify="space-between">
                    <Grid item xs={7}>
                        Mapa
                    </Grid>
                    <Grid item xs={4}>
                        <MonitorGrid/>
                    </Grid>
                </Grid>
            </div>
        )
    }
}