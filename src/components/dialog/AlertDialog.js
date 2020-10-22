import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import DeleteIcon from '@material-ui/icons/Delete';
import { Grid, Typography } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import './AlertDialog.css'

export default function AlertDialog(props) {
  const [open, setOpen] = React.useState(props.open);

  const renderContainers = () => {
    let stop = false
    return props.containers.map((c, i) => 
    {
      if (i < 7){
        return <>
          <ListItem>
            <ListItemIcon>
              <DeleteIcon />
            </ListItemIcon>
            <ListItemText
              primary={c.id}
            />
            <ListItemSecondaryAction>
              {c.garbageLevel}
            </ListItemSecondaryAction>
          </ListItem>
        </>
      } else if (!stop){
        stop = true
        return <>
          <ListItem>
            <ListItemText
              primary={'y ' + (props.containers.length - i) + ' contenedores más'}
            />
          </ListItem>
        </>
      } 
    })
  }

  return (
    <div>
      <Dialog
        open={open}
        onClose={props.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Tiene {props.containers.length} {props.containers.length == 1 ? 'contenedor' : 'contenedores'} con más del 75% de capacidad <br/>Puede verlos en la grilla</DialogTitle>
        <DialogContent className="containersDialogRoot">
          <DialogContentText id="alert-dialog-description">
            <Grid container direction="row" justify="space-between">
                <Grid item>
                    <Typography variant="h6">
                        ID
                    </Typography>
                </Grid>
                <Grid item>
                    <Typography variant="h6">
                        Capacidad
                    </Typography>
                </Grid>
            </Grid>
            <Divider />
            <div>
                <List>
                  {renderContainers()}
                </List>
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleClose} color="primary" autoFocus>
            Entendido
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}