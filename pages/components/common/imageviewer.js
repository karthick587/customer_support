import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { DialogActions } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
export default function Imageviewer(props) {
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    
    return (
        <div>
            <div variant="outlined" onClick={handleClickOpen}>
                {props.imgdialogbutton}
            </div>
            <Dialog className="Imageviewer-main-body" open={open}>
                <div className='row'>
                    <div className='col close-btn-div'><Button className='close-btn' onClick={handleClose}><CloseIcon /></Button></div>
                </div>

                <div>
                    {props.imgdialogbody}
                </div>
            </Dialog>
        </div>
    );
}