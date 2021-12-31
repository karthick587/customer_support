import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import {DialogActions} from '@mui/material';

export default function FormDialog(props) {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <Button className={props.className} variant="outlined" onClick={handleClickOpen}>
        {props.dialogtitle}
      </Button>
      <Dialog open={open} onClose={handleClose}>
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