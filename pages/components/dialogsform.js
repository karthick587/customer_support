import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

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
        <Button className="button float-end mb-3 mt-"  variant="outlined" onClick={handleClickOpen}>
        {props.dialogtitle}
        </Button>
        <Dialog open={open} onClose={handleClose}>
            <DialogContent>
                {props.dialogbody}
            </DialogContent>
        </Dialog>
      </div>
  );
}