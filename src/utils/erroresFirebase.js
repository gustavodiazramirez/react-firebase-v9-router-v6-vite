import React from "react";

export const erroresFirebase = (code) => {
  switch (code) {
    case "auth/email-already-in-use":
      return {
        code: "email",
        message: "El email ya esta en uso",
      }

    case "auth/invalid-email":
      return {
        code: "email",
        message: "El email no es valido",
      }

    case "auth/too-many-requests":
      return {
        code: "email",
        message: "Demasiados intentos, espere unos minutos",
      }
    case "auth/wrong-password":
      return {
        code: "password",
        message: "Contraseña incorrecta",
      }
    case "auth/user-not-found":
      return {
        code: "email",
        message: "El email no esta registrado",
      }
    case "auth/weak-password":
      return {
        code: "password",
        message: "La contraseña debe tener 6 caracteres o más",
      }
      case "auth/invalid-credential":
      return {
        code: "email",
        message: "El email y/o contraseña no son validos",
      }
    default:
      break;
  }
};
export default erroresFirebase;
