import React from 'react';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
export default function Copyrights(props){
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'Copyright © '}
        <Link color="inherit" href="https://mui.com/">
        mindmade
        </Link>{' '}
        {new Date().getFullYear()}
       
      </Typography>
    )
}