import React from "react";

export const formValidate = (getValues) => {
  return {
    required: { value: true, message: "Este campo es requerido" },
    patternEmail: {
      value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
      message: "El email no es valido",
    },
    minLength: {
      value: 6,
      message: "La contraseña debe tener al menos 6 caracteres",
    },
    validateTrim: {
      trim: (v) => {
        if (!v.trim()) return "No debe contener espacios en blanco";
        true;
      },
    },
    validateEquals(getValues) {
      return {
        equals: (v) =>
          v === getValues("password") || "Las contraseñas no coinciden",
      };
    },
  };
};
