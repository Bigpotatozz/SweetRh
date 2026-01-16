import axios from "axios";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { activeReload, deactiveReload } from "../../../state/slice/ReloadSlice";
import { Toast } from "primereact/toast";

const AgregarEmpleadoModal = ({ visible2, onVisible2 }) => {
  const [empleado, setEmpleado] = useState({
    name: "",
    position: "",
  });

  const toastSuccess = useRef(null);

  const reloadReducer = useSelector((state) => state.reload);
  const dispatch = useDispatch();

  const showSuccess = () => {
    toastSuccess.current.show({
      severity: "success",
      summary: "Persona registrada",
      detail: "Persona registrada correctamente en el sistema",
    });
  };

  const registrarEmpleado = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/employee/register",
        empleado
      );
      console.log(response);

      showSuccess();
      onVisible2();
      dispatch(activeReload());
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    dispatch(deactiveReload());
  }, [reloadReducer]);
  return (
    <div>
      <Toast ref={toastSuccess} />
      <Dialog
        header="Registrar contrato"
        visible={visible2}
        style={{ width: "50vw" }}
        onHide={() => {
          if (!visible2) return;
          onVisible2();
        }}
      >
        <h2 className="font-bold">Información de la persona</h2>
        <div className="flex flex-column p-2 gap-3">
          <div className="flex flex-column w-full mt-2">
            <label htmlFor="actividad">Nombre</label>
            <InputText
              value={empleado.name}
              id="name"
              aria-describedby="Nombre"
              onChange={(e) => {
                const object = { ...empleado };
                object.name = e.target.value;
                setEmpleado(object);
              }}
            />
          </div>
          <div className="flex flex-column w-full">
            <label htmlFor="actividad">Puesto</label>
            <InputText
              value={empleado.position}
              id="position"
              aria-describedby="Puesto"
              onChange={(e) => {
                const object = { ...empleado };
                object.position = e.target.value;
                setEmpleado(object);
              }}
            />
          </div>
        </div>

        <div className="flex gap-2 justify-center m-2">
          <Button
            label="Registrar"
            severity="success"
            className="w-110"
            onClick={() => {
              registrarEmpleado();
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

export default AgregarEmpleadoModal;
