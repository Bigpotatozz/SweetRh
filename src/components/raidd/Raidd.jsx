import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import * as XLSX from "xlsx";

import { activeReload, deactiveReload } from "../../state/slice/ReloadSlice";
import RegistrarRaiddModal from "./RegistrarRaiddModal";
import EditarRaiddModal from "./EditarRaiddModal";

export const Raidd = () => {
  const [raiddItems, setRaiddItems] = useState([]);
  const [visible, setVisible] = useState(false);
  const [visible2, setVisible2] = useState(false);
  const [idRaidd, setIdRaidd] = useState(0);
  const reloadReducer = useSelector((state) => state.reload);
  const dispatch = useDispatch();
  const [valueBuscador, setValueBuscador] = useState("");

  const exportExcel = () => {
    const datosFormateados = raiddItems.map((item) => ({
      "#": item.id,
      Contrato: item.contrato,
      Proyecto: item.proyecto,
      Responsable: item.responsable,
      Cota: item.cota,
      PQ: item.pq,
      Cliente: item.cliente,
      Usuario: item.usuario,
      "Tiempo de Entrega": item.tiempoEntrega,
      Duracion: item.duracion,
      Inicio: item.inicio,
      RAIDD: item.raiddType,
      "Responsable RAIDD": item.responsableRaidd,
      "Fecha Compromiso": item.fechaCompromiso,
      Comentarios: item.comentarios,
    }));

    const worksheet = XLSX.utils.json_to_sheet(datosFormateados);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "RAIDD");
    XLSX.writeFile(workbook, `RAIDD.xlsx`);
  };

  const obtenerRaiddItems = async () => {
    try {
      const response = await axios.get("http://localhost:3000/raidd/");
      setRaiddItems(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  const onVisible = () => setVisible(false);
  const onVisible2 = () => setVisible2(false);

  useEffect(() => {
    obtenerRaiddItems();
    dispatch(deactiveReload());
  }, [reloadReducer, dispatch]);

  return (
    <div className="card overflow-hidden mx-h-screen">
      <RegistrarRaiddModal visible2={visible2} onVisible2={onVisible2} />
      <EditarRaiddModal
        visible2={visible}
        onVisible2={onVisible}
        idRaidd={idRaidd}
      />

      <div className="flex justify-between gap-2">
        <Button
          label="Nuevo RAIDD"
          severity="success"
          onClick={() => setVisible2(true)}
        />
        <Button
          label="Agregar accion"
          severity="info"
          onClick={() => setVisible2(true)}
        />

        <Button
          label="Exportar"
          icon="pi pi-table"
          iconPos="right"
          style={{ background: "#1D6F42" }}
          onClick={exportExcel}
        />

        <div className="p-inputgroup flex-1">
          <span className="p-inputgroup-addon">
            <i className="pi pi-search"></i>
          </span>
          <InputText
            placeholder="Buscar RAIDD"
            onChange={(e) => setValueBuscador(e.target.value)}
          />
        </div>
      </div>

      <DataTable
        value={raiddItems}
        scrollable
        scrollHeight="700px"
        className="mt-4"
        globalFilter={valueBuscador}
        size="small"
        stripedRows
        showGridlines
      >
        <Column
          field="id_raidd"
          header="#"
          style={{ textAlign: "center", width: "3rem" }}
          sortable
        />
        <Column
          field="contract_number"
          header="CONTRATO"
          style={{ minWidth: "150px" }}
          sortable
        />
        <Column
          field="contract_number"
          header="PROYECTO"
          style={{ minWidth: "150px" }}
          sortable
        />
        <Column
          field="employee_name"
          header="RESPONSABLE"
          style={{ minWidth: "150px" }}
          sortable
        />
        <Column
          field="cota"
          header="COTA"
          style={{ minWidth: "100px" }}
          sortable
        />
        <Column
          field="customer_po"
          header="PO"
          style={{ minWidth: "100px" }}
          sortable
        />
        <Column
          field="client"
          header="CLIENTE"
          style={{ minWidth: "150px" }}
          sortable
        />
        <Column
          field="usuario"
          header="USUARIO"
          style={{ minWidth: "150px" }}
          sortable
        />
        <Column
          field="tiempo_entrega"
          header="TIEMPO DE ENTREGA"
          style={{ minWidth: "180px" }}
          sortable
        />
        <Column
          field="duracion"
          header="DURACION"
          style={{ minWidth: "120px" }}
          sortable
        />
        <Column
          field="inicio"
          header="INICIO"
          style={{ minWidth: "150px" }}
          sortable
        />

        <Column
          header="Acciones"
          style={{ minWidth: "100px" }}
          body={(element) => (
            <div className="flex align-items-center gap-2">
              <i
                className="pi pi-pen-to-square cursor-pointer"
                style={{ color: "blue", fontSize: "1.2rem" }}
                onClick={() => {
                  setIdRaidd(element.id);
                  setVisible(true);
                }}
              ></i>
            </div>
          )}
        />
      </DataTable>
    </div>
  );
};
