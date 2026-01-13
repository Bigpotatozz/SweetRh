import { Button } from "primereact/button";
import { Steps } from "primereact/steps";
import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router";

const Pasos = () => {
  const navigate = useNavigate();

  const [activeIndex, setActiveIndex] = useState(0);

  const [stateButtonBack, setStateButtonBack] = useState(true);
  const [stateButtonNext, setStateButtonNext] = useState(false);

  const handleNavigation = () => {
    switch (activeIndex) {
      case 0:
        navigate("/nuevoContrato/registrarContrato");
        break;
      case 1:
        navigate("/nuevoContrato/registrarProyecto");
        break;
      case 2:
        navigate("/nuevoContrato/registrarActividades");
        break;
    }
  };

  useEffect(() => {
    handleNavigation();

    if (activeIndex === 0) {
      setStateButtonBack(true);
    } else {
      setStateButtonBack(false);
    }

    if (activeIndex === 2) {
      setStateButtonNext(true);
    } else {
      setStateButtonNext(false);
    }
  }, [activeIndex]);

  const items = [
    {
      label: "Registrar contrato / proyecto",
      command: () => {
        navigate("/nuevoContrato/registrarContrato");
      },
    },

    {
      label: "Registrar actividades",
      command: () => {
        navigate("/nuevoContrato/registrarActividades");
      },
    },
  ];

  return (
    <div>
      <div className="w-6xl ">
        <Steps model={items} activeIndex={activeIndex} />
      </div>

      <div className="m-5">
        <Outlet></Outlet>
      </div>

      <div className="flex gap-2">
        <Button
          label="Anterior"
          disabled={stateButtonBack}
          onClick={() => {
            setActiveIndex(activeIndex - 1);
          }}
        />
        <Button
          label="Siguiente"
          disabled={stateButtonNext}
          onClick={() => {
            setActiveIndex(activeIndex + 1);
          }}
        />
      </div>
    </div>
  );
};

export default Pasos;
