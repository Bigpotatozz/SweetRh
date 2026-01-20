import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";
import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";
import React from "react";

const FormActividad = ({ actividad, sobreEscribirActividad, empleados }) => {
  const status = ["ENTREGADO", "NO ENTREGADO", "EN PROCESO"];

  return (
    <div className="flex gap-2">
      <FloatLabel>
        <InputText
          id="actividad"
          value={actividad.nombre}
          onChange={(e) => {
            sobreEscribirActividad(actividad.id, "nombre", e.target.value);
          }}
        />
        <label htmlFor="actividad">Nombre actividad</label>
      </FloatLabel>
      <FloatLabel>
        <InputText
          id="descripcion"
          value={actividad.descripcion}
          onChange={(e) => {
            sobreEscribirActividad(actividad.id, "descripcion", e.target.value);
          }}
        />
        <label htmlFor="descripcion">Descripcion</label>
      </FloatLabel>

      <Dropdown
        value={actividad.id_employee}
        onChange={(e) => {
          sobreEscribirActividad(actividad.id, "id_employee", e.target.value);
        }}
        options={empleados}
        optionLabel="responsable"
        placeholder="Responsable"
        className="w-full md:w-14rem"
      />

      <Dropdown
        value={actividad.estatus}
        onChange={(e) => {
          sobreEscribirActividad(actividad.id, "estatus", e.target.value);
        }}
        options={status}
        optionLabel="estatus"
        placeholder="Status"
        className="w-full md:w-14rem"
      />

      <FloatLabel>
        <Calendar
          inputId="start_date"
          value={actividad.fechaInicio ? new Date(actividad.fechaInicio) : null}
          onChange={(e) => {
            sobreEscribirActividad(actividad.id, "fechaInicio", e.target.value);
          }}
        />
        <label htmlFor="start_date">Start date</label>
      </FloatLabel>
      <FloatLabel>
        <Calendar
          inputId="end_date"
          value={actividad.fechaFin ? new Date(actividad.fechaFin) : null}
          onChange={(e) => {
            sobreEscribirActividad(actividad.id, "fechaFin", e.target.value);
          }}
        />
        <label htmlFor="end_date">End date</label>
      </FloatLabel>
    </div>
  );
};

export default FormActividad;
