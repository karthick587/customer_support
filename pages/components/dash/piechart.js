import { Pie } from 'react-chartjs-2';
import { Box, Card, CardContent, CardHeader, Divider, Typography, useTheme } from '@mui/material';
import { useContext } from 'react';
import { CounterContext } from '../contex/adminProvider';

export default function Piechart(props){
  const{adminNewcount,adminStartedcount,adminprogresscount,adminCompletedcount}=useContext(CounterContext)
  
  const theme = useTheme();

  const data = {
    datasets: [
      {
        data: [adminNewcount, adminStartedcount, adminprogresscount,adminCompletedcount],
        backgroundColor: ['#3F51B5', '#e53935', '#FB8C00','green'],
        borderWidth: 8,
        borderColor: '#FFFFFF',
        hoverBorderColor: '#FFFFFF'
      }
    ],
    labels: ['New', 'Started', 'InProgress','Completed']
  };

  const options = {
    animation: false,
   
    layout: { padding: 0 },
    legend: {
      display: true
    },
    maintainAspectRatio: false,
    responsive: true,
    tooltips: {
      backgroundColor: theme.palette.background.paper,
      bodyFontColor: theme.palette.text.secondary,
      borderColor: theme.palette.divider,
      borderWidth: 1,
      enabled: true,
      footerFontColor: theme.palette.text.secondary,
      intersect: false,
      mode: 'index',
      titleFontColor: theme.palette.text.primary
    }
  };

  return (
    <Card {...props}>
      <CardHeader title="TICKET STATUS" />
      <Divider />
      <CardContent>
        <Box
          sx={{
            height: 250,
            position: 'relative'
          }}
        >
          <Pie
            data={data}
            options={options}
          />
        </Box>
       
      </CardContent>
    </Card>
  );
};