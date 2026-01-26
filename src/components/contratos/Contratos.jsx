import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { ToggleButton } from "primereact/togglebutton";
import { Button } from "primereact/button";
import axios from "axios";

import EditarContratoModal from "./EditarContratoModal";
import { useDispatch, useSelector } from "react-redux";
import { activeReload, deactiveReload } from "../../state/slice/ReloadSlice";
import RegistrarContratoModal from "./RegistrarContratoModal";
import { InputText } from "primereact/inputtext";
import * as XLSX from "xlsx";
export const Contratos = () => {
  const [contratos, setContratos] = useState([]);
  const [visible, setVisible] = useState(false);
  const [visible2, setVisible2] = useState(false);
  const [idContrato, setIdContrato] = useState(0);
  const reloadReducer = useSelector((state) => state.reload);
  const dispatch = useDispatch();
  const [valueBuscador, setValueBuscador] = useState("");

  const [nameNextContract, setNameNextContract] = useState("");
  const exportExcel = () => {
    const datosFormateados = contratos.map((contrato) => ({
      "No. Contrato": contrato.contract_number,
      Cliente: contrato.client,
      "Fecha PO": contrato.po_date?.split("T")[0] || "",
      PO: contrato.po ? "Sí" : "No",
      Almacén: contrato.storage ? "En almacén" : "Sin existencias",
      Facturado: contrato.facturado ? "Facturado" : "Sin facturar",
      Entregado: contrato.deliveried ? "Entregado" : "No entregado",
      Fabricante: contrato.manufacter,
      Commodity: contrato.commodity,
    }));

    const worksheet = XLSX.utils.json_to_sheet(datosFormateados);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Contratos");
    XLSX.writeFile(workbook, `CONTRATOS.xlsx`);
  };

  const handleReload = () => {
    dispatch(activeReload());
  };

  const obtenerContratos = async () => {
    try {
      const response = await axios.get("http://localhost:3000/contract/");

      if (response.data.status === 404) {
        return;
      }

      console.log(response.data);

      setNameNextContract(
        response.data[response.data.length - 1].contract_number,
      );
      setContratos(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  const onVisible = () => {
    setVisible(false);
  };

  const onVisible2 = () => {
    setVisible2(false);
  };

  useEffect(() => {
    obtenerContratos();
    dispatch(deactiveReload());
  }, [reloadReducer]);

  return (
    <div className="card overflow-hidden mx-h-screen">
      <RegistrarContratoModal
        visible2={visible2}
        onVisible2={onVisible2}
        nextContractName={contratos.length > 0 ? nameNextContract : "OKM260000"}
      ></RegistrarContratoModal>
      <EditarContratoModal
        visible2={visible}
        onVisible2={onVisible}
        idContrato={idContrato}
      ></EditarContratoModal>
      <div className="flex justify-between gap-2">
        <Button
          label="Nuevo contrato"
          severity="success"
          onClick={() => {
            setVisible2(true);
          }}
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
            placeholder="Buscar contrato"
            onChange={(e) => {
              setValueBuscador(e.target.value);
            }}
          />
        </div>
      </div>

      <DataTable
        value={contratos}
        scrollable
        scrollHeight="700px"
        className="mt-4"
        search
        globalFilter={valueBuscador}
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
          field="usuario"
          header="Usuario"
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
          field="deliveried"
          header="Entregado"
          style={{ minWidth: "200px" }}
          sortable
          body={(element) =>
            element.deliveried ? "Entregado" : "No entregado"
          }
        ></Column>

        <Column
          field="po_date"
          header="Po Date"
          style={{ minWidth: "200px" }}
          body={(element) =>
            element.po_date ? element.po_date.split("T")[0] : "NA"
          }
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
          body={(element) => (element.po2 ? element.po2.split("T")[0] : "NA")}
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

                  {/* <i
                    className="pi pi-trash cursor-pointer"
                    style={{ color: "red", fontSize: "1.2rem" }}
                    onClick={() => alert("BOTON ELIMINAR PRESIONADO")}
                  ></i>*/}
                </div>
              </>
            );
          }}
        ></Column>
      </DataTable>
    </div>
  );
};
