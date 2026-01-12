import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { ToggleButton } from "primereact/togglebutton";
import { Button } from "primereact/button";
import axios from "axios";
export const Contratos = () => {
  const [contratos, setContratos] = useState([]);

  const obtenerContratos = async () => {
    const response = await axios.get("http://localhost:3000/contract/");
    console.log(response.data);
    setContratos(response.data);
  };

  useEffect(() => {
    obtenerContratos();
  }, []);

  const accionesTemplate = (rowData) => {
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
    <div className="card max-w-6xl">
      <div className="flex justify-start gap-2">
        <ToggleButton
          onIcon="pi pi-lock"
          offIcon="pi pi-lock-open"
          onLabel="Balance"
          offLabel="Balance"
        />

        <Button label="Nuevo contrato" severity="success" />
      </div>

      <DataTable
        value={contratos}
        scrollable
        scrollHeight="400px"
        className="mt-4"
        searc
      >
        <Column
          field="contract_number"
          header="Contract No."
          style={{ minWidth: "200px" }}
          frozen
          className="font-bold"
        ></Column>
        <Column field="po" header="PO" style={{ minWidth: "100px" }}></Column>
        <Column
          field="storage"
          header="Almacen"
          style={{ minWidth: "200px" }}
        ></Column>
        <Column
          field="facturado"
          header="Facturado"
          style={{ minWidth: "200px" }}
        ></Column>
        <Column
          field="deliveried"
          header="Entregado"
          style={{ minWidth: "200px" }}
        ></Column>

        <Column
          field="po_date"
          header="Po Date"
          style={{ minWidth: "200px" }}
        ></Column>
        <Column
          field="client"
          header="Customer"
          style={{ minWidth: "200px" }}
        ></Column>
        <Column field="po2" header="PO2" style={{ minWidth: "200px" }}></Column>
        <Column
          field="customer_po"
          header="Customer PO"
          style={{ minWidth: "200px" }}
          alignFrozen="right"
        ></Column>
        <Column
          field="manufacter"
          header="Manufacter"
          style={{ minWidth: "200px" }}
          alignFrozen="right"
        ></Column>
        <Column
          field="commodity"
          header="Commodity"
          style={{ minWidth: "200px" }}
          alignFrozen="right"
        ></Column>
        <Column
          field="supplier_counterpart"
          header="supplier counterpart"
          style={{ minWidth: "200px" }}
          alignFrozen="right"
        ></Column>
        <Column
          field="customer_po"
          header="Customer PO"
          style={{ minWidth: "200px" }}
          alignFrozen="right"
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
