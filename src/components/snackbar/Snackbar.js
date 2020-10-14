import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import './Snackbar.css';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function CustomSnackbar(props) {
    const [open, setOpen] = React.useState(props.open);

    React.useEffect( () => {
        setOpen(props.open)
      }, [props.open] );
    
    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setOpen(false);
      props.handleClose()
    };
  
    return (
        <Snackbar open={open} autoHideDuration={props.timer} onClose={handleClose}>
          <Alert onClose={handleClose} severity={props.type}>
            {props.message}
          </Alert>
        </Snackbar>
    );
  }
