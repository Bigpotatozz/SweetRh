import React, { useEffect, useState } from "react";
import { Gantt, Willow } from "@svar-ui/react-gantt";
import "@svar-ui/react-gantt/all.css";

const GanttTable = ({ actividades }) => {
  const [actividadesGantt, setActividadesGantt] = useState([]);

  const formatearActividades = (actividades) => {
    const nuevasActividades = actividades.map((actividad) => ({
      id: actividad.id_project_activity,
      text: actividad.name,
      start: actividad.start_date ? new Date(actividad.start_date) : Date.now(),
      end: actividad.end_date ? new Date(actividad.end_date) : Date.now(),
      css: "task-paro-rojo",
    }));

    setActividadesGantt(nuevasActividades);
  };

  useEffect(() => {
    console.log(actividades);
    formatearActividades(actividades);

    console.log(actividadesGantt);
  }, [actividades]);
  const links = [{ id: 1, source: 20, target: 21, type: "e2e" }];

  const scales = [
    {
      unit: "month",
      step: 1,
      format: (date) =>
        date.toLocaleString("es-MX", { month: "long", year: "numeric" }),
    },
    {
      unit: "day",
      step: 1,
      format: (date) => date.getDate(),
    },
  ];

  return (
    <>
      <div className="w-full">
        <aside>
          <ul>
            {actividadesGantt.map((actividad) => {
              return (
                <li key={actividad.id_project_activity}>
                  <p>{actividad.name}</p>
                </li>
              );
            })}
          </ul>
        </aside>
        <Willow>
          <Gantt
            tasks={actividadesGantt}
            links={links}
            scales={scales}
            readonly={true}
            custom
          ></Gantt>
        </Willow>
      </div>
    </>
  );
};

export default GanttTable;
