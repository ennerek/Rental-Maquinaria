

import React, { useEffect, useState } from 'react'
import {FormControl , InputLabel, Input, FormHelperText ,Typography, Button, TextField} from '@mui/material';
import Box from '@mui/material/Box';
import { verifyAccount } from '../../Services/auth';
import { useParams } from 'react-router-dom';

export const VerifyAccount = () => {

  const { userId } = useParams();
  const [code, setCode] = useState(0);


  const handleSubmit = async (e) => {
    e.preventDefault();
    await verifyAccount(userId, code).then(res => {
      console.log(res)
      window.location.href = '/login';
    }
    ).catch(err => {
      console.log(err)
    }
    )
  }

  return (
    <>
    
    <Box sx={{
            marginTop: 35,
            marginLeft: 'auto',
            marginRight: 'auto',
            padding: '150px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            background: 'paper',
            width: '50%',
            boxShadow: '0px 0px 10px #000',
        }} onSubmit={handleSubmit} noValidate>
        <Typography variant="h6" color="text.secondary" align="center" marginBottom={5} >
            {'Por favor ingresa tu codigo de verificación'}
    </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate >
          <TextField
              margin="normal"
              required
              fullWidth
              id="code"
              label="code"
              name="code"
              autoComplete="code"
              autoFocus
              onChange={(e) => setCode(e.target.value)}
          />
        <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
                
              Verificar
            </Button>

        </Box>
        


    </Box>
    </>
  )

}
