import React, { useState } from "react";
import {
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

const pages = ["Login","Register","Logout","ContactUs"];

const DrawerComp = () => {
  const [openDrawer, setOpenDrawer] = useState(false);

    const isLogged = () => {
    const token = localStorage.getItem("token");
    
    if(token) return true;

    return false;
  }

  const Logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  }

  return (
    <React.Fragment>
      <Drawer
        anchor="left"
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
      >
        <List>
          {
            isLogged() ? 
            (
              pages.filter(page => page !== "Login" && page !== "Register").map((page, index) => (
                <ListItemButton key={index} onClick={() => {
                  if(page === "Logout"){
                    Logout();
                  } else {
                    window.location.href = '/' + page;
                  }
                  
                }} >
                <ListItemIcon>
                  <ListItemText>{page}</ListItemText>
                </ListItemIcon>
              </ListItemButton>
              ))
            ) : (
              pages.filter(page => page !== "Logout").map((page, index) => (
                <ListItemButton key={index} onClick={() => { window.location.href = '/' + page}}>
                <ListItemIcon>
                  <ListItemText>{page}</ListItemText>
                </ListItemIcon>
              </ListItemButton>
            )))   
          }
        </List>
      </Drawer>
      <IconButton
        sx={{ color: "white", marginLeft: "auto" }}
        onClick={() => setOpenDrawer(!openDrawer)}
      >
        <MenuIcon color="white" />
      </IconButton>
    </React.Fragment>
  );
};

export default DrawerComp;