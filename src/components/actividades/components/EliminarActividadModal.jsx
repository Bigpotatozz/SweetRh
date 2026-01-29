import axios from "axios";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";
import { Toast } from "primereact/toast";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { activeReload, deactiveReload } from "../../../state/slice/ReloadSlice";

const EliminarActividadModal = ({ visible3, onVisible3 }) => {
  const reloadReducer = useSelector((state) => state.reload);
  const dispatch = useDispatch();

  const toastSuccess = useRef(null);

  const showSuccess = () => {
    toastSuccess.current.show({
      severity: "warn",
      summary: "Actividad Eliminada",
      detail: "Actividad eliminada correctamente",
    });
  };

  const [actividad, setActividad] = useState(0);
  const [actividades, setActividades] = useState([]);

  const obtenerActividades = async () => {
    const response = await axios.get(`http://localhost:3000/activity/`);
    console.log(response);

    setActividades(response.data.activities);
  };

  const eliminarActividad = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/activity/delete/${actividad}`,
      );
      console.log(response);

      onVisible3();
      showSuccess();

      dispatch(activeReload());
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    (async () => {
      await obtenerActividades();
      dispatch(deactiveReload());
    })();
  }, [reloadReducer]);

  useEffect(() => {
    (async () => {
      await obtenerActividades();
    })();
  }, []);
  return (
    <div>
      <Toast ref={toastSuccess} />
      <Dialog
        header="Agregar actividad"
        visible={visible3}
        style={{ width: "50vw" }}
        onHide={() => {
          if (!visible3) return;
          onVisible3();
        }}
      >
        <div className="flex gap-2 justify-between m-3">
          <Dropdown
            value={actividad}
            onChange={(e) => setActividad(e.value)}
            options={actividades}
            optionValue="id_activity"
            optionLabel="name"
            placeholder="Actividad"
            className="w-full"
          />
        </div>

        <div className="flex gap-5 justify-center m-3">
          <Button
            label="Eliminar"
            severity="danger"
            className="w-110"
            onClick={eliminarActividad}
          />

          <Button
            label="Cancelar"
            severity="info"
            className="w-110"
            onClick={onVisible3}
          />
        </div>
      </Dialog>
    </div>
  );
};

export default EliminarActividadModal;
