import React, {useState} from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import api from '../api'

function Task(props) {
  const [title, setTitle] = useState(props.title);
  const [content, setContent] = useState(props.content);
  const [user, setUser] = useState(props.user);
  const [isclicked, setIsClicked] = useState(false);


  const handleUpdate = async () => {
    try {
      const response = await api.put(
        `/task/edit/${props.id}`, {title, content, user});
      if (response.status === 201) {
        console.log("Item updated successfully");
        window.location.reload();
      } else {
        console.error("Failed to update item");
      }
    } catch (error) {
      console.error("Error", error);
    }
  };

  async function handleDelete() {
    try {
      await api.delete(`/task/delete/${props.id}`);
      window.location.reload();
    } catch (error) {
      console.error("Error:", error.message);
    }
  }

  const toggleEdit = () => {
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
            toggleEdit()
          }}
          size="small"
        >
          <EditIcon style={{margin: 'auto 100%' }} />
        </Button>
        <Button
          onClick={() => {
            handleDelete()
          }}
          size="small"
        >
          <DeleteIcon style={{ margin: 'auto 150%' }} />
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
          <button style = {{margin: '2px auto', display : 'block'}} type = 'button' className="btn btn-warning" onClick={()=>{handleUpdate()}}>Update</button>
        </div>
      )}
    </Card>
  );
}

export default Task;
