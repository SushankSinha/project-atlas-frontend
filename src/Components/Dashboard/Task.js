import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
// import axios from 'axios'

function Task(props) {


  function handleClick() {
    props.onDelete(props.id);
  }

  return (
    // <ChatState.Provider value = {data}>
      <Card sx={{ width: 250, margin: "3%" }}>
        <CardContent>
          <Typography variant="h5" component="div">
            {props.title}
          </Typography>
          <br />
          <Typography sx={{ marginBottom: "15px" }}>{props.content}</Typography>
          <Typography>
            Assigned to : <b style={{ color: "red" }}>{props.user}</b>
          </Typography>
        </CardContent>
        <CardActions >
          <Button onClick={handleClick} size="small">
            <DeleteIcon style = {{ marginLeft : '75%' }} />
          </Button>
        </CardActions>
      </Card>
    // </ChatState.Provider>
  );
}

export default Task;
