import './RouteList.css'
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    
  },
  title: {
    fontSize: 14,
  },
  pos: {
    
  },
  container: {
    maxHeight: '61vh',
    overflow: 'auto'
  }
});

export default function RouteList(props) {
  const classes = useStyles();

  return (
    <div className={classes.container}>
        {props.containers.map((c, i) => 
        <Card className={classes.root} variant="outlined">
        <CardContent>
            <Typography className={classes.title} color="textSecondary">
            ID: {c.id}
            </Typography>
            <Typography className={classes.pos} color="textSecondary">
            Dirección: {c.address}
            </Typography>
            <Typography className={classes.pos} color="textSecondary">
            Capacidad: {c.garbageLevel}
            </Typography>
        </CardContent>
        <CardActions>
            
        </CardActions>
        </Card>
        )}
    </div>
  );
}