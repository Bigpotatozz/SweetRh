import "./App.css";

import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Navbar } from "./components/nav/Navbar";
import { PrimeReactProvider, PrimeReactContext } from "primereact/api";
import { Outlet } from "react-router";

function App() {
  return (
    <>
      <PrimeReactProvider>
        <div className="flex p-5 gap-5">
          <Navbar></Navbar>

          <Outlet></Outlet>
        </div>
      </PrimeReactProvider>
    </>
  );
}

export default App;
