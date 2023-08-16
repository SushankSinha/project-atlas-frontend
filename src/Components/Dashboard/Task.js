import React, {useState} from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import axios from "axios";

function Task(props) {
  const [title, setTitle] = useState(props.title);
  const [content, setContent] = useState(props.content);
  const [user, setUser] = useState(props.user);
  const [isclicked, setIsClicked] = useState(false);

  const handleUpdate = async () => {
    try {
      const response = await axios.put(
        `https://atlas-tool-server.onrender.com/task/edit/${props.id}`, {title, content, user});

      if (response.status === 201) {
        console.log("Item updated successfully");
      } else {
        console.error("Failed to update item");
      }
    } catch (error) {
      console.error("Error", error);
    }
  };

  async function handleDelete() {
    try {
      await axios.delete(`https://atlas-tool-server.onrender.com/task/delete/${props.id}`);
    } catch (error) {
      console.error("Error:", error.message);
    }
  }

  const toggle = () => {
    setIsClicked(!isclicked); 
  };

  return (
    <Card sx={{display : 'inline-block', width: 250, marginLeft: "3%" }}>
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
      <CardActions style = {{margin: '2px auto', display : 'block'}}>
        <Button
          onClick={() => {
            toggle()
          }}
          size="small"
        >
          <EditIcon style={{marginLeft: '100%' }} />
        </Button>
        <Button
          onClick={() => {
            handleDelete();
            window.location.reload(true);
          }}
          size="small"
        >
          <DeleteIcon style={{ marginLeft: '150%' }} />
        </Button>
      </CardActions>
      {isclicked && (
        <div>
          <input
            style = {{margin: '2px auto', display : 'block'}}
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            style = {{margin: '2px auto', display : 'block'}}
            type="text"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <input
            style = {{margin: '2px auto', display : 'block'}}
            type="text"
            value={user}
            onChange={(e) => setUser(e.target.value)}
          />
          <button style = {{margin: '2px auto', display : 'block'}} type = 'button' className="btn btn-warning" onClick={()=>{handleUpdate(); window.location.reload(true) }}>Update</button>
        </div>
      )}
    </Card>
  );
}

export default Task;
