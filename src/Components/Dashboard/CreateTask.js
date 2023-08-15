import React, { useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import Fab from "@mui/material/Fab";
import Zoom from "@mui/material/Zoom";
import axios from 'axios'

function CreateTask(props) {
  const [isExpanded, setExpanded] = useState(false);

  const [note, setNote] = useState({
    title: "",
    content: "",
    user: ""
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setNote(prevNote => {
      return {
        ...prevNote,
        [name]: value
      };
    });
  }

async function submitNote() {
  
  props.onAdd(note);

  try {

    const response = await axios.post('http://localhost:7000/task/add-task', note);

    console.log(response.data); 

    if(response.status === 400){
      window.alert("Failed attempt")
    } else {
      window.alert("Task created");
    }

  } catch (error) {
    
    console.error('Error:', error.message);  
  }

};

// async function taskList() {
//   try {
//  const listData = await axios.get('http://localhost:7000/task')
//    }catch(error) {
//   console.log(error);
// }
// }

  const expand = () => {
    setExpanded(true);
  }

  return (
    <div>
      <form method = 'POST' className="create-note">
        
          <textarea
            name="title"
          onClick={expand}
            onChange={handleChange}
            value={note.title}
            placeholder="Add a task"
          rows= {isExpanded === true ? 1 : 1}
          />

        {isExpanded && (
          <>
        <textarea
          name="content"
          onClick={expand}
          onChange={handleChange}
          value={note.content}
          placeholder="Description..."
          rows={isExpanded === true ? 1 : 0}
        />
        
        <textarea
          name="user"
          onClick={expand}
          onChange={handleChange}
          value={note.user}
          placeholder="Assign a user"
          rows={isExpanded === true ? 1 : 0}
        />
        </> )}
        <Zoom in={isExpanded}>
          <Fab onClick={submitNote}>
            <AddIcon />
          </Fab>
        </Zoom>
      </form>
    </div>
  );
}

export default CreateTask;



