import React, { useEffect, useState } from 'react'
import { MachineryList } from '../../Components/MachineryList'
import { getMachineries } from '../../Services/machineries'
import { getUser } from '../../Services/users'


import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

import Checkbox from "@mui/material/Checkbox";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import BottomNavigationAction from "@mui/material/BottomNavigationAction";

import LocationOnIcon from "@mui/icons-material/LocationOn";


export const UserMachineries = () => {
    const [machineries, setMachineries] = useState([]);

    useEffect(() => {

        getUser(localStorage.getItem('token')).then( (res) => {
            getMachineries().then( data => {
                setMachineries(data.machineries.filter( machinery => machinery?.user === res.userDB._id));
            }).catch( err => {
                console.log(err)
            } )
        })
    } , [machineries])

  return (
    <>
        <MachineryList machineries={machineries}/>
    </>
  )
}
