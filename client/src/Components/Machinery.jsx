import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import TextField from '@mui/material/TextField';
import Typography from "@mui/material/Typography";
import KeepMountedModal from "./Modal";

import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

import Checkbox from "@mui/material/Checkbox";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import AddIcon from "@mui/icons-material/Add";
import { styled } from "@mui/material/styles";
import Alert from '@mui/material/Alert';

import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";

import LocationOnIcon from "@mui/icons-material/LocationOn";
import { rentalMachinery } from "../Services/rentalMachinery";
import { deleteMachinery } from "../Services/machineries";
import BasicDateRangePicker from "./DatePicker";

export default function Machinery({ machinery }) {

  const [open, setOpen] = React.useState(false);
  const [isDisabled, setIsDisabled] = React.useState(false);

  const [dateValue, setDateValue] = React.useState([null, null]);

  const token = localStorage.getItem("token");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);



  const StyledFab = styled(Fab)({
    position: "center",
    zIndex: 1,
    top: 45,
    left: 170,
    right: 0,
    margin: "0 auto",
  });

  const StyleText = styled(Typography)({
    fontSize: "1.5rem",
    fontWeight: "bold",
    textAlign: "center",
    margin: "0 auto",
    marginTop: "1rem",
    marginBottom: "1rem",
  });

  const StyleText2 = styled(Typography)({
    fontSize: "1.3rem",
    textAlign: "center",
    margin: "0 auto",
    marginTop: "1.5rem",
    marginBottom: "1rem",
  });

  const StyleText3 = styled(Typography)({
    fontSize: "1rem",
    textAlign: "center",
    margin: "0 auto",
    marginTop: "1.5rem",
    marginBottom: "1rem",
    fontWeight: "bold"
  }
  );

  const addToCart = () => {

    setIsDisabled(true)
    
    rentalMachinery(machinery._id, dateValue, token).then(res => {
      setOpen(false)
      setIsDisabled(false)
    })
    
  }


  
  const deleteMachineryFunction = () => {
    deleteMachinery(machinery._id, token).then(res => {
        console.log(res.msg)
    }).catch(err => {
      console.log(err)
    } )
  }


  

  return (
    <>
      <Card sx={{ maxWidth: 545 }}>
        <CardMedia
          component="img"
          Height="240"
          objetfit="contain"
          image={machinery.img}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {machinery.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {machinery.description}
          </Typography>
        </CardContent>
        <CardActions>
          <Box sx={{ width: 500 }}>
            {
              window.location.pathname === '/machineries' ? (
                <IconButton aria-label="delete" onClick={deleteMachineryFunction}>
                  <DeleteIcon />
                </IconButton>
              ) : machinery.isRented === false ? (
                <>
                  <BottomNavigationAction
                  onClick={handleOpen}
                  label="Recents"
                  icon={<AddShoppingCartIcon />}
                  
                />
                  <Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite />} />
                <BottomNavigationAction label="Nearby" icon={<LocationOnIcon />} />
                </>
                
                
              ) : (
                <>
                  <Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite />} />
                  <BottomNavigationAction label="Nearby" icon={<LocationOnIcon />} />
                  <Alert severity="error">Rentado</Alert>
                </>
              )
                
            }
            
          </Box>
          
          {/*<Button size="small" onClick={handleOpen}>
            Ver
          </Button>*/}
        </CardActions>
      </Card>

      {/* Modal para ver los detalles de la maquinaria */}

      <KeepMountedModal open={open} handleClose={handleClose}>
        <StyleText  gutterBottom variant="h5" component="div">
          {machinery.marca}
        </StyleText>
        <CardMedia
          component="img"
          MAXHeight="240"
          objetfit="include"
          image={machinery.img}
          alt="green iguana"
        />
        <StyleText2 gutterBottom variant="body" component="div">
          {machinery.name}
        </StyleText2>
        <StyleText3 gutterBottom variant="h5" component="div">
          L. {machinery.price} por hora
        </StyleText3>
        <StyleText3 variant="body2" color="text.secondary">
          {machinery.description}
        </StyleText3>
        <StyleText3 variant="body2" color="text.secondary">
          Introduzca la cantidad de horas que desea alquilar
        </StyleText3>
        {/* <TextField position="center" id="filled-basic" label="Horas" variant="filled" name={hours} onChange={(e) => setHours(e.target.value)} value={hours}/> */}
        
        <BasicDateRangePicker dateValue={dateValue} setDateValue={setDateValue}/>
        <StyledFab disabled={isDisabled} color="secondary" aria-label="add" onClick={addToCart}>
          <AddIcon/>
        </StyledFab>
        
      </KeepMountedModal>
    </>
  );
}
