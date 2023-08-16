import React, { useState } from "react";
import Modal from "react-modal";
import Datetime from "react-datetime";

function AddEvent({ isOpen, onClose, onEventAdded }) {
  const [title, setTitle] = useState("");
  const [start, setStart] = useState(new Date());
  const [end, setEnd] = useState(new Date());

  const onSubmit = (event) => {
    event.preventDefault();

    onEventAdded({
      title,
      start,
      end,
    });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose}>
      <form
        style={{ display: "grid", width: "fit-content", height: "fit-content" }}
        onSubmit={onSubmit}
      >
        <input 
        style={{margin : '10px auto'}}
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <div style={{margin : '10px auto'}}>
          <label>Start Date</label>
          <Datetime value={start} onChange={date => setStart(date._d)} />
        </div>
        <div style={{margin : '10px auto'}}>
          <label>End Date</label>
          <Datetime value={end} onChange={date => setEnd(date._d)} />
        </div>
        <button style={{margin : '10px auto'}} className="btn btn-primary">Add Event</button>
      </form>
    </Modal>
  );
}

export default AddEvent;
