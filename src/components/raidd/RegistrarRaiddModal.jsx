import React, { useEffect, useRef, useState } from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";
import { Toast } from "primereact/toast";
import { useDispatch, useSelector } from "react-redux";
import { activeReload, deactiveReload } from "../../state/slice/ReloadSlice";
import axios from "axios";

const RegistrarRaiddModal = ({ visible2, onVisible2 }) => {
  const reloadReducer = useSelector((state) => state.reload);
  const dispatch = useDispatch();
  const toastSuccess = useRef(null);

  const [contratos, setContratos] = useState([]);
  const [contrato, setContrato] = useState(0);

  const [raidd, setRaidd] = useState({
    cota: "",
    usuario: "",
    tiempo_entrega: "",
    duracion: "",
    inicio: "",
    id_contract: 0,
  });

  const showSuccess = () => {
    toastSuccess.current.show({
      severity: "success",
      summary: "RAIDD Registrado",
      detail: "RAIDD registrado correctamente",
    });
  };

  const limpiarCampos = () => {
    setRaidd({
      cota: "",
      usuario: "",
      tiempo_entrega: "",
      duracion: "",
      inicio: "",
      id_contract: 0,
    });
  };

  const obtenerContratos = async () => {
    try {
      const response = await axios.get("http://localhost:3000/contract/");
      setContratos(response.data);
      console.log(response.data);
    } catch (e) {
      console.log(e);
    }
  };
  const registrarInformacion = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/raidd/createRaidd",
        {
          cota: raidd.cota,
          usuario: raidd.usuario,
          tiempo_entrega: raidd.tiempo_entrega,
          duracion: raidd.duracion,
          inicio: raidd.inicio.toISOString().split("T")[0],
          id_contract: raidd.id_contract,
        },
      );

      console.log(response);
      console.log("Registrando RAIDD:", raidd);
      onVisible2();
      showSuccess();
      dispatch(activeReload());
      limpiarCampos();
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    setRaidd({ ...raidd, id_contract: contrato });
  }, [contrato]);

  useEffect(() => {
    obtenerContratos();
    dispatch(deactiveReload());
  }, [reloadReducer, dispatch]);

  return (
    <div>
      <Toast ref={toastSuccess} />
      <Dialog
        header="Registrar RAIDD"
        visible={visible2}
        style={{ width: "50vw" }}
        onHide={() => {
          if (!visible2) return;
          onVisible2();
        }}
      >
        <div className="flex gap-2 justify-between m-3">
          <Dropdown
            value={contrato}
            onChange={(e) => setContrato(e.value)}
            options={contratos}
            optionValue="id_contract"
            optionLabel="contract_number"
            placeholder="Contrato"
            className="w-full"
          />
        </div>

        <div className="flex ">
          <div className="flex flex-column gap-2 m-3 w-full">
            <InputText
              placeholder="Cota"
              id="cota"
              value={raidd.cota}
              onChange={(e) => setRaidd({ ...raidd, cota: e.target.value })}
            />
          </div>
          <div className="flex flex-column gap-2 m-3 w-full">
            <InputText
              placeholder="Usuario"
              id="usuario"
              value={raidd.usuario}
              onChange={(e) => setRaidd({ ...raidd, usuario: e.target.value })}
            />
          </div>
        </div>

        <div className="flex gap-1">
          <div className="flex flex-column gap-2 m-3 w-full">
            <InputText
              placeholder="Tiempo de Entrega"
              id="tiempo_entrega"
              value={raidd.tiempo_entrega}
              onChange={(e) =>
                setRaidd({ ...raidd, tiempo_entrega: e.target.value })
              }
            />
          </div>
          <div className="flex flex-column gap-2 m-3 w-full">
            <InputText
              placeholder="Duracion"
              id="duracion"
              value={raidd.duracion}
              onChange={(e) => setRaidd({ ...raidd, duracion: e.target.value })}
            />
          </div>
        </div>

        <div className="flex flex-column gap-2 m-3 w-160">
          <label htmlFor="fecha_termino_actividad">Fecha de inicio</label>
          <Calendar
            value={raidd.inicio}
            onChange={(e) => setRaidd({ ...raidd, inicio: e.value })}
          />
        </div>

        <div className="flex gap-4 justify-center mt-4">
          <Button
            label="Registrar"
            severity="success"
            onClick={() => {
              registrarInformacion();
            }}
          />
          <Button label="Cancelar" severity="secondary" onClick={onVisible2} />
        </div>
      </Dialog>
    </div>
  );
};

export default RegistrarRaiddModal;
