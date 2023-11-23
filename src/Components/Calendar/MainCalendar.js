import React from 'react'
import Calendar from './Calendar';
import "react-datetime/css/react-datetime.css";
import Modal from 'react-modal'
Modal.setAppElement('#root')

function MainCalendar() {

  return (
    <div style = {{height: '90%', width: '90%', display: 'block', margin: "3% auto"}}>
      <Calendar />
    </div>
    )
}

export default MainCalendar;
