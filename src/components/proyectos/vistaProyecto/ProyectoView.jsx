import axios from "axios";
import { Dropdown } from "primereact/dropdown";
import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import CalendarioProyecto from "./CalendarioProyecto";
import { Calendar } from "primereact/calendar";
import FormActividad from "./FormActividad";
import { Button } from "primereact/button";

const ProyectoView = () => {
  const { id } = useParams();

  const [proyecto, setProyecto] = useState({});

  const [actividades, setActividades] = useState([
    {
      id: 1,
      nombre: "",
      descripcion: "",
      fechaInicio: "",
      fechaFin: "",
      estatus: "",
      id_employee: "",
    },
  ]);

  const [ingenieros, setIngenieros] = useState(["GIOVANNI", "JUAN", "PEDRO"]);
  const [ingeniero, setIngeniero] = useState("");

  const [value, setValue] = useState("");

  const sobreEscribirActividad = (id, elemento, value) => {
    setActividades(
      actividades.map((actividad) =>
        actividad.id == id ? { ...actividad, [elemento]: value } : actividad,
      ),
    );
  };

  const obtenerProyecto = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/project/${id}`);
      console.log(response.data);

      setProyecto(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    obtenerProyecto();
  }, []);

  useEffect(() => {
    console.log(actividades);
  }, [actividades]);
  return (
    <div className="w-full">
      <div className="w-full flex gap-3">
        <h2>
          <strong>Proyecto: </strong>
          {proyecto.name}
        </h2>
        <h2>
          <strong>Responsable:</strong> {proyecto.id_employee}
        </h2>
        <h2>
          <strong>Cliente:</strong> {proyecto.client}
        </h2>
        <h2>
          <strong>Descripción:</strong> {proyecto.description}
        </h2>
      </div>
      <div className="flex gap-2 mb-2">
        {actividades.map((e) => {
          return (
            <>
              <FormActividad
                actividad={e}
                key={e.id}
                empleados={ingenieros}
                sobreEscribirActividad={sobreEscribirActividad}
              ></FormActividad>
            </>
          );
        })}
      </div>

      <div className="flex justify-center m-2 radius">
        <Button
          icon="pi pi-plus-circle"
          style={{ borderRadius: "100%" }}
          onClick={() => {}}
        />
      </div>
      <div id="map" className="w-full">
        <CalendarioProyecto></CalendarioProyecto>
      </div>
    </div>
  );
};

export default ProyectoView;
