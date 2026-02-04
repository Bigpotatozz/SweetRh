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

const EditarRaiddModal = ({ visible2, onVisible2 }) => {
  const reloadReducer = useSelector((state) => state.reload);
  const dispatch = useDispatch();
  const toastSuccess = useRef(null);

  const [registros, setRegistros] = useState([]);
  const [registro, setRegistro] = useState(0);
  const [idRaidd, setIdRaidd] = useState(0);

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
      summary: "RAIDD Modificado",
      detail: "RAIDD modificado correctamente",
    });
  };

  const obtenerRaidd = async (id) => {
    try {
      // Logic for fetching (placeholder API)
      // const response = await axios.get(`http://localhost:3000/raidd/${id}`);
      // setRaidd(response.data);
      console.log("Obteniendo RAIDD con ID:", id);
    } catch (e) {
      console.log(e);
    }
  };

  const obtenerRaidds = async () => {
    try {
      const response = await axios.get("http://localhost:3000/raidd/");
      setRegistros(response.data);
    } catch (e) {
      console.log(e);
    }
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
  const modificarRaidd = async () => {
    try {
      const fechaFormateada =
        raidd.inicio instanceof Date
          ? raidd.inicio.toISOString().split("T")[0]
          : raidd.inicio;

      await axios.patch(`http://localhost:3000/raidd/updateRaidd/${idRaidd}`, {
        cota: raidd.cota,
        usuario: raidd.usuario,
        tiempo_entrega: raidd.tiempo_entrega,
        duracion: raidd.duracion,
        inicio: fechaFormateada,
        id_contract: raidd.id_contract,
      });
      console.log("Modificando RAIDD:", raidd);
      onVisible2();
      showSuccess();
      dispatch(activeReload());
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    dispatch(deactiveReload());
  }, [reloadReducer, dispatch]);

  useEffect(() => {
    obtenerRaidds();
    obtenerContratos();
    if (visible2 && idRaidd) {
      obtenerRaidd(idRaidd);
    }
  }, [visible2, idRaidd]);

  return (
    <div>
      <Toast ref={toastSuccess} />
      <Dialog
        header="Editar RAIDD"
        visible={visible2}
        style={{ width: "50vw" }}
        onHide={() => {
          if (!visible2) return;
          onVisible2();
        }}
      >
        <div className="flex gap-2 justify-between m-3">
          <Dropdown
            value={registro}
            onChange={(e) => {
              setRegistro(e.value);

              const raiddFinded = registros.find((r) => r.id_raidd === e.value);
              setRaidd({
                cota: raiddFinded.cota,
                usuario: raiddFinded.usuario,
                tiempo_entrega: raiddFinded.tiempo_entrega,
                duracion: raiddFinded.duracion,
                inicio: raiddFinded.inicio,
                id_contract: raiddFinded.id_contract,
              });

              console.log(raiddFinded.id_raidd);
              setContrato(raiddFinded.id_contract);
              setIdRaidd(raiddFinded.id_raidd);
            }}
            options={registros}
            optionValue="id_raidd"
            optionLabel="id_raidd"
            placeholder="Raidd a modificar"
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
            value={raidd.inicio ? new Date(raidd.inicio) : null}
            onChange={(e) => {
              setRaidd({ ...raidd, inicio: e.value });
            }}
            dateFormat="dd-mm-yy"
          />
        </div>

        <div className="flex gap-4 justify-center mt-4">
          <Button
            label="Modificar"
            severity="info"
            onClick={() => {
              modificarRaidd();
            }}
          />
          <Button label="Cancelar" severity="secondary" onClick={onVisible2} />
        </div>
      </Dialog>
    </div>
  );
};

export default EditarRaiddModal;
