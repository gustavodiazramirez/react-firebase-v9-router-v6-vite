import React from "react";
import { useState } from "react";
import { useContext } from "react";
import { UserContext } from "../context/userProvider";
import { useNavigate } from "react-router-dom";
export const Register = () => {
  const [email, setEmail] = useState("test@test.com");
  const [password, setPassword] = useState("123123");
  const { registerUser } = useContext(UserContext);
const navegate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await registerUser(email, password);
      console.log(user);
      navegate("/");
    } catch (error) {
      console.log(error.code);
      if (error.code === "auth/email-already-in-use") {
        console.log("El correo ya esta en uso");
      }
      if (error.code === "auth/invalid-email") {
        console.log("El correo no es valido");
      }
      if (error.code === "auth/weak-password") {
        console.log("La contraseña es muy debil");
      }
      if (error.code === "auth/operation-not-allowed") {
        console.log("El correo no esta habilitado");
      }
    }
  };
  return (
    <>
      <h1>REGISTRO</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Ingrese Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Ingrese contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Register</button>
      </form>
    </>
  );
};
export default Register;
