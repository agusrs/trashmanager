import React from 'react'
import './Home.css'
import {Grid, Typography} from '@material-ui/core'
import monitoreoImg from "../../utils/monitoreo-01.jpg"
import recoleccionImg from "../../utils/recoleccion-01-01.jpg"

export default class Home extends React.Component {
    render() {
        return (
            <div>
                <Typography variant="h4">¡Bienvenido a TALLENO!</Typography>
                <p>Nam ut sapien vitae mauris dapibus finibus. Aliquam hendrerit libero ligula, ac auctor neque volutpat ac. Nunc facilisis venenatis felis. In rutrum semper velit non rhoncus. Morbi in aliquet ante. Donec faucibus mi vel lorem condimentum auctor non in magna. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nulla posuere lorem sit amet risus ullamcorper blandit. Nulla nunc mauris, elementum ac dui lobortis, vehicula auctor nisl. Integer in ipsum interdum, tincidunt sem non, luctus turpis. Cras eu mauris nisl. Duis luctus justo vel vestibulum molestie. In velit sem, tristique eget ipsum non, placerat euismod tellus.</p>
                <Grid container direction="row" >
                    <Grid item xs={6}>
                        <img src={monitoreoImg} width="300px" height="300px"/>
                        <p>Nulla posuere lorem sit amet risus ullamcorper blandit. Nulla nunc mauris, elementum ac dui lobortis, vehicula auctor nisl. Integer in ipsum interdum, tincidunt sem non, luctus turpis. </p>
                    </Grid>
                    <Grid item xs={6}>
                        <img src={recoleccionImg} width="300px" height="300px"/>
                        <p>Nulla posuere lorem sit amet risus ullamcorper blandit. Nulla nunc mauris, elementum ac dui lobortis, vehicula auctor nisl. Integer in ipsum interdum, tincidunt sem non, luctus turpis. </p>
                    </Grid>
                </Grid>
            </div>
        )
    }
}