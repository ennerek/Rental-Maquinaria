
import React, { useEffect, useState } from 'react'
import Machinery from "./Machinery";
import { Grid } from '@mui/material';
import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';


import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export function MachineryList({machineries}) {
    

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="xl" sx={{
        marginTop: '100px'
      }}
      
      >

        <Grid container spacing={{ xs: 2, md: 3, lg: 3, xl:3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
            {
              machineries.map(machinery => (
                <Grid item xs={3} sm={4} md={4} key={machinery.id}>
                    <Machinery machinery={machinery} key={machinery.id}/>
                </Grid> 
              ))
            }     
        </Grid>
      </Container>
    </React.Fragment>
  );
}    
