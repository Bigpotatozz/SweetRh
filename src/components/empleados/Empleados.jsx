import axios from "axios";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import React, { useEffect, useState } from "react";
import AgregarEmpleadoModal from "./components/AgregarEmpleadoModal";
import { useDispatch, useSelector } from "react-redux";
import { deactiveReload } from "../../state/slice/ReloadSlice";
import EditarEmpleadoModal from "./components/EditarEmpleadoModal";

const Empleados = () => {
  const [empleados, setEmpleados] = useState([]);
  const [visible, setVisible] = useState(false);

  const [visible2, setVisible2] = useState(false);
  const [idEmpleado, setIdEmpleado] = useState(0);

  const reloadReducer = useSelector((state) => state.reload);
  const dispatch = useDispatch();

  const onSetVisible = () => {
    setVisible(false);
  };

  const onSetVisible2 = () => {
    setVisible2(false);
  };

  const obtenerEmpleados = async () => {
    try {
      const response = await axios.get("http://localhost:3000/employee/list");
      console.log(response.data);
      setEmpleados(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    obtenerEmpleados();
    dispatch(deactiveReload());
  }, [reloadReducer]);
  return (
    <div className="w-full">
      <EditarEmpleadoModal
        visible2={visible2}
        onVisible2={onSetVisible2}
        id={idEmpleado}
      ></EditarEmpleadoModal>
      <AgregarEmpleadoModal
        visible2={visible}
        onVisible2={onSetVisible}
      ></AgregarEmpleadoModal>
      <Button
        label="Registrar persona"
        severity="success"
        className="mb-3"
        onClick={() => {
          setVisible(true);
        }}
      />
      <DataTable
        value={empleados}
        scrollable
        scrollHeight="700px"
        className="w-full"
        search
      >
        <Column
          field="name"
          header="Contract No."
          frozen
          className="font-bold"
          sortable
          headerClassName=""
        ></Column>

        <Column field="position" header="Usuario" frozen sortable></Column>

        <Column
          header="Acciones"
          alignFrozen="right"
          body={(element) => {
            return (
              <>
                <div className="flex align-items-center gap-2">
                  <i
                    className="pi pi-pen-to-square cursor-pointer"
                    style={{ color: "blue", fontSize: "1.2rem" }}
                    onClick={() => {
                      setIdEmpleado(element.id_employee);
                      setVisible2(true);
                    }}
                  ></i>

                  <i
                    className="pi pi-trash cursor-pointer"
                    style={{ color: "red", fontSize: "1.2rem" }}
                    onClick={() => {}}
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

export default Empleados;
