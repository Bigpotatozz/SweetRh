import React, { useState } from "react";
import { Menu } from "primereact/menu";
import logoOkaya from "../../assets/logo_okaya.png";
import { useNavigate } from "react-router";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Calendar } from "lucide-react";
import AgregarActividadModal from "../actividades/components/AgregarActividadModal";
import ModificarActividadModal from "../actividades/components/ModificarActividadModal";
import EliminarActividadModal from "../actividades/components/EliminarActividadModal";

export const Navbar = () => {
  const navigate = useNavigate();

  const [visible, setVisible] = useState(false);
  const [visible2, setVisible2] = useState(false);
  const [visible3, setVisible3] = useState(false);

  const setFalseModal = () => {
    setVisible(false);
  };

  const onVisible2 = () => {
    setVisible2(false);
  };

  const onVisible3 = () => {
    setVisible3(false);
  };

  const items = [
    {
      template: () => {
        return (
          <div className="p-3 flex items-center">
            <img src={logoOkaya} style={{ width: "50%" }}></img>
            <span className="font-medium text-xl font-semibold">
              <span className="text-primary">OKAYA</span>
            </span>
          </div>
        );
      },
    },

    {
      label: "Schedule",
      items: [
        {
          label: "Ver agenda",
          icon: "pi pi-calendar",
          command: () => {
            navigate("/schedule");
          },
        },
        {
          label: "Agregar actividad",
          icon: "pi pi-calendar-plus",
          command: () => {
            setVisible(true);
          },
        },
        {
          label: "Modificar actividad",
          icon: "pi pi-pen-to-square",
          command: () => {
            setVisible2(true);
          },
        },

        {
          label: "Eliminar actividad",
          icon: "pi pi-trash",
          command: () => {
            setVisible3(true);
          },
        },
      ],
    },

    {
      label: "Proyectos",
      items: [
        {
          label: "Ver proyectos",
          icon: "pi pi-folder",
          command: () => {
            navigate("/proyectos");
          },
        },

        {
          label: "Nuevo proyecto",
          icon: "pi pi-folder-plus",
        },
      ],
    },

    {
      label: "Raidd",
      items: [
        {
          label: "Ver raidd",
          icon: "pi pi-eye",
          command: () => {
            navigate("/raidd");
          },
        },
      ],
    },
    {
      label: "Contratos",
      items: [
        {
          label: "Ver contratos",
          icon: "pi pi-file",
          command: () => {
            navigate("/contratos");
          },
        },
        {
          label: "Nuevo contrato",
          icon: "pi pi-file-import",
        },
      ],
    },
  ];
  return (
    <>
      <div className="w-48 h-screen">
        <EliminarActividadModal
          visible3={visible3}
          onVisible3={onVisible3}
        ></EliminarActividadModal>
        <ModificarActividadModal
          visible2={visible2}
          onVisible2={onVisible2}
        ></ModificarActividadModal>
        <AgregarActividadModal
          visible={visible}
          onSetFalseModal={setFalseModal}
        ></AgregarActividadModal>
        <Menu
          model={items}
          pt={{
            root: { style: { borderRadius: "8px" } },
          }}
        />
      </div>
    </>
  );
};
