import axios from "axios";
import { Calendar } from "primereact/calendar";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { activeReload, deactiveReload } from "../../../state/slice/ReloadSlice";
import { useParams } from "react-router";

const ModificarActividadPModal = ({ visible2, onVisible2 }) => {
  const status = ["COMPLETADO", "EN PROCESO", "NO INICIADO", "EN RIESGO"];
  const { id } = useParams();
  const reloadReducer = useSelector((state) => state.reload);
  const dispatch = useDispatch();
  const toastSuccess = useRef(null);

  const showSuccess = () => {
    toastSuccess.current.show({
      severity: "success",
      summary: "Actividad Modificada",
      detail: "Actividad registrada correctamente",
    });
  };

  const [actividades, setActividades] = useState([]);
  const [actividad, setActividad] = useState({});
  const [nombreActividad, setNombreActividad] = useState();
  const [fechaInicioActividad, setFechaInicioActividad] = useState("");
  const [fechaTerminoActividad, setFechaTerminoActividad] = useState("");
  const [estatus, setEstatus] = useState("");
  const [empleado, setEmpleado] = useState(0);
  const [empleados, setEmpleados] = useState([]);

  const resetInputs = () => {
    setActividad({});
    setNombreActividad("");
    setFechaInicioActividad("");
    setFechaTerminoActividad("");
    setEmpleado(0);
  };

  const modificarActividad = async () => {
    try {
      console.log(actividad);
      const response = await axios.patch(
        `http://localhost:3000/projectActivities/update/${actividad.id_project_activity}`,
        {
          id_employee: empleado,
          name: nombreActividad,
          description: "",
          start_date: fechaInicioActividad
            ? String(fechaInicioActividad.getFullYear()).padStart(4, "0") +
              "-" +
              String(fechaInicioActividad.getMonth() + 1).padStart(2, "0") +
              "-" +
              String(fechaInicioActividad.getDate()).padStart(2, "0")
            : null,
          end_date: fechaTerminoActividad
            ? String(fechaTerminoActividad.getFullYear()).padStart(4, "0") +
              "-" +
              String(fechaTerminoActividad.getMonth() + 1).padStart(2, "0") +
              "-" +
              String(fechaTerminoActividad.getDate()).padStart(2, "0")
            : null,
          status: estatus,
          id_project: id,
        },
      );

      showSuccess();
      console.log(response);
      onVisible2();

      resetInputs();
      dispatch(activeReload());
    } catch (e) {
      console.log(e);
    }
  };

  const obtenerEmpleados = async () => {
    try {
      const response = await axios.get("http://localhost:3000/employee/list");
      setEmpleados(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  const obtenerActividades = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/projectActivities/findActivitiesByProject/${id}`,
      );

      console.log(response);

      if (response.data.status === 404) {
        return;
      }
      setActividades(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    (async () => {
      await obtenerActividades();
      await obtenerEmpleados();
      dispatch(deactiveReload());
    })();
  }, [reloadReducer]);

  useEffect(() => {
    (async () => {
      await obtenerEmpleados();
      await obtenerActividades();
    })();
  }, []);

  return (
    <div>
      <Toast ref={toastSuccess} />
      <Dialog
        header="Modificar actividad"
        visible={visible2}
        style={{ width: "50vw" }}
        onHide={() => {
          if (!visible2) return;
          onVisible2();
        }}
      >
        <div className="flex flex-column gap-2 m-3">
          <Dropdown
            value={actividad}
            onChange={(e) => {
              setActividad(e.value);
              setNombreActividad(e.value.name);
              setEmpleado(e.value.id_employee);
              setFechaInicioActividad(
                e.value.start_date ? new Date(e.value.start_date) : null,
              );
              setFechaTerminoActividad(
                e.value.end_date ? new Date(e.value.end_date) : null,
              );

              setEstatus(e.value.status);
            }}
            options={actividades}
            optionLabel="name"
            placeholder="Actividad"
            className="w-full"
            appendTo="self"
          />
        </div>

        <div className="flex flex-column gap-2 m-3">
          <label htmlFor="actividad">Nombre de la actividad</label>
          <InputText
            value={nombreActividad}
            id="actividad"
            aria-describedby="nombre_actividad"
            onChange={(e) => {
              setNombreActividad(e.target.value);
            }}
          />
        </div>

        <div className="flex flex-column gap-2 m-3">
          <label htmlFor="estatus">Estatus:</label>
          <Dropdown
            value={estatus}
            onChange={(e) => {
              setEstatus(e.value);
            }}
            options={status}
            optionLabel="estatus"
            placeholder="Estatus"
            className="w-full"
            appendTo="self"
          />
        </div>

        <div className="flex gap-2 justify-between m-3">
          <Dropdown
            value={empleado}
            onChange={(e) => setEmpleado(e.value)}
            options={empleados}
            optionValue="id_employee"
            optionLabel="name"
            placeholder="Responsable"
            className="w-full"
            appendTo="self"
          />
        </div>
        <div className="flex gap-2 justify-between">
          <div className="flex flex-column gap-2 m-3 w-100">
            <label htmlFor="fecha_inicio_actividad">Fecha de inicio</label>
            <Calendar
              value={fechaInicioActividad}
              onChange={(e) => setFechaInicioActividad(new Date(e.value))}
              showTime
              hourFormat="24"
            />
          </div>

          <div className="flex flex-column gap-2 m-3 w-100">
            <label htmlFor="fecha_termino_actividad">Fecha de termino</label>
            <Calendar
              value={fechaTerminoActividad}
              onChange={(e) => setFechaTerminoActividad(new Date(e.value))}
              showTime
              hourFormat="24"
            />
          </div>
        </div>

        <div className="flex gap-5 justify-center m-3">
          <Button
            label="Modificar"
            severity="info"
            className="w-110"
            onClick={() => {
              modificarActividad();
            }}
          />

          <Button
            label="Cancelar"
            severity="secondary"
            className="w-110"
            onClick={onVisible2}
          />
        </div>
      </Dialog>
    </div>
  );
};

export default ModificarActividadPModal;
