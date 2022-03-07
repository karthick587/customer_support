import React from 'react';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

export default function Copyrights(props){
  
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'Copyright © '}
        <Link className='copyright-text' color="inherit" href="https://www.mindmade.in/">
        MindMade
        </Link>{' '}
        {new Date().getFullYear()}
       
      </Typography>
    )
}