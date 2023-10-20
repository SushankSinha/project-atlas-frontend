import React, {useState, useEffect} from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Sidebar from "./Sidebar";
import { Link } from "react-router-dom";
import ArchitectureIcon from "@mui/icons-material/Architecture";
import api from '../api';

function Navbar() {

  const[display, setDisplay] = useState(false);
  const[displayAuth, setDisplayAuth] = useState(true);

  async function userInfo(){
    try {
      const response = await api.get('/')
      if(response.status===200){
        setDisplay(true);
        setDisplayAuth(false);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(()=>{
    userInfo()
  },[]);

  async function userLogout(){
    try {
        await api.get(`/logout`);
    } catch (error) {
        console.log(error)
    }
    
}
 
  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          { display && (<Sidebar/>)}
          <Link to="/" style={{ color: "white", textDecoration: "none" }}>
            <ArchitectureIcon style={{ marginLeft: "1%" }} />
          </Link>
          <Typography
            style={{
              fontSize: "20px",
              fontWeight: "bold",
              display: "flex",
              color: "inherit"
            }}
          >
            <Link to="/" style={{ color: "white", textDecoration: "none" }}>
              {" "}
              ATLAS{" "}
            </Link>
          </Typography>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {/* News */}
          </Typography>
          {displayAuth === true? (<><Link to="/login" style={{ color: "white", textDecoration: "none" }}>
          <Button color="inherit">Login</Button></Link>
          <Link to="/register" style={{ color: "white", textDecoration: "none" }}>
          <Button color="inherit">Register</Button></Link></>) : (<Link to="/login" style={{ color: "white", textDecoration: "none" }}>
          <Button onClick={userLogout} color="inherit">Logout</Button></Link>) }
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Navbar;
