import { useEffect } from "react";
import "./App.css";

import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Navbar } from "./components/nav/Navbar";
import { PrimeReactProvider, PrimeReactContext } from "primereact/api";
import { Outlet } from "react-router";
import { io } from "socket.io-client";

//Se importa primeReact para el uso de la libreria
//Se importa la navbar
//Se importa donde se renderizaran los distintos componentes
function App() {
  return (
    <>
      <PrimeReactProvider>
        <div className="flex p-5 gap-5 ">
          <Navbar></Navbar>

          <Outlet></Outlet>
        </div>
      </PrimeReactProvider>
    </>
  );
}

export default App;
