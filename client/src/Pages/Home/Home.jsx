import React, { useEffect, useState } from 'react'
import { MachineryList } from '../../Components/MachineryList'
import { styled, alpha } from '@mui/material/styles';
import { FormControl, Input } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { SearchMachineries } from '../../Components/SearchMachineries';
import { getMachineries, getMachinery } from '../../Services/machineries';
import Machinery from '../../Components/Machinery';
import { useGetMachineries } from '../../hooks/useGetMachineries';



export const Home = () => {

  const [machineries, setMachineries] = React.useState([]);

  useEffect(() => {
    getMachineries().then(data => {
      setMachineries(data.machineries);
    }).catch(err => {
      console.log(err);
    })
  } , [])

  

  
  return (
    <div>
        
        <MachineryList machineries={machineries}/>
    </div>
  )
}
