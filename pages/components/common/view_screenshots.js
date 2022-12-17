import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import CloseIcon from '@mui/icons-material/Close';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
export default function ViewScreenshots(props) {
    const { FileArray } = props
    const [open, setOpen] = useState(false);
    const [viewimg, setviewimg] = useState('')
    const [downloadlink, setdownloadlink] = useState('')
    const handleClickOpen = (screenshots) => {
        setOpen(true);
        setviewimg(screenshots)
        setdownloadlink(`https://mindmadetech.in/download/${screenshots.slice(38, 100)}`)
    };

    const handleClose = () => {
        setOpen(false);
    };
    const [newarray, setnewarray] = useState([]);
    const [mimetype, setMimetype] = useState('');
    useEffect(() => {
        var TeamList = [...newarray]
        if (FileArray !== undefined) {
            FileArray.map((product) => {
                TeamList.push(product.Filepath)
            })
            setnewarray(TeamList)
        }
        if (FileArray !== undefined) {
            FileArray.map((files) => {
                setMimetype(files.Filepath.slice(files.Filepath.length - 4));
            })
        }
    }, [newarray])
    return (
        <div className=''>
            <div className="flex">
                {newarray.map((screenshots) =>
                    <div key={screenshots}>
                        {mimetype === ".png" || mimetype === ".jpg" || mimetype === "jpeg" ?
                        <div  key={screenshots} className="me-2" variant="outlined" onClick={() => handleClickOpen(screenshots)}>
                            <img src={screenshots} width="70px" height="70px" />
                        </div> :
                            <a href={screenshots} target="_blank" rel="noreferrer noopener">View File</a>
                        }
                    </div>
                )}
            </div>
            <Dialog className="Imageviewer-main-body " open={open}>
                <div className='bg-dark'>
                    <div className='row'>
                        <div className='col close-btn-div'>
                            <Button className='close-btn' onClick={handleClose}><CloseIcon /></Button>
                            <Button className='download-btn' href={downloadlink}><FileDownloadIcon /></Button>
                        </div>
                    </div>
                    <div className="viewer-img-body">
                        <img className='Imageviewer-userimg2' src={viewimg} />
                        <div className="viewer-img-body-bottom">
                            <div className='viewer-img-body-bottom-img'>
                                <div className='flex'>
                                    {newarray.map((screenshots) =>
                                        <div key={screenshots} className="me-2" variant="outlined" onClick={() => handleClickOpen(screenshots)}>
                                                <img src={screenshots} width="70px" height="70px" /> 
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Dialog>
        </div>
    );
}