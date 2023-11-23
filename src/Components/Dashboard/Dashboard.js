import React, { useState, useEffect } from "react";
import AddIcon from "@mui/icons-material/Add";
import Fab from "@mui/material/Fab";
import Zoom from "@mui/material/Zoom";
import api from "../api";
import Task from "./Task";
import Status from "./Status";
import "./Task.css";
import { Container, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [isExpanded, setExpanded] = useState(false);
  const [data, setData] = useState([]);

  const [note, setNote] = useState({
    title: "",
    content: "",
    user: "",
    status: "Assigned",
  });

  const [searchTask, setSearchTask] = useState(data);
  const navigate = useNavigate();

  function handleChange(event) {
    const { name, value } = event.target;

    setNote((prevNote) => {
      return {
        ...prevNote,
        [name]: value,
      };
    });
  }

  const handleSearch = (event) => {
    if (event.target.value === null) {
      setSearchTask(data);
      return;
    }
    const searchedTask = data.filter(
      (item) =>
        item.title.toLowerCase().indexOf(event.target.value.toLowerCase()) > -1
    );
    setSearchTask(searchedTask);
  };

  async function submitNote() {
    if(localStorage.getItem('user')){
    try {
      const response = await api.post(`/task/add-task`, note);

      if (response.status === 201) {
        window.alert("Task created");
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  }
  }

  async function TaskDetails() {
    if(localStorage.getItem('user')){
    try {
      const response = await api.get(`/task`);
        if (response.status === 200) {
          setData(response.data);
          setSearchTask(response.data);
        }
    } catch (error) {
      console.log(error);
    }
  }
  }

  /* eslint-disable react-hooks/exhaustive-deps */

  useEffect(() => {
    TaskDetails();
  }, []);

  if(!localStorage.getItem('user')){
    navigate("/login");
  }

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
              window.location.reload();
            }}
          >
            <AddIcon />
          </Fab>
        </Zoom>
      </form>

      <Container
        style={{ width: "50%", margin: "20px auto", display: "block" }}
      >
        <TextField
          type="text"
          placeholder="Search Tasks"
          onChange={handleSearch}
          style={{
            borderRadius: "10px",
            border: "2px solid black",
            width: "100%",
            marginTop: "10px",
          }}
        />
      </Container>

      {searchTask.map((noteItem, index) => {
        return (
          <div
            style={{
              marginBottom: "2%",
              display: "flex",
              flexDirection: "row",
            }}
          >
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
