import React from 'react';
import { useFormContext } from "react-hook-form";
//import { DynamicFieldData } from "./dynamic-control-types";

export const DynamicControl = ({
  inputType,
  fieldName,
  defaultValue,
  options = [],
  config = {}
}) => {
  const { register } = useFormContext();

  switch (inputType) {
    case "text":
      return (
        <input
          id={fieldName}
          type="text"
          {...register(fieldName, config)}
          defaultValue={defaultValue}
        />
      );
    case "select": {
      return (
        <select
          {...register(fieldName, config)}
          defaultValue={defaultValue}
          name={fieldName}
          id={fieldName}
        >
          {options.map((o, index) => (
            <option key={index} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      );
    }
    case "number":
      return (
        <input
          type="number"
          id={fieldName}
          {...register(fieldName, config)}
          defaultValue={defaultValue}
        />
      );
    default:
      return <input type="text" />;
  }
};
