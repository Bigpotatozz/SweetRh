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
import actividades from "../../../defaultData/projectActivities";
import { useParams } from "react-router";

const AgregarActividadModalP = ({ visible, onSetFalseModal }) => {
  const status = ["COMPLETADO", "EN PROCESO", "NO INICIADO", "EN RIESGO"];

  const { id } = useParams();
  const reloadReducer = useSelector((state) => state.reload);
  const dispatch = useDispatch();

  const [actividadesRapidas, setActividadesRapidas] = useState(actividades);

  const [actividadRapida, setActividadRapida] = useState({ name: "" });
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
  const [fechaInicio, setFechaInicio] = useState(null);
  const [fechaTermino, setFechaTermino] = useState(null);
  const [estatus, setEstatus] = useState(null);
  const [empleados, setEmpleados] = useState([]);
  const [empleado, setEmpleado] = useState(null);

  const registrarActividad = async () => {
    const actividad = {
      name: nombreActividad,
      start_date: fechaInicio
        ? String(fechaInicio.getFullYear()).padStart(4, "0") +
          "-" +
          String(fechaInicio.getMonth() + 1).padStart(2, "0") +
          "-" +
          String(fechaInicio.getDate()).padStart(2, "0")
        : null,
      end_date: fechaTermino
        ? String(fechaTermino.getFullYear()).padStart(4, "0") +
          "-" +
          String(fechaTermino.getMonth() + 1).padStart(2, "0") +
          "-" +
          String(fechaTermino.getDate()).padStart(2, "0")
        : null,
      id_employee: empleado,
      status: estatus,
      id_project: id,
    };

    try {
      const response = await axios.post(
        "http://localhost:3000/projectActivities/create",
        actividad,
      );

      showSuccess();
      console.log(response);
      onSetFalseModal();
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
        header="Agregar actividad de proyecto"
        visible={visible}
        style={{ width: "50vw" }}
        onHide={() => {
          if (!visible) return;
          onSetFalseModal();
        }}
      >
        <div className="flex gap-2 justify-between m-3">
          <Dropdown
            value={actividadRapida}
            onChange={(e) => {
              setActividadRapida(e.target.value);
              setNombreActividad(e.target.value);
            }}
            options={actividadesRapidas}
            optionValue="name"
            optionLabel="name"
            placeholder="Creacion rapida"
            className="w-full"
          />
        </div>
        <div className="flex flex-column gap-2 m-3">
          <label htmlFor="actividad">Nombre de la actividad</label>
          <InputText
            id="actividad"
            value={nombreActividad}
            aria-describedby="nombre_actividad"
            onChange={(e) => {
              setNombreActividad(e.target.value);
            }}
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
          />
        </div>
        <div className="flex gap-2 justify-between m-3">
          <Dropdown
            value={estatus}
            onChange={(e) => setEstatus(e.value)}
            options={status}
            placeholder="Estatus de la actividad"
            className="w-full"
          />
        </div>
        <div className="flex gap-2 justify-between">
          <div className="flex flex-column gap-2 m-3 w-100">
            <label htmlFor="fecha_inicio_actividad">Fecha de inicio</label>
            <Calendar
              value={fechaInicio}
              onChange={(e) => setFechaInicio(new Date(e.value))}
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
              value={fechaTermino}
              onChange={(e) => setFechaTermino(new Date(e.value))}
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
            severity="danger"
            className="w-110"
            onClick={onSetFalseModal}
          />
        </div>
      </Dialog>
    </div>
  );
};

export default AgregarActividadModalP;
