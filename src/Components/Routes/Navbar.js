import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
// import IconButton from "@mui/material/IconButton";
import Sidebar from "./Sidebar";
import { Link } from "react-router-dom";
import ArchitectureIcon from "@mui/icons-material/Architecture";

export default function Navbar() {
  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <Sidebar/>
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
          <Link to="/login" style={{ color: "white", textDecoration: "none" }}>
          <Button color="inherit">Login</Button></Link>
          <Link to="/register" style={{ color: "white", textDecoration: "none" }}>
          <Button color="inherit">Register</Button></Link>
          <Link to="/logout" style={{ color: "white", textDecoration: "none" }}>
          <Button color="inherit">Logout</Button></Link>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
