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
import AgregarActividadModalP from "./AgregarActividadModalP";
import { deactiveReload } from "../../../state/slice/ReloadSlice";
import { useDispatch, useSelector } from "react-redux";
const ProyectoView = () => {
  const { id } = useParams();
  const toastSuccess = useRef(null);

  const reloadReducer = useSelector((state) => state.reload);
  const dispatch = useDispatch();
  const [contadorAct, setContadorAct] = useState(0);
  const [proyecto, setProyecto] = useState({});

  const [visible, setVisible] = useState(false);

  const onSetVisible = () => {
    setVisible(false);
  };

  const [actividades, setActividades] = useState([
    {
      id_activity: contadorAct,
      name: "",
      description: "",
      start_date: null,
      end_date: null,
      status: "",
      id_employee: "",
      id_project: id,
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
    obtenerActividades();
    dispatch(deactiveReload());
  }, [reloadReducer]);

  useEffect(() => {
    console.log(actividades);
  }, [actividades]);

  return (
    <div className="w-full h-full overflow-hidden">
      <AgregarActividadModalP
        visible={visible}
        onSetFalseModal={onSetVisible}
      ></AgregarActividadModalP>
      <Toast ref={toastSuccess} />
      <div
        className="flex justify-between w-full"
        style={{ borderColor: "#ECECEC" }}
      >
        <div className="w-full flex gap-3 p-2 items-center">
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
        <div className="flex gap-2 p-2">
          <Button
            icon="pi pi-plus"
            aria-label="Filter"
            severity="success"
            onClick={() => {
              setVisible(true);
            }}
          />
          <Button
            icon="pi pi-pen-to-square"
            aria-label="Filter"
            severity="primary"
          />
          <Button icon="pi pi-trash" aria-label="Filter" severity="danger" />
        </div>
      </div>

      <div id="map" className="w-full">
        <GanttTable actividades={actividades}></GanttTable>
      </div>
    </div>
  );
};

export default ProyectoView;
