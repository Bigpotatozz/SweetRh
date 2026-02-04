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
import ActividadesRaiddModal from "./ActividadesRaiddModal";

export const Raidd = () => {
  const [raiddItems, setRaiddItems] = useState([]);
  const [visible, setVisible] = useState(false);
  const [visible2, setVisible2] = useState(false);
  const [visible3, setVisible3] = useState(false);
  const [idRaidd, setIdRaidd] = useState(0);
  const reloadReducer = useSelector((state) => state.reload);
  const dispatch = useDispatch();
  const [valueBuscador, setValueBuscador] = useState("");

  const [raiddSelected, setRaiddSelected] = useState(0);

  const exportExcel = () => {
    const headers = [
      "#",
      "CONTRATO",
      "PROYECTO",
      "RESPONSABLE",
      "COTA",
      "PO",
      "CLIENTE",
      "USUARIO",
      "TIEMPO DE ENTREGA",
      "DURACION",
      "INICIO",
      "PQ",
      "TIPO RAIDD",
      "RESPONSABLE RAIDD",
      "FECHA COMPROMISO",
      "COMENTARIOS",
    ];

    let tableHtml = `
      <html>
        <head>
          <meta charset="UTF-8">
          <style>
            .header {
              background-color: #1D6F42;
              color: white;
              font-weight: bold;
              text-align: center;
              border: 1px solid #000;
            }
            td {
              border: 1px solid #000;
              text-align: left;
            }
          </style>
        </head>
        <body>
          <table>
            <thead>
              <tr>
                ${headers.map((h) => `<th class="header">${h}</th>`).join("")}
              </tr>
            </thead>
            <tbody>
              ${raiddItems
                .map(
                  (item) => `
                <tr>
                  <td>${item.id_raidd || ""}</td>
                  <td>${item.contract_number || ""}</td>
                  <td>${item.contract_number || ""}</td>
                  <td>${item.employee_name || ""}</td>
                  <td>${item.cota || ""}</td>
                  <td>${item.customer_po || ""}</td>
                  <td>${item.client || ""}</td>
                  <td>${item.usuario || ""}</td>
                  <td>${item.tiempo_entrega || ""}</td>
                  <td>${item.duracion || ""}</td>
                  <td>${item.inicio || ""}</td>
                  <td>${item.pq || ""}</td>
                  <td>${item.raiddType || ""}</td>
                  <td>${item.responsableRaidd || ""}</td>
                  <td>${item.fechaCompromiso || ""}</td>
                  <td>${item.comentarios || ""}</td>
                </tr>
              `,
                )
                .join("")}
            </tbody>
          </table>
        </body>
      </html>
    `;

    const blob = new Blob(["\ufeff", tableHtml], {
      type: "application/vnd.ms-excel",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "RAIDD_Listado.xls";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
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
  const onVisible3 = () => setVisible3(false);

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

      <ActividadesRaiddModal
        visible2={visible3}
        onVisible2={onVisible3}
        idRaidd={idRaidd}
      ></ActividadesRaiddModal>
      <div className="flex justify-between gap-2">
        <Button
          label="Nuevo RAIDD"
          severity="success"
          onClick={() => setVisible2(true)}
        />
        <Button
          label="Editar RAIDD"
          severity="warning"
          onClick={() => setVisible(true)}
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
        onRowClick={(e) => {
          setIdRaidd(e.data.id_raidd);
          setVisible3(true);
        }}
        rowClassName={() => "cursor-pointer"}
        selectionMode={"single"}
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
      </DataTable>
    </div>
  );
};
