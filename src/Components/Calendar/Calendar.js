import React, { useRef, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import AddEvent from "./AddEvent";
import api from "../api";
import moment from "moment";
import { useAuth } from '../Context/AuthContext';

function Calendar() {
  const [modalOpen, setModalOpen] = useState(false);
  const [events, setEvents] = useState([]);
  const { userRole, logout } = useAuth();
  const calendarRef = useRef(null);  
  const token = localStorage.getItem('token');

  const onEventAdded = (event) => {
    let calendarApi = calendarRef.current.getApi();
    calendarApi.addEvent({
      start: moment(event.start).toDate(),
      end: moment(event.end).toDate(),
      title: event.title,
    });
  };

  async function handleEventAdd(data) {
    try {
      await api.post(`/calendar/add-event`, data.event);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleDatesSet(data) {
    if(token){
    try {
      const response = await api.get("/calendar/events?start="+moment(data.start).toISOString()+"&end="+moment(data.end).toISOString());
      console.log(response)
      setEvents(response.data);
    } catch (error) {
      console.log(error);
    }
  }else if(!token){
    logout()
  }
  }

  return (
    <section>
      {userRole.role === "projectAdmin" && (<button
        style={{ marginRight: "10px" }}
        onClick={() => setModalOpen(true)}
      >
        Add Event
      </button>)}
      <div style={{ position: "relative", zIndex: 0 }}>
        <FullCalendar
          ref={calendarRef}
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          eventAdd={(event) => handleEventAdd(event)}
          datesSet={(date) => handleDatesSet(date)}
          events={events}
          height={"90vh"}
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
