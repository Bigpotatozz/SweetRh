import React, { useRef } from "react";
import { Gantt, Willow } from "@svar-ui/react-gantt";
import "@svar-ui/react-gantt/all.css";
import { data } from "react-router";

const GanttTable = () => {
  const tasks = [
    {
      id: 20,
      text: "New Task",
      start: new Date(2026, 1, 2),
      end: new Date(2026, 1, 12),
      duration: 1,
      progress: 2,
      type: "task",
      lazy: false,
    },
    {
      id: 47,
      text: "[1] Master project",
      start: new Date(2026, 1, 5),
      end: new Date(2026, 1, 10),
      duration: 8,
      progress: 0,
      parent: 0,
      type: "summary",
    },
    {
      id: 22,
      text: "Task",
      start: new Date(2026, 2, 11),
      end: new Date(2026, 2, 20),
      duration: 8,
      progress: 0,
      parent: 47,
      type: "task",
    },
    {
      id: 21,
      text: "New Task 2",
      start: new Date(2026, 2, 11),
      end: new Date(2026, 2, 20),
      duration: 3,
      progress: 0,
      type: "task",
      lazy: false,
    },
  ];

  const links = [{ id: 1, source: 20, target: 21, type: "e2e" }];

  const scales = [
    {
      unit: "month",
      step: 1,
      // Función que recibe la fecha y devuelve el string formateado
      format: (date) =>
        date.toLocaleString("es-MX", { month: "long", year: "numeric" }),
    },
    {
      unit: "day",
      step: 1,
      // Función para mostrar solo el día numérico
      format: (date) => date.getDate(),
    },
  ];

  return (
    <>
      <Willow>
        <Gantt
          tasks={tasks}
          links={links}
          scales={scales}
          readonly={true}
        ></Gantt>
      </Willow>
    </>
  );
};

export default GanttTable;
