import {
  createViewDay,
  createViewMonthAgenda,
  createViewMonthGrid,
  createViewWeek,
} from "@schedule-x/calendar";
import { ScheduleXCalendar, useCalendarApp } from "@schedule-x/react";
import React, { useEffect, useState } from "react";
import { activeReload, deactiveReload } from "../../../state/slice/ReloadSlice";
import { useDispatch, useSelector } from "react-redux";
import { createEventModalPlugin } from "@schedule-x/event-modal";
import { createEventsServicePlugin } from "@schedule-x/events-service";
import axios from "axios";

const CalendarioProyecto = () => {
  const eventsService = useState(() => createEventsServicePlugin())[0];
  const eventModal = createEventModalPlugin();

  const [eventos, setEventos] = useState([]);

  const reloadReducer = useSelector((state) => state.reload);
  const dispatch = useDispatch();

  const handleReload = () => {
    dispatch(activeReload());
  };

  const obtenerEventos = async () => {
    try {
      const response = await axios.get("http://localhost:3000/activity");
      const events = [];
      response.data.forEach((evento) => {
        events.push({
          id: evento.id_activity,
          title: `${evento.employee.name} ${evento.name}`,
          start: Temporal.Instant.from(evento.start_date)
            .toZonedDateTimeISO("UTC")
            .toPlainDate(),
          end: Temporal.Instant.from(evento.end_date)
            .toZonedDateTimeISO("UTC")
            .toPlainDate(),
          calendarId: evento.id_employee,
          description: evento.description,
        });
      });

      setEventos(events);

      eventsService.set(events);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    obtenerEventos();
    dispatch(deactiveReload());
  }, [reloadReducer]);

  useEffect(() => {
    obtenerEventos();
  }, []);

  const calendar = useCalendarApp({
    calendars: {
      1: {
        colorName: "Giovanni",
        lightColors: {
          main: "#1f77b4",
          container: "#d6eaf8",
          onContainer: "#0b2e4a",
        },
        darkColors: {
          main: "#1f77b4",
          container: "#0b2e4a",
          onContainer: "#d6eaf8",
        },
      },
      2: {
        colorName: "Ivan",
        lightColors: {
          main: "#ff7f0e",
          container: "#ffe3c7",
          onContainer: "#5a2b00",
        },
        darkColors: {
          main: "#ff7f0e",
          container: "#5a2b00",
          onContainer: "#ffe3c7",
        },
      },
      3: {
        colorName: "Oscar",
        lightColors: {
          main: "#2ca02c",
          container: "#d4f4d6",
          onContainer: "#0f3b10",
        },
        darkColors: {
          main: "#2ca02c",
          container: "#0f3b10",
          onContainer: "#d4f4d6",
        },
      },
      4: {
        colorName: "Carlos",
        lightColors: {
          main: "#d62728",
          container: "#ffd6d6",
          onContainer: "#5a0f10",
        },
        darkColors: {
          main: "#d62728",
          container: "#5a0f10",
          onContainer: "#ffd6d6",
        },
      },
      5: {
        colorName: "Fernando",
        lightColors: {
          main: "#9467bd",
          container: "#eadcf7",
          onContainer: "#2e1a45",
        },
        darkColors: {
          main: "#9467bd",
          container: "#2e1a45",
          onContainer: "#eadcf7",
        },
      },
      6: {
        colorName: "Raymundo",
        lightColors: {
          main: "#8c564b",
          container: "#f0e0d8",
          onContainer: "#3b2018",
        },
        darkColors: {
          main: "#8c564b",
          container: "#3b2018",
          onContainer: "#f0e0d8",
        },
      },
      7: {
        colorName: "Empleado 7",
        lightColors: {
          main: "#e377c2",
          container: "#fde1f2",
          onContainer: "#5a1a45",
        },
        darkColors: {
          main: "#e377c2",
          container: "#5a1a45",
          onContainer: "#fde1f2",
        },
      },
      8: {
        colorName: "Empleado 8",
        lightColors: {
          main: "#7f7f7f",
          container: "#eeeeee",
          onContainer: "#2b2b2b",
        },
        darkColors: {
          main: "#7f7f7f",
          container: "#2b2b2b",
          onContainer: "#eeeeee",
        },
      },
      9: {
        colorName: "Empleado 9",
        lightColors: {
          main: "#bcbd22",
          container: "#f7f7c6",
          onContainer: "#4a4b00",
        },
        darkColors: {
          main: "#bcbd22",
          container: "#4a4b00",
          onContainer: "#f7f7c6",
        },
      },
    },
    views: [
      createViewDay(),
      createViewWeek(),
      createViewMonthGrid(),
      createViewMonthAgenda(),
    ],
    events: eventos,
    plugins: [eventsService, eventModal],
  });
  return (
    <>
      <div className="h-screen">
        <ScheduleXCalendar calendarApp={calendar} />
      </div>
    </>
  );
};

export default CalendarioProyecto;
