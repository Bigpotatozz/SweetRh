import React, { useEffect, useRef, useState } from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";
import { Toast } from "primereact/toast";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useDispatch, useSelector } from "react-redux";
import { activeReload, deactiveReload } from "../../state/slice/ReloadSlice";
import axios from "axios";

const ActividadesRaiddModal = ({ visible2, onVisible2, idRaidd }) => {
  //Reload reducer
  const reloadReducer = useSelector((state) => state.reload);
  //Dispatch
  const dispatch = useDispatch();
  //Toast
  const toast = useRef(null);

  //Contenedor de actividades api
  const [actividades, setActividades] = useState([]);
  //Contenedor de empleados api
  const [empleados, setEmpleados] = useState([]);
  //estado de carga
  const [loading, setLoading] = useState(false);

  //contenedor de la nueva actividad
  const [nuevaActividad, setNuevaActividad] = useState({
    id_ingeniero: null,
    comentarios: "",
    fecha_compromiso: null,
  });

  //Funcion que muestra el toast al agregar actividades
  const showToast = (severity, summary, detail) => {
    toast.current.show({ severity, summary, detail });
  };

  //Llamada a api para obtener las actividades de ese
  const obtenerActividades = async (id) => {
    try {
      //Antes de obtenerlas se activa el estado de carga
      setLoading(true);
      //Se realiza la peticion
      const response = await axios.get(
        `http://localhost:3000/raidd/findActivitiesByRaidd/${id}`,
      );
      //Se guardan las actividades en el contenedor y se parsean las fechas
      setActividades(
        response.data.map((actividad) => ({
          ...actividad,
          fecha_compromiso: actividad.fecha_compromiso
            ? actividad.fecha_compromiso.split("T")[0]
            : null,
          createdAt: actividad.createdAt
            ? actividad.createdAt.split("T")[0]
            : null,
        })),
      );
    } catch (e) {
      console.error("Error al obtener actividades:", e);
    } finally {
      setLoading(false);
    }
  };

  //Funcion para obtener empleados registrados
  const obtenerEmpleados = async () => {
    try {
      const response = await axios.get("http://localhost:3000/employee/list");
      setEmpleados(response.data);
    } catch (e) {
      console.error("Error al obtener empleados:", e);
    }
  };

  //Funcion que registra la actividad
  const registrarActividad = async () => {
    //Validacion de todos los campos
    if (
      !nuevaActividad.id_ingeniero ||
      !nuevaActividad.comentarios ||
      !nuevaActividad.fecha_compromiso
    ) {
      showToast(
        "warn",
        "Campos incompletos",
        "Por favor completa todos los campos",
      );
      return;
    }

    try {
      //Se forma el objeto que se va a enviar en la peticion
      const payload = {
        id_employee: nuevaActividad.id_ingeniero,
        comentarios: nuevaActividad.comentarios,
        fecha_compromiso: nuevaActividad.fecha_compromiso
          .toISOString()
          .split("T")[0], //Se le da formato a la fecha
        id_raidd: idRaidd,
      };

      //Se realiza la peticion
      await axios.post("http://localhost:3000/action/createAction", payload);

      //Se muestra el toast
      showToast("success", "Éxito", "Actividad agregada correctamente");
      //Se limpia el formulario
      setNuevaActividad({
        id_ingeniero: null,
        comentarios: "",
        fecha_compromiso: null,
      });
      //Se vuelven a obtener las actividades
      obtenerActividades(idRaidd);
      dispatch(activeReload());
    } catch (e) {
      console.error("Error al registrar actividad:", e);
      showToast("error", "Error", "No se pudo registrar la actividad");
    }
  };

  //Funcion que elimina la actividad
  const handleDelete = async (rowData) => {
    try {
      await axios.delete(
        `http://localhost:3000/action/deleteAction/${rowData.id_action}`,
      );
      showToast("success", "Éxito", "Actividad eliminada correctamente");
      obtenerActividades(idRaidd);
      dispatch(activeReload());
    } catch (e) {
      console.error("Error al eliminar actividad:", e);
      showToast("error", "Error", "No se pudo eliminar la actividad");
    }
  };
  //Obtiene al cargar las actividades y los empleados
  useEffect(() => {
    if (visible2 && idRaidd) {
      obtenerActividades(idRaidd);
      obtenerEmpleados();
    }
  }, [visible2, idRaidd]);

  return (
    <div>
      <Toast ref={toast} />
      <Dialog
        header={`Actividades RAIDD - ${idRaidd}`}
        visible={visible2}
        style={{ width: "70vw" }}
        onHide={() => onVisible2()}
      >
        <div className="grid">
          <div className="col-12 p-3 surface-ground border-round mb-4">
            <div className="flex flex-wrap gap-3 align-items-end">
              <div className="flex-1">
                <label className="block mb-2">Responsable</label>
                <Dropdown
                  value={nuevaActividad.id_ingeniero}
                  options={empleados}
                  onChange={(e) =>
                    setNuevaActividad({
                      ...nuevaActividad,
                      id_ingeniero: e.value,
                    })
                  }
                  optionLabel="name"
                  optionValue="id_employee"
                  placeholder="Seleccionar Ingeniero"
                  className="w-full"
                />
              </div>
              <div className="flex-1">
                <label className="block mb-2">Fecha Compromiso</label>
                <Calendar
                  value={nuevaActividad.fecha_compromiso}
                  onChange={(e) =>
                    setNuevaActividad({
                      ...nuevaActividad,
                      fecha_compromiso: e.value,
                    })
                  }
                  dateFormat="dd-mm-yy"
                  placeholder="Seleccionar Fecha"
                  className="w-full"
                  showIcon
                />
              </div>
              <div
                className="flex-2 w-full md:w-auto"
                style={{ minWidth: "300px" }}
              >
                <label className="block mb-2">Comentarios / Acciones</label>
                <InputText
                  value={nuevaActividad.comentarios}
                  onChange={(e) =>
                    setNuevaActividad({
                      ...nuevaActividad,
                      comentarios: e.target.value,
                    })
                  }
                  placeholder="Descripción de la actividad"
                  className="w-full"
                />
              </div>
              <Button
                label="Agregar"
                icon="pi pi-plus"
                onClick={registrarActividad}
                severity="success"
              />
            </div>
          </div>

          <div className="col-12">
            <DataTable
              value={actividades}
              loading={loading}
              emptyMessage="No hay actividades registradas para este RAIDD."
              stripedRows
              size="small"
            >
              <Column field="id_action" header="ID" style={{ width: "50px" }} />
              <Column field="employee.name" header="Responsable" sortable />
              <Column field="comentarios" header="Comentarios" />
              <Column
                field="fecha_compromiso"
                header="Fecha Compromiso"
                sortable
              />
              <Column field="createdAt" header="Fecha Registro" sortable />

              <Column
                header="Acciones"
                body={(rowData) => (
                  <div className="flex gap-2">
                    <Button
                      icon="pi pi-trash"
                      rounded
                      text
                      severity="danger"
                      tooltip="Eliminar"
                      tooltipOptions={{ position: "top" }}
                      onClick={() => handleDelete(rowData)}
                    />
                  </div>
                )}
                style={{ width: "100px" }}
              />
            </DataTable>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default ActividadesRaiddModal;
