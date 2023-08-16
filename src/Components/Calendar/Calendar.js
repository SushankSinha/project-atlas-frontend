import React, { useRef, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import * as bootstrap from "bootstrap";
import AddEvent from "./AddEvent";
import axios from "axios";
import moment from "moment";
import serverURL from '../global'

function Calendar() {
  const [modalOpen, setModalOpen] = useState(false);
  const [events, setEvents] = useState([]);
  const calendarRef = useRef(null);

  const onEventAdded = (event) => {
    let calendarApi = calendarRef.current.getApi();
    calendarApi.addEvent({
      start: moment(event.start).toDate(),
      end: moment(event.end).toDate(),
      title: event.title,
    });
  };

  async function handleEventAdd(data) {
    try{
     await axios.post(`https://atlas-tool-server.onrender.com/calendar/add-event`, data.event);
    }catch(error) {
        console.log(error);
    }
}

  async function handleDatesSet(data) {
    try {
    const response = await axios
      .get(
        `https://atlas-tool-server.onrender.com/calendar`, data.event
      )
    setEvents(response.data);
      }catch(error) {
        console.log(error);
    }
}


  return (
    <section>
      <button style = {{marginRight : '10px'}} onClick={() => setModalOpen(true)}>Add Event</button>
      <div style={{ position: "relative", zIndex: 0 }}>
        <FullCalendar
          ref={calendarRef}
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          eventAdd={(event) => handleEventAdd(event)}
          datesSet={(date) => handleDatesSet(date)}
          events={events}
          height={"90vh"}
        eventDidMount={(info) => {
          return new bootstrap.Popover(info.el, {
            title: info.event.title,
            placement: "auto",
            trigger: "hover",
            customClass: "popoverStyle",
            html: true,
          });
        }}
        />
      </div>
      <AddEvent
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onEventAdded={(event) => {
          onEventAdded(event);
        }}
      />
    </section>
  );
}

export default Calendar;
