import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { activeReload, deactiveReload } from "../../state/slice/ReloadSlice";
import { Toast } from "primereact/toast";
import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { Calendar } from "primereact/calendar";
import { Button } from "primereact/button";
import { Checkbox } from "primereact/checkbox";

const EditarContratoModal = ({ visible2, onVisible2, idContrato }) => {
  const reloadReducer = useSelector((state) => state.reload);
  const dispatch = useDispatch();
  const toastSuccess = useRef(null);

  const [contract, setContract] = useState({});

  const estatus = ["ENTREGADO", "NO ENTREGADO", "EN PROCESO"];

  const showSuccess = () => {
    toastSuccess.current.show({
      severity: "success",
      summary: "Contrato Modificado",
      detail: "Contrato modificado correctamente",
    });
  };

  const modificarContrato = async (idContrato) => {
    console.log(contract);
    try {
      const response = await axios.patch(
        `http://localhost:3000/contract/update/${idContrato}`,
        contract
      );

      console.log(response);

      onVisible2();
      showSuccess();
      dispatch(activeReload());
    } catch (e) {
      console.log(e);
    }
  };

  const obtenerContrato = async (idContrato) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/contract/${idContrato}`
      );
      setContract(response.data);
      console.log(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    (async () => {
      dispatch(deactiveReload());
    })();
  }, [reloadReducer]);

  useEffect(() => {
    (async () => {
      obtenerContrato(idContrato);
    })();
  }, [idContrato, visible2]);

  return (
    <div>
      <Toast ref={toastSuccess} />
      <Dialog
        header="Editar contrato"
        visible={visible2}
        style={{ width: "50vw" }}
        onHide={() => {
          if (!visible2) return;
          onVisible2();
        }}
      >
        <div className="flex w-full justify-center gap-3">
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

        <div className="flex">
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
              placeholder="Actividad"
              className="w-full"
            />
          </div>
        </div>

        <div className="flex flex-column gap-2 m-3">
          <label htmlFor="actividad">Numero de contrato</label>
          <InputText
            value={contract.contract_number}
            id="num_contrato"
            aria-describedby="numero de contrato"
            onChange={(e) => {
              const object = { ...contract };
              object.contract_number = e.target.value;
              setContract(object);
            }}
          />
        </div>

        <div className="flex flex-column gap-2 m-3">
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
        <div className="flex flex-column gap-2 m-3">
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
        <div className="flex flex-column gap-2 m-3">
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
        <div className="flex flex-column gap-2 m-3">
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
        <div className="flex flex-column gap-2 m-3">
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

        <div className="flex gap-5 justify-center m-3">
          <Button
            label="Modificar"
            severity="info"
            className="w-110"
            onClick={() => {
              modificarContrato(idContrato);
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

export default EditarContratoModal;
