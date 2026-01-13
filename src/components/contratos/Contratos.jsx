import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { ToggleButton } from "primereact/togglebutton";
import { Button } from "primereact/button";
import axios from "axios";
import { useNavigate } from "react-router";
export const Contratos = () => {
  const navigate = useNavigate();
  const [contratos, setContratos] = useState([]);

  const obtenerContratos = async () => {
    const response = await axios.get("http://localhost:3000/contract/");
    console.log(response.data);
    setContratos(response.data);
  };

  useEffect(() => {
    async () => {
      await obtenerContratos();
    };
  }, []);

  const accionesTemplate = () => {
    return (
      <div className="flex align-items-center gap-2">
        <i
          className="pi pi-pen-to-square cursor-pointer"
          style={{ color: "blue", fontSize: "1.2rem" }}
          onClick={() => alert("BOTON EDITAR PRESIONADO")}
        ></i>

        <i
          className="pi pi-trash cursor-pointer"
          style={{ color: "red", fontSize: "1.2rem" }}
          onClick={() => alert("BOTON ELIMINAR PRESIONADO")}
        ></i>
      </div>
    );
  };

  return (
    <div className="card max-w-6xl mx-h-screen">
      <div className="flex justify-start gap-2">
        <Button
          label="Nuevo contrato"
          severity="success"
          onClick={() => {
            navigate("/nuevoContrato");
          }}
        />
      </div>

      <DataTable
        value={contratos}
        scrollable
        scrollHeight="700px"
        className="mt-4"
        searc
        onClick={(e) => {
          alert(`ROW PRESIONADA ${e.target.value}`);
        }}
      >
        <Column
          field="contract_number"
          header="Contract No."
          style={{ minWidth: "200px" }}
          frozen
          className="font-bold"
          sortable
        ></Column>
        <Column
          field="po"
          header="PO"
          style={{ minWidth: "100px" }}
          sortable
        ></Column>
        <Column
          field="storage"
          header="Almacen"
          style={{ minWidth: "200px" }}
          sortable
        ></Column>
        <Column
          field="facturado"
          header="Facturado"
          style={{ minWidth: "200px" }}
          sortable
        ></Column>
        <Column
          field="deliveried"
          header="Entregado"
          style={{ minWidth: "200px" }}
          sortable
        ></Column>

        <Column
          field="po_date"
          header="Po Date"
          style={{ minWidth: "200px" }}
          sortable
        ></Column>
        <Column
          field="client"
          header="Customer"
          style={{ minWidth: "200px" }}
          sortable
        ></Column>
        <Column
          field="po2"
          header="PO2"
          style={{ minWidth: "200px" }}
          sortable
        ></Column>
        <Column
          field="customer_po"
          header="Customer PO"
          style={{ minWidth: "200px" }}
          alignFrozen="right"
          sortable
        ></Column>
        <Column
          field="manufacter"
          header="Manufacter"
          style={{ minWidth: "200px" }}
          alignFrozen="right"
          sortable
        ></Column>
        <Column
          field="commodity"
          header="Commodity"
          style={{ minWidth: "200px" }}
          alignFrozen="right"
          sortable
        ></Column>
        <Column
          field="supplier_counterpart"
          header="supplier counterpart"
          style={{ minWidth: "200px" }}
          alignFrozen="right"
          sortable
        ></Column>
        <Column
          field="customer_po"
          header="Customer PO"
          style={{ minWidth: "200px" }}
          alignFrozen="right"
          sortable
        ></Column>
        <Column
          header="Acciones"
          style={{ minWidth: "200px" }}
          alignFrozen="right"
          body={accionesTemplate}
        ></Column>
      </DataTable>
    </div>
  );
};
