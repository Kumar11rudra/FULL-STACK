import { useState } from "react";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";

import EventModal from "./EventModal";
import EventDetails from "./EventDetails";

import sampleEvents from "../data/sampleEvents";

function SchedulerCalendar() {

  const [events, setEvents] = useState(sampleEvents);

  const [selectedEvent, setSelectedEvent] = useState(null);

  const [showModal, setShowModal] = useState(false);

  const handleEventClick = (info) => {
    setSelectedEvent(info.event);
  };

  const handleDateClick = (info) => {
    setShowModal(true);
    setSelectedEvent({
      start: info.dateStr
    });
  };

  const handleEventDrop = (info) => {

    setEvents((previous) =>
      previous.map((event) =>
        event.id === info.event.id
          ? {
              ...event,
              start: info.event.startStr,
              end: info.event.endStr
            }
          : event
      )
    );

  };

  const saveEvent = (newEvent) => {

    setEvents((previous) => [
      ...previous,
      {
        ...newEvent,
        id: Date.now().toString()
      }
    ]);

    setShowModal(false);

  };

  return (

    <div
      style={{
        padding: 25
      }}
    >

      <FullCalendar

        plugins={[
          dayGridPlugin,
          timeGridPlugin,
          interactionPlugin,
          listPlugin
        ]}

        initialView="dayGridMonth"

        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek"
        }}

        editable={true}

        selectable={true}

        droppable={true}

        weekends={true}

        events={events}

        eventClick={handleEventClick}

        dateClick={handleDateClick}

        eventDrop={handleEventDrop}

        height="auto"

      />

      {

        selectedEvent &&

        <EventDetails

          event={selectedEvent}

          onClose={() => setSelectedEvent(null)}

        />

      }

      {

        showModal &&

        <EventModal

          defaultDate={selectedEvent?.start}

          onSave={saveEvent}

          onClose={() => setShowModal(false)}

        />

      }

    </div>

  );

}

export default SchedulerCalendar;
