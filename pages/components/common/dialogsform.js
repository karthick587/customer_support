import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { DialogActions } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
export default function FormDialog(props) {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };


  return (
    <div className={props.dialog_className}>
      <Button className={props.className} variant="outlined" onClick={handleClickOpen}>
        {props.dialogtitle}
      </Button>
      <Dialog open={open}>
        <div className='row'>
          <div className='col close-btn-div'><Button className='close-btn' onClick={handleClose}><CloseIcon /></Button></div>
        </div>
        <div className='col'>{props.headtitle}</div>
        <DialogContent>
          {props.dialogbody}
        </DialogContent>
        <DialogActions>
          {props.dialogactions}
        </DialogActions>
      </Dialog>
    </div>
  );
}