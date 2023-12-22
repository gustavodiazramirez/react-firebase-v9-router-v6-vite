import React from "react";
import { useState } from "react";
import { useContext } from "react";
import { UserContext } from "../context/userProvider";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
export const Register = () => {
  const navegate = useNavigate();
  const { registerUser } = useContext(UserContext);

  const {
    register,
    handleSubmit,
    getValues,
    setError,
    formState: { errors },
  } = useForm();

  const onSubmit = async ({ email, password }) => {
    try {
      const user = await registerUser(email, password);
      console.log(user);
      navegate("/");
    } catch (error) {
      console.log(error.code);
      switch (error.code) {
        case "auth/email-already-in-use":
          setError("email", { message: "El email ya esta en uso" });
          break;
        case "auth/invalid-email":
          setError("email", { message: "El email no es valido" });
          break;
        case "auth/weak-password":
          setError("password", { message: "La contraseña es muy debil" });
          break;
        case "auth/too-many-requests":
          setError("email", { message: "Demasiados intentos de registro" });
          break;
        default:
          alert("Error al registrar");
          break;
      }
    }
  };

  return (
    <>
      <h1>REGISTRO</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="email"
          placeholder="Ingrese Email"
          {...register("email", {
            required: { value: true, message: "Este campo es requerido" },
            pattern: {
              value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
              message: "El email no es valido",
            },
          })}
        />
        {errors.email && errors.email.message}
        <input
          type="password"
          placeholder="Ingrese contraseña"
          {...register("password", {
            minLength: {
              value: 6,
              message: "La contraseña debe tener al menos 6 caracteres",
            },
            validate: {
              trim: (v) => {
                if (!v.trim()) return "No debe contener espacios en blanco";
                true;
              },
            },
          })}
        />
        {errors.password && errors.password.message}
        <input
          type="password"
          placeholder="Repita la contraseña"
          {...register("repassword", {
            validate: {
              equals: (v) =>
                v === getValues("password") || "Las contraseñas no coinciden",
            },
          })}
        />
        {errors.repassword && errors.repassword.message}
        <button type="submit">Register</button>
      </form>
    </>
  );
};
export default Register;
