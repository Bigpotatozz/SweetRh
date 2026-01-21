import axios from "axios";
import { Dropdown } from "primereact/dropdown";
import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import CalendarioProyecto from "./CalendarioProyecto";
import { Calendar } from "primereact/calendar";
import FormActividad from "./FormActividad";
import { Button } from "primereact/button";
import { TabView, TabPanel } from "primereact/tabview";
import { Divider } from "primereact/divider";
import { Toast } from "primereact/toast";
import { ScrollPanel } from "primereact/scrollpanel";
import GanttTable from "./GanttTable";
const ProyectoView = () => {
  const { id } = useParams();
  const toastSuccess = useRef(null);

  const [proyecto, setProyecto] = useState({});

  const [actividades, setActividades] = useState([
    {
      id_activity: 1,
      name: "",
      description: "",
      start_date: "",
      end_date: "",
      status: "",
      id_employee: "",
    },
  ]);

  const [ingenieros, setIngenieros] = useState([]);
  const [ingeniero, setIngeniero] = useState("");

  const [value, setValue] = useState("");

  const showSuccess = () => {
    toastSuccess.current.show({
      severity: "success",
      summary: "Contrato Registrado",
      detail: "Contrato registrado correctamente",
    });
  };
  const sobreEscribirActividad = (id, elemento, value) => {
    setActividades(
      actividades.map((actividad) =>
        actividad.id_project_activity == id
          ? { ...actividad, [elemento]: value }
          : actividad,
      ),
    );
  };

  const obtenerEmpleados = async () => {
    try {
      const response = await axios.get("http://localhost:3000/employee/list");
      console.log(response.data);
      setIngenieros(response.data);
    } catch (e) {
      console.log(e);
    }
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

  const registrarActividades = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/projectActivities/smartAddActivity",

        actividades,
      );

      console.log(response);

      showSuccess();
    } catch (e) {
      console.log(e);
    }
  };

  const obtenerActividades = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/projectActivities/findActivitiesByProject/${id}`,
      );

      if (response.data.status) {
        return;
      }

      setActividades(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    obtenerProyecto();
    obtenerEmpleados();
    obtenerActividades();

    console.log(actividades);
  }, []);

  useEffect(() => {
    console.log(actividades);
  }, [actividades]);

  return (
    <div className="w-full">
      <Toast ref={toastSuccess} />
      <div className="w-full flex gap-3 ">
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

      <TabView>
        <TabPanel header="Actividades">
          <div className="flex flex-column items-center">
            <ScrollPanel className="w-full h-screen">
              {actividades.map((e) => {
                return (
                  <>
                    <FormActividad
                      actividad={e}
                      key={e.id_activity}
                      empleados={ingenieros}
                      sobreEscribirActividad={sobreEscribirActividad}
                    ></FormActividad>

                    <Divider></Divider>
                  </>
                );
              })}

              <div className="flex justify-center m-2 radius gap-2">
                <Button
                  icon="pi pi-plus-circle"
                  style={{ borderRadius: "100%" }}
                  onClick={() => {
                    setActividades([...actividades, { id_project: id }]);
                  }}
                />

                <Button
                  icon="pi pi-save"
                  severity="success"
                  style={{ borderRadius: "100%" }}
                  onClick={() => {
                    registrarActividades();
                  }}
                />
              </div>
            </ScrollPanel>
          </div>
        </TabPanel>

        <TabPanel header="Calendario">
          <div id="map" className="w-full">
            <GanttTable></GanttTable>
          </div>
        </TabPanel>
      </TabView>
    </div>
  );
};

export default ProyectoView;
