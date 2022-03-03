import React,{ useEffect, useContext } from 'react';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';
import { CounterContext } from '../contex/adminProvider';

export default function FormAlert() {

    const { testing, setTesting, showvalue } = useContext(CounterContext);

    //set time for alert messages
    useEffect(() => {
        if (testing === true) {
            const Timer = setTimeout(() => {
                setTesting(false);
            }, [4000]);
            return () => {
                clearTimeout(Timer);
            }
        }
    },[testing]);
    return (
        <>
            {showvalue.slice(0, 1) === "1" ?
                <div className='form-alert'>
                    <Box sx={{ width: '100%' }}>
                        <Collapse in={testing}>
                            <Alert severity="error"
                                action={
                                    <IconButton
                                        aria-label="close"
                                        color="inherit"
                                        size="small"
                                        onClick={() => setTesting(false)}
                                    >
                                        <CloseIcon fontSize="inherit" />
                                    </IconButton>
                                }
                                sx={{ mb: 2 }}
                            >
                                {showvalue.slice(1, 100)}
                            </Alert>
                        </Collapse>
                    </Box>
                </div> :
                <div className='form-alert'>
                    <Box sx={{ width: '100%' }}>
                        <Collapse in={testing}>
                            <Alert
                                action={
                                    <IconButton
                                        aria-label="close"
                                        color="inherit"
                                        size="small"
                                        onClick={() => setTesting(false)}
                                    >
                                        <CloseIcon fontSize="inherit" />
                                    </IconButton>
                                }
                                sx={{ mb: 2 }}
                            >
                                {showvalue}
                            </Alert>
                        </Collapse>
                    </Box>
                </div>
            }
        </>
    );
};