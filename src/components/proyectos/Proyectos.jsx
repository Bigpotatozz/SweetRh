import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { activeReload, deactiveReload } from "../../state/slice/ReloadSlice";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import axios from "axios";
import { Outlet, useNavigate } from "react-router";

export const Proyectos = () => {
  const navigate = useNavigate();
  const [proyectos, setProyectos] = useState([]);

  const reloadReducer = useSelector((state) => state.reload);
  const dispatch = useDispatch();
  const [valueBuscador, setValueBuscador] = useState("");

  const exportExcel = () => {};

  const obtenerProyectos = async () => {
    try {
      const response = await axios.get("http://localhost:3000/project/");
      console.log(response.data);

      if (response.data.status === 404) {
        return;
      }
      setProyectos(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    obtenerProyectos();
  }, []);

  useEffect(() => {
    dispatch(deactiveReload());
  }, [reloadReducer]);

  return (
    <div className="w-full">
      <div className="flex justify-between gap-2 w-full">
        <Button
          label="Nuevo contrato"
          severity="success"
          onClick={() => {
            //setVisible2(true);
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
        value={proyectos}
        scrollable
        scrollHeight="700px"
        className="mt-4  w-full "
        search
        onRowClick={(e) => {
          navigate(`/proyecto/${e.data.id_project}`);
        }}
        selectionMode={"single"}
        globalFilter={valueBuscador}
      >
        <Column
          field="name"
          header="Project name."
          style={{ minWidth: "200px" }}
          frozen
          className="font-bold"
          sortable
        ></Column>

        <Column
          field="status"
          header="Estado"
          style={{ minWidth: "200px" }}
          frozen
          sortable
        ></Column>
        <Column
          field="employee.name"
          header="Responsable"
          style={{ minWidth: "100px" }}
          sortable
        ></Column>
        <Column
          field="description"
          header="Descripción"
          style={{ minWidth: "200px" }}
          sortable
        ></Column>
        <Column
          header="Acciones"
          style={{ minWidth: "200px" }}
          alignFrozen="right"
          body={() => {
            return (
              <>
                <div className="flex align-items-center gap-2">
                  <i
                    className="pi pi-pen-to-square cursor-pointer"
                    style={{ color: "blue", fontSize: "1.2rem" }}
                    onClick={() => {}}
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
