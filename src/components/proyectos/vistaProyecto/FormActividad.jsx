import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";
import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";
import React from "react";

const FormActividad = ({ actividad, sobreEscribirActividad, empleados }) => {
  const status = ["COMPLETADO", "EN PROCESO", "NO INICIADO", "EN RIESGO"];

  return (
    <div className="flex gap-2">
      <InputText
        id="actividad"
        placeholder="Nombre actividad"
        value={actividad.name}
        onChange={(e) => {
          sobreEscribirActividad(
            actividad.id_project_activity
              ? actividad.id_project_activity
              : actividad.id_activity,
            "name",
            e.target.value,
          );
        }}
      />

      <Dropdown
        value={actividad.id_employee}
        onChange={(e) => {
          sobreEscribirActividad(
            actividad.id_project_activity
              ? actividad.id_project_activity
              : actividad.id_activity,
            "id_employee",
            e.target.value,
          );
        }}
        options={empleados}
        optionLabel="name"
        optionValue="id_employee"
        placeholder="Responsable"
        className="w-full md:w-14rem"
      />

      <Dropdown
        value={actividad.status}
        onChange={(e) => {
          sobreEscribirActividad(
            actividad.id_project_activity
              ? actividad.id_project_activity
              : actividad.id_activity,
            "status",
            e.target.value,
          );
        }}
        options={status}
        optionLabel="estatus"
        placeholder="Status"
        className="w-full md:w-14rem"
      />

      <FloatLabel>
        <Calendar
          inputId="start_date"
          value={actividad.start_date ? new Date(actividad.start_date) : null}
          onChange={(e) => {
            sobreEscribirActividad(
              actividad.id_project_activity
                ? actividad.id_project_activity
                : actividad.id_activity,
              "start_date",
              e.target.value.toLocaleDateString().split("T")[0],
            );
          }}
        />
        <label htmlFor="start_date">Start date</label>
      </FloatLabel>
      <FloatLabel>
        <Calendar
          inputId="end_date"
          value={actividad.end_date ? new Date(actividad.end_date) : null}
          dateFormat="yy/dd/mm"
          onChange={(e) => {
            sobreEscribirActividad(
              actividad.id_project_activity
                ? actividad.id_project_activity
                : actividad.id_activity,
              "end_date",
              e.target.value.toLocaleDateString().split("T")[0],
            );
          }}
        />
        <label htmlFor="end_date">End date</label>
      </FloatLabel>
    </div>
  );
};

export default FormActividad;
