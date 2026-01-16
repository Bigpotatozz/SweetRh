import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { activeReload, deactiveReload } from "../../../state/slice/ReloadSlice";
import { Toast } from "primereact/toast";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

const EditarEmpleadoModal = ({ visible2, onVisible2, id }) => {
  const [empleado, setEmpleado] = useState({
    id_employee: 0,
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

  const obtenerEmpleado = async (id) => {
    try {
      const response = await axios.get(`http://localhost:3000/employee/${id}`);
      console.log(response.data);
      setEmpleado(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  const modificarEmpleado = async (id) => {
    try {
      const response = await axios.patch(
        `http://localhost:3000/employee/update/${id}`,
        {
          name: empleado.name,
          position: empleado.position,
        }
      );

      showSuccess();
      onVisible2();
      dispatch(activeReload());
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    obtenerEmpleado(id);
    dispatch(deactiveReload());
  }, [reloadReducer]);

  useEffect(() => {
    (async () => {
      obtenerEmpleado(id);
    })();
  }, [id, visible2]);
  return (
    <div>
      <Toast ref={toastSuccess} />
      <Dialog
        header="Editar información"
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
            label="Editar"
            severity="primary"
            className="w-110"
            onClick={() => {
              modificarEmpleado(id);
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

export default EditarEmpleadoModal;
