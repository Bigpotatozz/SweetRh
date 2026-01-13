import React, { useEffect, useState } from "react";
import { Outlet } from "react-router";
import { InputText } from "primereact/inputtext";
import PersonalizedInput from "./PersonalizedInput";
import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";
import axios from "axios";
import { Button } from "primereact/button";
import { Checkbox } from "primereact/checkbox";
const RegistrarContrato = () => {
  const [empleados, setEmpleados] = useState([]);
  const [responsable, setResponsable] = useState("");

  const [facturado, setFacturado] = useState(false);
  const [contrato, setContrato] = useState({
    contract_number: "",
    po_date: "",
    client: "",
    po2: "",
    customer_po: "",
    manufacter: "",
    commodity: "",
    supplier_counterpart: "",
    po: "",
    storage: "",
    facturado: "",
    deliveried: "",
    status: "",
  });

  const obtenerEmpleados = async () => {
    try {
      const response = await axios.get("http://localhost:3000/employee/list");
      setEmpleados(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    obtenerEmpleados();
  }, []);
  return (
    <>
      <div className="w-full flex-column justify-start gap-3 p-5">
        <div className="contrato flex gap-3">
          <div className="columna1">
            <h2 className="font-bold text-xl">Información del contrato</h2>

            <PersonalizedInput
              label={"Numero de contrato:"}
              id={"num_contrato"}
              onChange={(e) => {
                const object = { ...contrato };
                object.contract_number = e.target.value;
                setContrato(object);
              }}
            ></PersonalizedInput>
            <div>
              <div className="card flex mt-2">
                <div className="flex flex-column gap-2">
                  <label htmlFor="po2">Fecha PO:</label>
                  <div className="card flex justify-content-center">
                    <Calendar
                      value={contrato.po_date}
                      onChange={(e) => {
                        const object = { ...contrato };
                        object.po_date = new Date(e.value);
                        setContrato(object);
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
            <PersonalizedInput
              label={"Cliente:"}
              id={"client"}
              onChange={(e) => {
                const object = { ...contrato };
                object.client = e.target.value;
                setContrato(object);
              }}
            ></PersonalizedInput>
            <PersonalizedInput
              label={"Fecha PO 2:"}
              id={"po2"}
              onChange={(e) => {
                const object = { ...contrato };
                object.po2 = e.target.value;
                setContrato(object);
              }}
            ></PersonalizedInput>
          </div>

          <div className="columna1">
            <div className="h-lh"></div>

            <PersonalizedInput
              label={"Cliente PO:"}
              id={"customer_po"}
              onChange={(e) => {
                const object = { ...contrato };
                object.customer_po = e.target.value;
                setContrato(object);
              }}
            ></PersonalizedInput>
            <PersonalizedInput
              label={"Manufacter: "}
              id={"manufacter"}
              onChange={(e) => {
                const object = { ...contrato };
                object.manufacter = e.target.value;
                setContrato(object);
              }}
            ></PersonalizedInput>
            <PersonalizedInput
              label={"Commodity:"}
              id={"commodity"}
              onChange={(e) => {
                const object = { ...contrato };
                object.commodity = e.target.value;
                setContrato(object);
              }}
            ></PersonalizedInput>
            <PersonalizedInput
              label={"Supplier counterpat:"}
              id={"supplier_counterpart"}
              onChange={(e) => {
                const object = { ...contrato };
                object.supplier_counterpart = e.target.value;
                setContrato(object);
              }}
            ></PersonalizedInput>
          </div>

          <div className="columna2">
            <div className="h-lh"></div>

            <PersonalizedInput
              label={"Estatus: "}
              id={"estatus"}
              onChange={(e) => {
                const object = { ...contrato };
                object.status = e.target.value;
                setContrato(object);
              }}
            ></PersonalizedInput>

            <div className="flex align-items-center mt-5">
              <Checkbox
                inputId="facturado"
                name="facturado"
                value={facturado}
                onChange={() => {
                  setFacturado(!facturado);
                }}
                checked={facturado}
              />
              <label htmlFor="facturado" className="ml-2 ">
                PO
              </label>
            </div>
            <div className="flex align-items-center mt-3">
              <Checkbox
                inputId="facturado"
                name="facturado"
                value={facturado}
                onChange={() => {
                  setFacturado(!facturado);
                }}
                checked={facturado}
              />
              <label htmlFor="facturado" className="ml-2 ">
                En almacen
              </label>
            </div>

            <div className="flex align-items-center mt-3">
              <Checkbox
                inputId="facturado"
                name="facturado"
                value={facturado}
                onChange={() => {
                  setFacturado(!facturado);
                }}
                checked={facturado}
              />
              <label htmlFor="facturado" className="ml-2">
                Facturado
              </label>
            </div>

            <div className="flex align-items-center mt-3">
              <Checkbox
                inputId="facturado"
                name="facturado"
                value={facturado}
                onChange={() => {
                  setFacturado(!facturado);
                }}
                checked={facturado}
              />
              <label htmlFor="facturado" className="ml-2">
                Entregado
              </label>
            </div>
          </div>

          <div className="columna">
            <div className="h-lh"></div>
          </div>
        </div>

        <h2 className="font-bold mt-5 text-xl">Información del proyecto</h2>
        <div className="columna3  flex justify-start gap-3">
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

          <div className="card flex mt-2">
            <div className="flex flex-column gap-2">
              <label htmlFor="responsable">Responsable:</label>
              <div className="card flex justify-content-center">
                <Dropdown
                  value={responsable}
                  onChange={(e) => setResponsable(e.value)}
                  options={empleados}
                  optionLabel="name"
                  editable
                  placeholder="Seleccione un responsable"
                  className="w-full md:w-14rem"
                />
              </div>
            </div>
          </div>
        </div>
        <Button
          severity="success"
          className="mt-3"
          onClick={() => {
            console.log(contrato);
          }}
        >
          Registrar
        </Button>
      </div>
    </>
  );
};

export default RegistrarContrato;
