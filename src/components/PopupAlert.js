import React from 'react';

import { 
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from '@material-ui/core';

export default function PopupAlert( props ) {
  return (
    <div>
      <Dialog
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Sikeres regisztráció!"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Egy e-mailt küldtünk a megadott címre. Kérjük visszaigazolni a regisztrációt
            a benne található linken keresztül!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleClose} color="primary" autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}