import { useEffect, useState } from "react";
import { useCalendarApp, ScheduleXCalendar } from "@schedule-x/react";
import "temporal-polyfill/global";
import {
  createViewDay,
  createViewMonthAgenda,
  createViewMonthGrid,
  createViewWeek,
} from "@schedule-x/calendar";
import { createEventsServicePlugin } from "@schedule-x/events-service";
import "@schedule-x/theme-default/dist/index.css";
import { createEventModalPlugin } from "@schedule-x/event-modal";
import axios from "axios";

export const Calendario = () => {
  const eventsService = useState(() => createEventsServicePlugin())[0];
  const eventModal = createEventModalPlugin();

  const [eventos, setEventos] = useState([]);

  const obtenerEventos = async () => {
    try {
      const response = await axios.get("http://localhost:3000/activity");
      const events = [];
      response.data.forEach((evento) => {
        events.push({
          id: evento.id_activity,
          title: evento.name,
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
  }, []);

  const calendar = useCalendarApp({
    calendars: {
      1: {
        colorName: "Giovanni",
        lightColors: {
          main: "#f91c45",
          container: "#ffd2dc",
          onContainer: "#59000d",
        },
        darkColors: {
          main: "#ffc0cc",
          container: "#a24258",
          onContainer: "#ffdee6",
        },
      },

      2: {
        colorName: "Ivan",
        lightColors: {
          main: "#f9d71c",
          container: "#fff5aa",
          onContainer: "#594800",
        },
        darkColors: {
          main: "#fff5c0",
          container: "#a29742",
          onContainer: "#fff5de",
        },
      },
      3: {
        colorName: "Oscar",
        lightColors: {
          main: "#e74c3c",
          container: "#ffcdd2",
          onContainer: "#5a1a13",
        },
        darkColors: {
          main: "#ff8a80",
          container: "#b71c1c",
          onContainer: "#ffeaec",
        },
      },

      4: {
        colorName: "Carlos",
        lightColors: {
          main: "#3498db",
          container: "#bbdefb",
          onContainer: "#0d3c61",
        },
        darkColors: {
          main: "#82b1ff",
          container: "#1565c0",
          onContainer: "#e3f2fd",
        },
      },

      5: {
        colorName: "Fernando",
        lightColors: {
          main: "#2ecc71",
          container: "#c8e6c9",
          onContainer: "#0f4d2b",
        },
        darkColors: {
          main: "#69f0ae",
          container: "#1b5e20",
          onContainer: "#e8f5e9",
        },
      },

      6: {
        colorName: "Raymundo",
        lightColors: {
          main: "#9b59b6",
          container: "#e1bee7",
          onContainer: "#3d1f47",
        },
        darkColors: {
          main: "#ce93d8",
          container: "#6a1b9a",
          onContainer: "#f3e5f5",
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
