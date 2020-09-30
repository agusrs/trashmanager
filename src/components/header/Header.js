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
    appBar: {
      backgroundColor: '#004209'
    }
  }));

export default function Header() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="static" className={classes.appBar}>
                <Toolbar>
                    <Grid container direction="row" justify="flex-start" spacing={6}>
                        <Grid item>
                            <Typography variant="h5" className={classes.title}>
                                <Link to='/' className='link'>
                                    TALLENO
                                </Link>
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant="h6">
                                <Link to='/monitoreo' className='link'>
                                    Monitoreo
                                </Link>
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant="h6">
                                <Link to='/recoleccion' className='link'>
                                    Recolección
                                </Link>
                            </Typography>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
        </div>
    )

}