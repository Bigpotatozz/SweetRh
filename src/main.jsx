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
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router}></RouterProvider>
);
