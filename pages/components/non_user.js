import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Avatar from '@mui/material/Avatar';
export default function ScrollDialog() {
    const [open, setOpen] = React.useState(false);
    const [scroll, setScroll] = React.useState('paper');

    const handleClickOpen = (scrollType) => () => {
        setOpen(true);
        setScroll(scrollType);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const descriptionElementRef = React.useRef(null);
    React.useEffect(() => {
        if (open) {
            const { current: descriptionElement } = descriptionElementRef;
            if (descriptionElement !== null) {
                descriptionElement.focus();
            }
        }
    }, [open]);

    return (
        <div>
            <Button onClick={handleClickOpen('paper')}>scroll=paper</Button>
            <Dialog
                open={open}

                scroll={scroll}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
            >
                <DialogTitle id="scroll-dialog-title"><div className='form-title'>Non User Ticket Form</div></DialogTitle>
                <DialogContent dividers={scroll === 'paper'}>
                    <DialogContentText
                        id="scroll-dialog-description"
                        ref={descriptionElementRef}
                        tabIndex={-1}
                    >
                        <div className="addform">
                            <form>
                                <div className="form-group upload">
                                    <label htmlFor="contained-button-file">
                                        <input accept="image/*" id="contained-button-file" className="upload-input-button" multiple type="file" />
                                        <p className="text-danger mt-3 ml-2"></p>
                                        <Avatar
                                            alt="uploadlogo"

                                            sx={{ width: 65, height: 65 }}
                                        />
                                        <Button size="small" variant="contained" component="span">
                                            Upload
                                        </Button>
                                    </label>
                                </div>
                                <div className="form-group">
                                    <label className="label">Company Name</label>
                                    <input className="issue-form-input" name="Companyname" type="text" />
                                    <p className="me-2 text-danger"></p>
                                </div>
                                <div className="form-group">
                                    <label className="label"> Client Name</label>
                                    <input className="issue-form-input" name="Clientname" type="text" />
                                    <p className="me-2 text-danger"></p>
                                </div>
                                {/* <div className="form-group">
                            <label className="label"> Project Code</label>
                            <input className="form-input" name="Projectcode" type="text" {...register('Projectcode')} />
                            <p className="me-2 text-danger">{errors.Projectcode?.message}</p>
                        </div> */}
                                <div className="form-group">
                                    <label className="col label">EMail ID</label>
                                    <input className="issue-form-input" name="Email" type="text" />
                                    <p className="me-2 text-danger"></p>
                                </div>
                                <div className="form-group">
                                    <label className="col label">Phone Number</label>
                                    <input className="issue-form-input" name="Phonenumber" type="text" />
                                    <p className="me-2 text-danger"></p>
                                </div>
                                <div className="form-group">
                                    <label className="label">Username</label>
                                    <input className="issue-form-input" name="Username" type="text" />
                                    <p className="me-2 text-danger"></p>
                                </div>

                                <div className="form-group">
                                    <label className="label">Description</label>
                                    <textarea className="issue-form-input" name="description" rows="4" cols="50" maxLength="200" />
                                </div>
                            </form>
                            <h4 className="alert1 text-center"></h4>
                        </div>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleClose}>Submit</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}