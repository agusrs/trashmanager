import React from 'react'
import { AppBar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Grid } from '@material-ui/core';
import { Link } from 'react-router-dom';
import './Header.css'

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    title: {
      flexGrow: 1,
      textAlign: 'left'
    },
  }));

export default function Header() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h5" className={classes.title}>
                        <Link to='/' className='link'>
                            NOMBRE/ICONO DEL PROYECTO
                        </Link>
                    </Typography>
                    <Grid container direction="row" justify="flex-start" spacing={6}>
                        <Grid item>
                                <Typography variant="h6">
                                    <Link to='/firstPage' className='link'>
                                        Primer página
                                    </Link>
                                </Typography>
                        </Grid>
                        <Grid item>
                                <Typography variant="h6">
                                    <Link to='/secondpage' className='link'>
                                        Segunda página
                                    </Link>
                                </Typography>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
        </div>
    )

}