import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { activeReload, deactiveReload } from "../../state/slice/ReloadSlice";
import { parsearFecha } from "../../helpers/fechas";
import { Toast } from "primereact/toast";
import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { Calendar } from "lucide-react";
import { Button } from "primereact/button";

const EditarContratoModal = ({ visible2, onVisible2, idContrato }) => {
  const reloadReducer = useSelector((state) => state.reload);
  const dispatch = useDispatch();
  const toastSuccess = useRef(null);

  const [contract, setContract] = useState({});

  const showSuccess = () => {
    toastSuccess.current.show({
      severity: "success",
      summary: "Actividad Modificada",
      detail: "Actividad registrada correctamente",
    });
  };

  const obtenerContrato = async (idContrato) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/contract/${idContrato}`
      );
      setContract(response.data);
      console.log(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    (async () => {
      dispatch(deactiveReload());
    })();
  }, [reloadReducer]);

  useEffect(() => {
    (async () => {
      obtenerContrato(idContrato);
    })();
  }, [idContrato, visible2]);

  return (
    <div>
      <Toast ref={toastSuccess} />
      <Dialog
        header="Editar contrato"
        visible={visible2}
        style={{ width: "50vw" }}
        onHide={() => {
          if (!visible2) return;
          onVisible2();
        }}
      >
        <div className="flex flex-column gap-2 m-3"></div>

        <div className="flex flex-column gap-2 m-3">
          <label htmlFor="actividad">Nombre de la actividad</label>
          <InputText
            value={contract.contract_number}
            id="actividad"
            aria-describedby="nombre_actividad"
            onChange={(e) => {
              console.log(e);
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
            value={contract.po_date}
            id="descripcion_actividad"
            aria-describedby="descripcion_actividad"
            onChange={(e) => {
              console.log(e);
            }}
          />
          <small id="descripcion-help">
            Introduce la descripción de la actividad a realizar
          </small>
        </div>

        <div className="flex gap-5 justify-center m-3">
          <Button
            label="Modificar"
            severity="info"
            className="w-110"
            onClick={() => {}}
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

export default EditarContratoModal;
