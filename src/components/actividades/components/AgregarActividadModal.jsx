import axios, { Axios } from "axios";
import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { activeReload } from "../../../state/slice/ReloadSlice";

const AgregarActividadModal = ({ visible, onSetFalseModal }) => {
  const reloadReducer = useSelector((state) => state.reload);
  const dispatch = useDispatch();

  const handleReload = () => {
    dispatch(activeReload());
  };

  const toastSuccess = useRef(null);

  const showSuccess = () => {
    toastSuccess.current.show({
      severity: "success",
      summary: "Actividad registrada",
      detail: "Actividad registrada correctamente",
    });
  };

  const [nombreActividad, setNombreActividad] = useState("");
  const [descripcionActividad, setDescripcionActividad] = useState("");
  const [fechaInicioActividad, setFechaInicioActividad] = useState("");
  const [fechaTerminoActividad, setFechaTerminoActividad] = useState("");
  const [empleado, setEmpleado] = useState(0);
  const [empleados, setEmpleados] = useState([]);

  const resetInputs = () => {
    setNombreActividad("");
    setDescripcionActividad("");
    setFechaInicioActividad("");
    setFechaTerminoActividad("");
    setEmpleado(0);
  };

  const registrarActividad = async () => {
    const actividad = {
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
      const response = await axios.post(
        "http://localhost:3000/activity/create",
        actividad
      );

      showSuccess();
      console.log(response);
      onSetFalseModal();
      resetInputs();
      handleReload();
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

  useEffect(() => {
    (async () => {
      await obtenerEmpleados();
    })();
  }, [visible]);
  return (
    <div>
      <Toast ref={toastSuccess} />
      <Dialog
        header="Agregar actividad"
        visible={visible}
        style={{ width: "50vw" }}
        onHide={() => {
          if (!visible) return;
          onSetFalseModal();
        }}
      >
        <div className="flex flex-column gap-2 m-3">
          <label htmlFor="actividad">Nombre de la actividad</label>
          <InputText
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
            />
            <small id="fecha_termino-help">
              Introduce la fecha de termino de la actividad
            </small>
          </div>
        </div>

        <div className="flex gap-5 justify-center m-3">
          <Button
            label="Registrar"
            severity="success"
            className="w-110"
            onClick={registrarActividad}
          />

          <Button
            label="Cancelar"
            severity="info"
            className="w-110"
            onClick={onSetFalseModal}
          />
        </div>
      </Dialog>
    </div>
  );
};

export default AgregarActividadModal;
