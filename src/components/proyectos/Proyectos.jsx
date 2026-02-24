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

  const obtenerProyectos = async () => {
    try {
      const response = await axios.get("http://localhost:3000/project/");
      console.log(response.data);

      if (Array.isArray(response.data)) {
        setProyectos(response.data);
      } else {
        console.warn("API response is not an array:", response.data);
        setProyectos([]);
      }
    } catch (e) {
      console.error("Error fetching projects:", e);
      setProyectos([]);
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
        value={Array.isArray(proyectos) ? proyectos : []}
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
          header="Empleados"
          body={(rowData) => {
            return (
              <span>
                {rowData.employees && rowData.employees.length > 0
                  ? rowData.employees.map((emp) => emp.name).join(", ")
                  : "Sin empleados"}
              </span>
            );
          }}
          style={{ minWidth: "150px" }}
          sortable
        ></Column>
        <Column
          field="description"
          header="Descripción"
          style={{ minWidth: "200px" }}
          sortable
        ></Column>
      </DataTable>
    </div>
  );
};
