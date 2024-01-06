import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Sidebar from "./Sidebar";
import { Link } from "react-router-dom";
import ArchitectureIcon from "@mui/icons-material/Architecture";
import { useAuth } from '../Context/AuthContext';

function Navbar() {

  const { logout } = useAuth();
  const token = localStorage.getItem('token');
 
  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          { token && (<Sidebar/>)}
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
          {token? (<Link style={{ color: "white", textDecoration: "none" }}>
          <Button onClick={logout} color="inherit">Logout</Button></Link>
          ) : (<><Link to="/login" style={{ color: "white", textDecoration: "none" }}>
          <Button color="inherit">Login</Button></Link><Link to="/register" style={{ color: "white", textDecoration: "none" }}>
          <Button color="inherit">Register</Button></Link></>) }
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Navbar;
