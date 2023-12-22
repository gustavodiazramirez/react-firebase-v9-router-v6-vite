import React from "react";

export const erroresFirebase = (code) => {
  switch (code) {
    case "auth/email-already-in-use":
      return "El email ya esta en uso";

    case "auth/invalid-email":
      return "El email no es valido";

    case "auth/too-many-requests":
      return "Demasiados intentos de inicio de sesión fallidos. Inténtalo de nuevo más tarde.";
    case "auth/wrong-password":
      return "La contraseña no es correcta";
    case "auth/user-not-found":
      return "Usuario no encontrado";
    case "auth/weak-password":
      return "La contraseña debe tener 6 caracteres o más";
    case "auth/operation-not-allowed":
      return "Operación no permitida";
      case "auth/invalid-credential":
      return "Credenciales no válidas";
    default:
      break;
  }
};
export default erroresFirebase;
