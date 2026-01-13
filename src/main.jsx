import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import "./index.css";
import App from "./App.jsx";
import "primereact/resources/themes/bootstrap4-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css"; // [][]
import "primereact/resources/themes/lara-light-cyan/theme.css";
import { Schedule } from "./components/schedule/Schedule.jsx";
import { Proyectos } from "./components/proyectos/Proyectos.jsx";
import { Raidd } from "./components/raidd/Raidd.jsx";
import { Contratos } from "./components/contratos/Contratos.jsx";
import VistaGeneralActividades from "./components/actividades/vistaGeneral/VistaGeneralActividades.jsx";
import { Provider } from "react-redux";
import { store } from "./state/store.js";
import RegistrarActividades from "./components/contratos/registrar/RegistrarActividades.jsx";
import Pasos from "./components/contratos/registrar/Pasos.jsx";
import RegistrarContrato from "./components/contratos/registrar/RegistrarContrato.jsx";
import RegistrarProyecto from "./components/contratos/registrar/RegistrarProyecto.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    children: [
      {
        path: "/schedule",
        element: <Schedule></Schedule>,
      },

      {
        path: "/actividades",
        element: <VistaGeneralActividades></VistaGeneralActividades>,
      },

      {
        path: "/proyectos",
        element: <Proyectos></Proyectos>,
      },
      {
        path: "/raidd",
        element: <Raidd></Raidd>,
      },
      {
        path: "/contratos",
        element: <Contratos></Contratos>,
      },

      {
        path: "/nuevoContrato",
        element: <Pasos></Pasos>,
        children: [
          {
            path: "registrarContrato",
            element: <RegistrarContrato></RegistrarContrato>,
          },
          {
            path: "registrarProyecto",
            element: <RegistrarProyecto></RegistrarProyecto>,
          },
          {
            path: "registrarActividades",
            element: <RegistrarActividades></RegistrarActividades>,
          },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router}></RouterProvider>
  </Provider>
);
