import React, { useState } from "react";
import Modal from "react-modal";
import Datetime from "react-datetime";

function UpdateEvent({ isUpdateOpen, onUpdateClose, onEventUpdated }) {
  const [title, setTitle] = useState("");
  const [start, setStart] = useState(new Date());
  const [end, setEnd] = useState(new Date());

  const onSubmit = (event) => {
    event.preventDefault();

    onEventUpdated({
      title,
      start,
      end,
    });
    onUpdateClose();
  };

  return (
    <Modal isUpdateOpen={isUpdateOpen} onRequestClose={onUpdateClose}>
      <form
        style={{ display: "grid", width: "fit-content", height: "fit-content" }}
        onSubmit={onSubmit}
      >
        <input
          placeholder="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <div>
          <label>Start Date</label>
          <Datetime value={start} onChange={date => setStart(date._d)} />
        </div>
        <div>
          <label>End Date</label>
          <Datetime value={end} onChange={date => setEnd(date._d)} />
        </div>
        <button>Update Event</button>
      </form>
    </Modal>
  );
}

export default UpdateEvent;
