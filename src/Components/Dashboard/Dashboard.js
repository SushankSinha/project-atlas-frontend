import React, { useState, useEffect } from "react";
import AddIcon from "@mui/icons-material/Add";
import Fab from "@mui/material/Fab";
import Zoom from "@mui/material/Zoom";
import axios from "axios";
import Task from "./Task";
import Status from "./Status";
import SearchBar from "./SearchBar";
import './Task.css'

function Dashboard() {
  const [isExpanded, setExpanded] = useState(false);
  const [data, setData] = useState([]);

  const [note, setNote] = useState({
    title: "",
    content: "",
    user: "",
    status: 'Assigned'
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setNote((prevNote) => {
      return {
        ...prevNote,
        [name]: value,
      };
    });
  }

  async function submitNote() {
   
    try {
      const response = await axios.post(
        `https://atlas-tool-server.onrender.com/task/add-task`,
        note
      );

      console.log(response.data.taskDetails.content);

      if (response.status === 400) {
        window.alert("Failed attempt");
      } else {
        window.alert("Task created");
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  }

  useEffect(() => {
    (async () => {
      const res = await axios.get(`https://atlas-tool-server.onrender.com/task`);

      setData(res.data);

      console.log(res.data);
      console.log(res.data.length);
    })();
  }, []);

  const expand = () => {
    setExpanded(true);
  };

  return (
    <div>
      <form method="POST" className="create-note">
        <textarea
          name="title"
          onClick={expand}
          onChange={handleChange}
          value={note.title}
          min={5}
          placeholder="Add a task"
          rows={isExpanded === true ? 1 : 1}
        />

        {isExpanded && (
          <>
            <textarea
              name="content"
              onClick={expand}
              onChange={handleChange}
              value={note.content}
              min={5}
              placeholder="Description..."
              rows={isExpanded === true ? 1 : 0}
            />

            <textarea
              name="user"
              onClick={expand}
              onChange={handleChange}
              value={note.user}
              min={3}
              placeholder="Assign a user"
              rows={isExpanded === true ? 1 : 0}
            />
          </>
        )}
        <Zoom in={isExpanded}>
          <Fab
            onClick={() => {
              submitNote();
              window.location.reload(true);
            }}
          >
            <AddIcon />
          </Fab>
        </Zoom>
      </form>
      
      <SearchBar />

      {data.map((noteItem, index) => {
        return (
          <div style = {{marginBottom : '2%', display : 'flex', flexDirection : 'row'}} >
            <Task
              key={index}
              id={noteItem._id}
              title={noteItem.title}
              content={noteItem.content}
              user={noteItem.user}
            />
            <Status
              key={noteItem._id + index + 5}
              id={noteItem._id}
              title={noteItem.title}
            />
          </div>
        );
      })}
    </div>
  );
}

export default Dashboard;
