import React, { useState } from "react";
import { Outlet } from "react-router";
import { InputText } from "primereact/inputtext";
import PersonalizedInput from "./PersonalizedInput";
import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";

const RegistrarContrato = () => {
  const [fechaPo, setFechaPo] = useState(null);

  const [ingenieros, setIngenieros] = useState([
    "Oscar",
    "Fernando",
    "Raymundo",
  ]);

  const [ingeniero, setIngeniero] = useState("");

  return (
    <>
      <div className="w-full flex justify-start gap-3">
        <div className="columna1">
          <h2 className="font-bold">Información del contrato</h2>

          <PersonalizedInput
            label={"Numero de contrato:"}
            id={"num_contrato"}
          ></PersonalizedInput>
          <div>
            <div className="card flex mt-2">
              <div className="flex flex-column gap-2">
                <label htmlFor="po2">Fecha PO:</label>
                <div className="card flex justify-content-center">
                  <Calendar
                    value={fechaPo}
                    onChange={(e) => setFechaPo(e.value)}
                  />
                </div>
              </div>
            </div>
          </div>
          <PersonalizedInput
            label={"Cliente:"}
            id={"cliente"}
          ></PersonalizedInput>
          <PersonalizedInput
            label={"Fecha PO 2:"}
            id={"po2"}
          ></PersonalizedInput>
          <PersonalizedInput
            label={"Cliente PO:"}
            id={"po_customer"}
          ></PersonalizedInput>
          <PersonalizedInput
            label={"Manufacter: "}
            id={"manufacter"}
          ></PersonalizedInput>
        </div>

        <div className="columna1">
          <div className="h-lh"></div>
          <PersonalizedInput
            label={"Commodity:"}
            id={"commodity"}
          ></PersonalizedInput>
          <PersonalizedInput
            label={"Supplier counterpat:"}
            id={"supplier_counterpart"}
          ></PersonalizedInput>
          <PersonalizedInput
            label={"Estado PO:"}
            id={"po_state"}
          ></PersonalizedInput>
          <PersonalizedInput
            label={"almacen:"}
            id={"almacen_state"}
          ></PersonalizedInput>
          <PersonalizedInput
            label={"Facturado:"}
            id={"facturado_state"}
          ></PersonalizedInput>
          <PersonalizedInput
            label={"Entregado: "}
            id={"entregado_state"}
          ></PersonalizedInput>
        </div>

        <div className="columna2">
          <div className="h-lh"></div>
          <PersonalizedInput
            label={"Estatus : "}
            id={"estatus"}
          ></PersonalizedInput>
        </div>

        <div className="columna3">
          <h2 className="font-bold">Información del proyecto</h2>
          <PersonalizedInput
            label={"Nombre del proyecto:"}
            id={"nombre"}
          ></PersonalizedInput>

          <PersonalizedInput
            label={"Descripción del proyecto:"}
            id={"descripcion"}
          ></PersonalizedInput>

          <PersonalizedInput
            label={"Estatus del proyecto:"}
            id={"estatus"}
          ></PersonalizedInput>
        </div>
      </div>
    </>
  );
};

export default RegistrarContrato;
