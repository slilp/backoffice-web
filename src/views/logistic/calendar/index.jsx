import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick

function Calendar({dateInfoList}) {


    const handleDateClick = (arg) => { 
        alert(arg.dateStr)
    }


    return (
        <FullCalendar
        plugins={[ dayGridPlugin , interactionPlugin]}
        initialView="dayGridMonth"
        events={dateInfoList}      
        eventColor="rgb(97, 97, 139)"
      />
    )
}

export default Calendar
