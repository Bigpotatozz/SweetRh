import { Calendar } from "primereact/calendar";
import { Button } from "primereact/button";
import { Checkbox } from "primereact/checkbox";
import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { activeReload, deactiveReload } from "../../state/slice/ReloadSlice";
import axios from "axios";

const RegistrarContratoModal = ({ visible2, onVisible2, nextContractName }) => {
  const reloadReducer = useSelector((state) => state.reload);
  const dispatch = useDispatch();
  const toastSuccess = useRef(null);

  const [contract, setContract] = useState({});
  const [contractName, setContractName] = useState(nextContractName);

  const [project, setProject] = useState({});
  const [empleados, setEmpleados] = useState([]);
  const [empleado, setEmpleado] = useState({});

  const estatus = ["ENTREGADO", "NO ENTREGADO", "EN PROCESO"];

  const showSuccess = () => {
    toastSuccess.current.show({
      severity: "success",
      summary: "Contrato Registrado",
      detail: "Contrato registrado correctamente",
    });
  };

  const limpiarCampos = () => {
    setContract({});
    setProject({});
  };
  const obtenerEmpleados = async () => {
    try {
      const response = await axios.get("http://localhost:3000/employee/list");
      setEmpleados(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  const registrarInformacion = async () => {
    try {
      const contrato = await axios.post(
        "http://localhost:3000/contract/create/contractProject",
        {
          contract_number: derivedContractName,
          usuario: contract.usuario,
          po_date: new Date(contract.po_date),
          client: contract.client,
          po2: contract.po2 ? new Date(contract.po2) : null,
          customer_po: contract.customer_po,
          manufacter: contract.manufacter,
          commodity: contract.commodity,
          supplier_counterpart: contract.supplier_counterpart,
          po: contract.po ? true : false,
          facturado: contract.facturado ? true : false,
          storage: contract.storage ? true : false,
          deliveried: contract.deliveried ? true : false,
          status: contract.status,
          name_proy: project.name,
          description: project.description,
          id_employee: empleado,
        },
      );

      console.log(contrato);

      onVisible2();
      showSuccess();
      dispatch(activeReload());
      limpiarCampos();
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    dispatch(deactiveReload());
  }, [reloadReducer]);

  useEffect(() => {
    obtenerEmpleados();
  }, [visible2]);

  const splittedContractName = nextContractName
    ? nextContractName.split("M")
    : [];
  const contractNum =
    splittedContractName.length > 1 ? parseInt(splittedContractName[1]) : 0;
  const derivedContractName = nextContractName ? `OKM${contractNum + 1}` : "";

  return (
    <div>
      <Toast ref={toastSuccess} />
      <Dialog
        header="Registrar contrato"
        visible={visible2}
        style={{ width: "50vw" }}
        onHide={() => {
          if (!visible2) return;
          onVisible2();
        }}
      >
        <h2 className="font-bold">Información del contrato</h2>

        <div className="flex flex-column gap-2 m-3">
          <label htmlFor="estatus">Estatus:</label>
          <Dropdown
            value={contract.status}
            onChange={(e) => {
              const object = { ...contract };
              object.status = e.value;
              setContract(object);
            }}
            options={estatus}
            optionLabel="name"
            placeholder="Estatus"
            className="w-full"
          />
        </div>
        <div className="flex w-full justify-center gap-3">
          <div className="flex align-items-center mt-3">
            <Checkbox
              inputId="po"
              name="po"
              value={contract.po}
              onChange={() => {
                const object = { ...contract };
                object.po = !object.po;
                setContract(object);
              }}
              checked={contract.po}
            />
            <label htmlFor="facturado" className="ml-1">
              PO
            </label>
          </div>

          <div className="flex align-items-center mt-3">
            <Checkbox
              inputId="storage"
              name="storage"
              value={contract.storage}
              onChange={() => {
                const object = { ...contract };
                object.storage = !object.storage;
                setContract(object);
              }}
              checked={contract.storage}
            />
            <label htmlFor="facturado" className="ml-1">
              En almacen
            </label>
          </div>
          <div className="flex align-items-center mt-3">
            <Checkbox
              inputId="facturado"
              name="facturado"
              value={contract.facturado}
              onChange={() => {
                const object = { ...contract };
                object.facturado = !object.facturado;
                setContract(object);
              }}
              checked={contract.facturado}
            />
            <label htmlFor="facturado" className="ml-1">
              Facturado
            </label>
          </div>

          <div className="flex align-items-center mt-3">
            <Checkbox
              inputId="deliveried"
              name="deliveried"
              value={contract.deliveried}
              onChange={() => {
                const object = { ...contract };
                object.deliveried = !object.deliveried;
                setContract(object);
              }}
              checked={contract.deliveried}
            />
            <label htmlFor="facturado" className="ml-1">
              Entregado
            </label>
          </div>
        </div>

        <div className="flex mt-3">
          <div className="flex flex-column gap-2 m-3 w-100">
            <label htmlFor="po_date">PO Date:</label>
            <Calendar
              value={new Date(contract.po_date)}
              onChange={(e) => {
                const object = { ...contract };
                object.po_date = new Date(e.value);
                setContract(object);
              }}
              hourFormat="24"
            />
          </div>

          <div className="flex flex-column gap-2 m-3 w-100">
            <label htmlFor="po2">PO 2 Date:</label>
            <Calendar
              value={
                !contract.po2 || contract.po2 == "NA"
                  ? null
                  : new Date(contract.po2)
              }
              onChange={(e) => {
                const object = { ...contract };
                object.po2 = new Date(e.value);
                setContract(object);
              }}
              hourFormat="24"
            />
          </div>
        </div>

        <div className="flex gap-2 m-3">
          <div className="flex flex-column w-full ">
            <label htmlFor="actividad">Numero de contrato</label>
            <InputText
              value={derivedContractName}
              id="num_contrato"
              aria-describedby="numero de contrato"
              disabled
            />
          </div>
          <div className="flex flex-column w-full">
            <label htmlFor="actividad">Cliente</label>
            <InputText
              value={contract.client}
              id="cllient"
              aria-describedby="cliente"
              onChange={(e) => {
                const object = { ...contract };
                object.client = e.target.value;
                setContract(object);
              }}
            />
          </div>
        </div>

        <div className="flex gap-2 m-3">
          <div className="flex flex-column w-full ">
            <label htmlFor="client_po">cliente PO</label>
            <InputText
              value={contract.customer_po}
              id="client_po"
              aria-describedby="cliente"
              onChange={(e) => {
                const object = { ...contract };
                object.customer_po = e.target.value;
                setContract(object);
              }}
            />
          </div>

          <div className="flex flex-column w-full ">
            <label htmlFor="manufacter">Manufacter</label>
            <InputText
              value={contract.manufacter}
              id="manufacter"
              aria-describedby="manufacter"
              onChange={(e) => {
                const object = { ...contract };
                object.manufacter = e.target.value;
                setContract(object);
              }}
            />
          </div>
        </div>

        <div className="flex gap-2 m-3">
          <div className="flex flex-column w-full">
            <label htmlFor="commodity">Commodity</label>
            <InputText
              value={contract.commodity}
              id="commodity"
              aria-describedby="commodity"
              onChange={(e) => {
                const object = { ...contract };
                object.commodity = e.target.value;
                setContract(object);
              }}
            />
          </div>

          <div className="flex flex-column w-full">
            <label htmlFor="supplier_counterpart">Supplier counterpart</label>
            <InputText
              value={contract.supplier_counterpart}
              id="cllient"
              aria-describedby="cliente"
              onChange={(e) => {
                const object = { ...contract };
                object.supplier_counterpart = e.target.value;
                setContract(object);
              }}
            />
          </div>
        </div>

        <div className="flex gap-2 m-3">
          <div className="flex flex-column w-full">
            <label htmlFor="actividad">Usuario</label>
            <InputText
              value={contract.usuario}
              id="usuario"
              aria-describedby="Usuario"
              onChange={(e) => {
                const object = { ...contract };
                object.usuario = e.target.value;
                setContract(object);
              }}
            />
          </div>
        </div>

        <h2 className="font-bold">Información del Proyecto</h2>

        <div className="flex gap-2 m-3">
          <div className="flex flex-column w-full ">
            <label htmlFor="actividad">Nombre</label>
            <InputText
              value={derivedContractName}
              id="name"
              aria-describedby="Nombre de contrato"
              onChange={(e) => {
                const object = { ...project };
                object.name = e.target.value;
                setProject(object);
              }}
              disabled
            />
          </div>
          <div className="flex flex-column w-full">
            <label htmlFor="actividad">Descripcion</label>
            <InputText
              value={project.description}
              id="description"
              aria-describedby="Descripción"
              onChange={(e) => {
                const object = { ...project };
                object.description = e.target.value;
                setProject(object);
              }}
            />
          </div>
        </div>

        <div className="flex gap-2 justify-between m-3">
          <Dropdown
            value={empleado}
            onChange={(e) => setEmpleado(e.value)}
            options={empleados}
            optionValue="id_employee"
            optionLabel="name"
            placeholder="Responsable"
            className="w-full"
          />
        </div>

        <div className="flex gap-5 justify-center m-3">
          <Button
            label="Registrar"
            severity="success"
            className="w-110"
            onClick={() => {
              registrarInformacion();
            }}
          />

          <Button
            label="Cancelar"
            severity="secondary"
            className="w-110"
            onClick={onVisible2}
          />
        </div>
      </Dialog>
    </div>
  );
};

export default RegistrarContratoModal;
