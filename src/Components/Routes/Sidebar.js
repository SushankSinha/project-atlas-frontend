import React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import BarChartIcon from "@mui/icons-material/BarChart";
import CodeIcon from "@mui/icons-material/Code";
// import GroupsIcon from "@mui/icons-material/Groups";

export default function Sidebar() {
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{
        alignItems: "left",
        width: anchor === "top" || anchor === "bottom" ? "auto" : 250
      }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List style={{ margin: "10px", padding: "10px" }}>
        <ListItem disablePadding>
          <Link
            style={{ textDecoration: "none", color: "black" }}
            to="/dashboard"
          >
            <ListItemButton>
              <SpaceDashboardIcon style={{ margin: "10px" }} />
              Dashboard
            </ListItemButton>
          </Link>
        </ListItem>
        <ListItem disablePadding>
          <Link
            style={{ textDecoration: "none", color: "black" }}
            to="/calendar"
          >
            <ListItemButton>
              <CalendarMonthIcon style={{ margin: "10px" }} /> Timeline{" "}
            </ListItemButton>
          </Link>
        </ListItem>
        <ListItem disablePadding>
          <Link style={{ textDecoration: "none", color: "black" }} to="/charts">
            <ListItemButton>
              <BarChartIcon style={{ margin: "10px" }} /> Charts{" "}
            </ListItemButton>
          </Link>
        </ListItem>
        <ListItem disablePadding>
          <Link
            style={{ textDecoration: "none", color: "black" }}
            to="/logs"
          >
            <ListItemButton>
              <CodeIcon style={{ margin: "10px" }} /> Logs{" "}
            </ListItemButton>
          </Link>
        </ListItem>
      </List>
      <Divider sx = {{borderBottomWidth : 3, backgroundColor : 'black'}} />
      {/* <List style={{ margin: "10px", padding: "10px" }}>
        <ListItem disablePadding>
        <Link 
            style={{ textDecoration: "none", color: "black" }} to="/meeting
            "
          >
          <ListItemButton >
            {" "}
            <GroupsIcon style={{ margin: "10px" }} />
            
              Meeting{" "}
          </ListItemButton>
          </Link>
        </ListItem>
      </List> */}
    </Box>
  );

  

  return (
    <div>
        {["left"].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button
            style={{ color: "white" }}
            onClick={toggleDrawer(anchor, true)}
          >
            <MenuIcon />
          </Button>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
