import axios from "axios";
import { Calendar } from "primereact/calendar";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import React, { useEffect, useRef, useState } from "react";
import { parsearFecha } from "../../../helpers/fechas";
import { useDispatch, useSelector } from "react-redux";
import { activeReload, deactiveReload } from "../../../state/slice/ReloadSlice";

const ModificarActividadModal = ({ visible2, onVisible2 }) => {
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
  const [descripcionActividad, setDescripcionActividad] = useState("");
  const [fechaInicioActividad, setFechaInicioActividad] = useState("");
  const [fechaTerminoActividad, setFechaTerminoActividad] = useState("");
  const [empleado, setEmpleado] = useState(0);
  const [empleados, setEmpleados] = useState([]);

  const resetInputs = () => {
    setActividad({});
    setNombreActividad("");
    setDescripcionActividad("");
    setFechaInicioActividad("");
    setFechaTerminoActividad("");
    setEmpleado(0);
  };

  const modificarActividad = async () => {
    const actividad_req = {
      id_employee: empleado,
      name: nombreActividad,
      description: descripcionActividad,
      start_date:
        String(fechaInicioActividad.getFullYear()).padStart(4, "0") +
        "-" +
        String(fechaInicioActividad.getMonth() + 1).padStart(2, "0") +
        "-" +
        String(fechaInicioActividad.getDate()).padStart(2, "0"),
      end_date:
        String(fechaTerminoActividad.getFullYear()).padStart(4, "0") +
        "-" +
        String(fechaTerminoActividad.getMonth() + 1).padStart(2, "0") +
        "-" +
        String(fechaTerminoActividad.getDate()).padStart(2, "0"),
    };

    try {
      console.log(actividad);
      const response = await axios.patch(
        `http://localhost:3000/activity/update/${actividad.id_activity}`,
        actividad_req,
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
      const response = await axios.get("http://localhost:3000/activity/");

      console.log(response);

      if (response.data.activities.length === 0) {
        return;
      } else setActividades(response.data.activities);
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
              console.log(e.value);
              setActividad(e.value);
              setNombreActividad(e.value.name);
              setDescripcionActividad(e.value.description);
              setEmpleado(e.value.id_employee);
              setFechaInicioActividad(
                new Date(parsearFecha(e.value.start_date)),
              );
              setFechaTerminoActividad(
                new Date(parsearFecha(e.value.end_date)),
              );
            }}
            options={actividades}
            optionLabel="name"
            placeholder="Actividad"
            className="w-full"
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
          <small id="actividad-help">
            Introduce el nombre de la actividad a realizar
          </small>
        </div>
        <div className="flex flex-column gap-2 m-3">
          <label htmlFor="descripcion_actividad">
            Descripción de la actividad
          </label>
          <InputText
            value={descripcionActividad}
            id="descripcion_actividad"
            aria-describedby="descripcion_actividad"
            onChange={(e) => {
              setDescripcionActividad(e.target.value);
            }}
          />
          <small id="descripcion-help">
            Introduce la descripción de la actividad a realizar
          </small>
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
              hideOnDateTimeSelect
            />
            <small id="fecha_inicio-help">
              Introduce la fecha de inicio de la actividad
            </small>
          </div>

          <div className="flex flex-column gap-2 m-3 w-100">
            <label htmlFor="fecha_termino_actividad">Fecha de termino</label>
            <Calendar
              value={fechaTerminoActividad}
              onChange={(e) => setFechaTerminoActividad(new Date(e.value))}
              showTime
              hourFormat="24"
              hideOnDateTimeSelect
            />
            <small id="fecha_termino-help">
              Introduce la fecha de termino de la actividad
            </small>
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

export default ModificarActividadModal;
