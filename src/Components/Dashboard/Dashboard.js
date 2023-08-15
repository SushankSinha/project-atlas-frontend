import React, { useState } from "react";
import Task from "./Task";
import CreateTask from "./CreateTask";
import './Task.css'
import Status from './Status'
import { v4 as uuid} from 'uuid'
import SearchBar from "./SearchBar";

function Dashboard({setTaskTitle, setTaskUser, setTaskStatus}) {
  const [notes, setNotes] = useState([]);

  function addNote(newNote) {
    setNotes((prevNotes) => {
      return [...prevNotes, newNote];
    });
  }

  function deleteNote(id) {
    setNotes((prevNotes) => {
      return prevNotes.filter((noteItem, index) => {
        return index !== id;
      });
    });
  }

  const rowId = uuid().slice(0,5)

  return (
    <div>
      <CreateTask onAdd={addNote} />
      <SearchBar  />
      {notes.map((noteItem, index) => {
        setTaskTitle(noteItem.title)
        setTaskUser(noteItem.user)
        return (<div style = {{display : 'flex', flexDirection : 'row'}}>
          <Task
            key={rowId}
            id={index}
            title={noteItem.title}
            content={noteItem.content}
            user={noteItem.user}
            onDelete={deleteNote}
            setTaskTitle = {noteItem.title}
            setTaskUser = {noteItem.user}
            />
          <Status
            key={noteItem.title}
            id={index}
            title={noteItem.title}
            setTaskStatus = {setTaskStatus}
            />
          </div>
        );
      })}
    </div>
  );
}

export default Dashboard;
