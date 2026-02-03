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

const EditarRaiddModal = ({ visible2, onVisible2, idRaidd }) => {
  const reloadReducer = useSelector((state) => state.reload);
  const dispatch = useDispatch();
  const toastSuccess = useRef(null);

  const [raidd, setRaidd] = useState({
    contrato: "",
    proyecto: "",
    responsable: "",
    cota: "",
    pq: "",
    cliente: "",
    usuario: "",
    tiempoEntrega: null,
    duracion: "",
    inicio: null,
    raiddType: "",
    responsableRaidd: "",
    fechaCompromiso: null,
    comentarios: "",
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

  const modificarRaidd = async () => {
    try {
      // Logic for modification (placeholder API)
      // await axios.patch(`http://localhost:3000/raidd/update/${idRaidd}`, raidd);
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
        <div className="grid p-fluid">
          <div className="col-12 md:col-6 field">
            <label htmlFor="contrato">Contrato</label>
            <InputText
              id="contrato"
              value={raidd.contrato}
              onChange={(e) => setRaidd({ ...raidd, contrato: e.target.value })}
            />
          </div>
          <div className="col-12 md:col-6 field">
            <label htmlFor="proyecto">Proyecto</label>
            <InputText
              id="proyecto"
              value={raidd.proyecto}
              onChange={(e) => setRaidd({ ...raidd, proyecto: e.target.value })}
            />
          </div>
          <div className="col-12 md:col-6 field">
            <label htmlFor="responsable">Responsable</label>
            <InputText
              id="responsable"
              value={raidd.responsable}
              onChange={(e) =>
                setRaidd({ ...raidd, responsable: e.target.value })
              }
            />
          </div>
          <div className="col-12 md:col-6 field">
            <label htmlFor="cota">Cota</label>
            <InputText
              id="cota"
              value={raidd.cota}
              onChange={(e) => setRaidd({ ...raidd, cota: e.target.value })}
            />
          </div>
          <div className="col-12 md:col-6 field">
            <label htmlFor="pq">PQ</label>
            <InputText
              id="pq"
              value={raidd.pq}
              onChange={(e) => setRaidd({ ...raidd, pq: e.target.value })}
            />
          </div>
          <div className="col-12 md:col-6 field">
            <label htmlFor="cliente">Cliente</label>
            <InputText
              id="cliente"
              value={raidd.cliente}
              onChange={(e) => setRaidd({ ...raidd, cliente: e.target.value })}
            />
          </div>
          <div className="col-12 field">
            <label htmlFor="comentarios">Comentarios</label>
            <InputText
              id="comentarios"
              value={raidd.comentarios}
              onChange={(e) =>
                setRaidd({ ...raidd, comentarios: e.target.value })
              }
            />
          </div>
        </div>

        <div className="flex gap-4 justify-center mt-4">
          <Button label="Modificar" severity="info" onClick={modificarRaidd} />
          <Button label="Cancelar" severity="secondary" onClick={onVisible2} />
        </div>
      </Dialog>
    </div>
  );
};

export default EditarRaiddModal;
