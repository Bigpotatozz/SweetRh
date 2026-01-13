import { InputText } from "primereact/inputtext";
import React from "react";

const PersonalizedInput = ({ label, id }) => {
  return (
    <div>
      <div className="card flex mt-2">
        <div className="flex flex-column gap-2">
          <label htmlFor="po2">{label}</label>
          <InputText id={id} aria-describedby="po2" />
        </div>
      </div>
    </div>
  );
};

export default PersonalizedInput;
