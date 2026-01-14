import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { ToggleButton } from "primereact/togglebutton";
import { Button } from "primereact/button";
import axios from "axios";
import { useNavigate } from "react-router";
import EditarContratoModal from "./EditarContratoModal";
export const Contratos = () => {
  const navigate = useNavigate();
  const [contratos, setContratos] = useState([]);

  const [visible, setVisible] = useState(false);

  const [idContrato, setIdContrato] = useState(0);

  const obtenerContratos = async () => {
    try {
      const response = await axios.get("http://localhost:3000/contract/");
      setContratos(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  const onVisible = () => {
    setVisible(false);
  };

  useEffect(() => {
    obtenerContratos();
  }, []);

  return (
    <div className="card max-w-6xl mx-h-screen">
      <EditarContratoModal
        visible2={visible}
        onVisible2={onVisible}
        idContrato={idContrato}
      ></EditarContratoModal>
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
        search
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
          body={(element) => (element.po ? "Si" : "No")}
          sortable
        ></Column>
        <Column
          field="storage"
          header="Almacén"
          style={{ minWidth: "200px" }}
          sortable
          body={(element) =>
            element.storage ? "En almacen" : "Sin existencias"
          }
        ></Column>
        <Column
          field="facturado"
          header="Facturado"
          style={{ minWidth: "200px" }}
          sortable
          body={(element) => (element.facturado ? "Facturado" : "Sin facturar")}
        ></Column>
        <Column
          field="delivered"
          header="Entregado"
          style={{ minWidth: "200px" }}
          sortable
          body={(element) => (element.delivered ? "Entregado" : "No entregado")}
        ></Column>

        <Column
          field="po_date"
          header="Po Date"
          style={{ minWidth: "200px" }}
          body={(element) => element.po_date.split("T")[0]}
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
          body={(element) => {
            return (
              <>
                <div className="flex align-items-center gap-2">
                  <i
                    className="pi pi-pen-to-square cursor-pointer"
                    style={{ color: "blue", fontSize: "1.2rem" }}
                    onClick={() => {
                      setIdContrato(element.id_contract);
                      setVisible(true);
                    }}
                  ></i>

                  <i
                    className="pi pi-trash cursor-pointer"
                    style={{ color: "red", fontSize: "1.2rem" }}
                    onClick={() => alert("BOTON ELIMINAR PRESIONADO")}
                  ></i>
                </div>
              </>
            );
          }}
        ></Column>
      </DataTable>
    </div>
  );
};
