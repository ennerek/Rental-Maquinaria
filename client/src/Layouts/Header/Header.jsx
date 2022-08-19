import React, { useEffect, useState } from "react";
import {
  AppBar,
  Button,
  IconButton,
  Tab,
  Tabs,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import AddBusinessRoundedIcon from "@mui/icons-material/AddBusinessRounded";
import CarRentalIcon from '@mui/icons-material/CarRental';
import DrawerComp from "./Drawer";
import { useNavigate } from "react-router-dom";
import SendIcon from "@mui/icons-material/Send";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import KeepMountedModal from "../../Components/Modal";
import { getUser } from "../../Services/users";
import { addMachinery } from "../../Services/machineries";
import Cart from "../../Components/Cart";

import Modal from '@mui/material/Modal';
import { ReadyEmailSubscribeStyle } from "../../Components/Subscribe";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 480,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: '10px',
};

const Header = () => {

    const [value, setValue] = useState();
    const [user, setUser] = useState({});
    const [open, setOpen] = useState(false);
    const [openSubscribe, setOpenSubscribe] = useState(false);
    const [openRentalCart, setOpenRentalCart] = useState(false);
    const [machinery, setMachinery] = useState({
        brand: "",
        name: "",
        description: "",
        price: "",
        img: "",
        user: "",
    });

    const theme = useTheme();
    const isMatch = useMediaQuery(theme.breakpoints.down("md"));

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleOpenCartRental = () => setOpenRentalCart(true);
    const handleCloseCartRental = () => setOpenRentalCart(false);

    const handleOpenSubscribe = () => setOpenSubscribe(true);
    const handleCloseSubscribe = () => setOpenSubscribe(false);


    const navigate = useNavigate();
    const token = localStorage.getItem("token");


    const isLogged = () => {
      if (token) return true;

      return false;
    };

    const Logout = () => {
      localStorage.removeItem("token");
      window.location.href = "/home";
    };

    

    // Obtengo el usuario
    useEffect(() => {
      getUser(token).then((res) => {
        setUser(res.userDB);
      });
    }, [token, machinery, setUser]);



  
    return (
      <React.Fragment>
        <AppBar
          sx={{
            "background-image": "linear-gradient(to top, #e6b980 0%, #eacda3 100%)"
          }}
        >
          <Toolbar>
            <AddBusinessRoundedIcon
              sx={{ transform: "scale(2)", cursor: "pointer" }}
              onClick={() => (window.location.href = "/home")}
            />
            {isMatch ? (
              <>
                <Typography sx={{ fontSize: "2rem", paddingLeft: "10%" }}>
                  Rental Maquinaria
                </Typography>
                <DrawerComp />
              </>
            ) : (
              <>
                <Tabs
                  sx={{ margin: "auto" }}
                  indicatorColor="primary"
                  textColor="inherit"
                  value={value}
                  onChange={(e, value) => setValue(value)}
                >
                  <Tab
                    label="Home"
                    to="/Home"
                    onClick={() => navigate("/home")}
                  />
                  <Tab
                    label="Contact US"
                    to="/ContactUs"
                    onClick={() => navigate("/ContactUs")}
                  />
                </Tabs>

                {isLogged() ? (
                  <div>
                    <IconButton>
                      <CarRentalIcon onClick={handleOpenCartRental}/>
                    </IconButton>
                    {user?.role === "subscribed" ? (
                      <>
                        <Button
                        sx={{ marginLeft: "10px" }}
                        variant="contained"
                        color="primary"
                        onClick={() => navigate("/machineries")}
                      >
                        Ver Publicaciones
                      </Button>
                      <Button
                        sx={{ marginLeft: "10px" }}
                        variant="contained"
                        onClick={handleOpen}
                        color="primary"
                      >
                        Publicar maquinaria
                      </Button>
                      </>
                    ) : (
                      ""
                    )}
                    {user?.role === "normal" ? (
                      <Button
                        sx={{ marginLeft: "10px" }}
                        variant="contained"
                        color="primary"
                        to="/Checkout"
                        onClick={handleOpenSubscribe}
                        >
                        Suscribirse
                      </Button>
                    ) : (
                      ""
                    )}

                    <Button
                      sx={{ marginLeft: "10px" }}
                      variant="contained"
                      onClick={Logout}
                      color="error"
                    >
                      Salir
                    </Button>
                  </div>
                ) : (
                  <div>
                    <Button
                      sx={{
                        marginLeft: "auto",
                        background: "gray",
                        ":hover": { background: "gray", color: "white" },
                      }}
                      variant="contained"
                      href="/login"
                    >
                      Iniciar Sesión
                    </Button>
                    <Button
                      sx={{
                        marginLeft: "10px",
                        background: "gray",
                        ":hover": { background: "gray", color: "white" },
                      }}
                      variant="contained"
                      href="/register"
                    >
                      Registrarse
                    </Button>
                  </div>
                )}
              </>
            )}
          </Toolbar>
        </AppBar>
        <Modal
          open={openSubscribe}
          onClose={handleCloseSubscribe}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <ReadyEmailSubscribeStyle/>
          </Box>
      </Modal>
        <KeepMountedModal open={openRentalCart} handleClose={handleCloseCartRental}>
          <Cart rentedMachineries={user.rentalCart}/>
        </KeepMountedModal>
        <KeepMountedModal open={open} handleClose={handleClose}>


          {/*Aqui va el formulario de publicar maquinaria*/}

          <Box
            component="form"
            sx={{
              "& > :not(style)": { m: 1, width: "25ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField 
              id="standard-basic" 
              label="Marca" 
              variant="standard" 
              value={machinery.brand}
              onChange={(e) => setMachinery({ ...machinery, brand: e.target.value })}
            />
            <TextField 
                id="standard-basic" 
                label="Nombre" 
                variant="standard" 
                value={machinery.name}
                onChange={(e) => setMachinery({ ...machinery, name: e.target.value })}
            />
            <TextField
              id="standard-basic"
              label="Descripción"
              variant="standard"
              value={machinery.description}
              onChange={(e) => setMachinery({ ...machinery, description: e.target.value })}
            />
            <TextField 
              id="standard-basic" 
              label="Precio" 
              variant="standard" 
              value={machinery.price}
              onChange={(e) => setMachinery({ ...machinery, price: e.target.value })}
            />
            <TextField 
              id="standard-basic" 
              label="Imagen" 
              variant="standard" 
              value={machinery.img}
              onChange={(e) => setMachinery({ ...machinery, img: e.target.value })}
            />
          </Box>
          <Button variant="contained" endIcon={<SendIcon />} onClick={() => {
            addMachinery(machinery, token).then(() => {
              console.log(machinery)
              setMachinery({
                brand: "",
                name: "",
                description: "",
                price: "",
                img: ""
              });
            handleClose();
          })}}>
            Subir
          </Button>
        </KeepMountedModal>

          {/*Aqui va el formulario de suscripción*/}
      
      </React.Fragment>
  );
};

export default Header;
