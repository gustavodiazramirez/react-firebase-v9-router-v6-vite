import React from "react";
import { useContext } from "react";
import { UserContext } from "../context/userProvider";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import erroresFirebase from "../utils/erroresFirebase";
import FormError from "../components/FormError";
import FormInput from "../components/FormInput";
import { formValidate } from "../utils/formValidate";
export const Login = () => {
  const { loginUser } = useContext(UserContext);
  const navigate = useNavigate();
  const { required, patternEmail, minLength, validateTrim } = formValidate();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();

  const onSubmit = async ({ email, password }) => {
    try {
      await loginUser(email, password);
      console.log("loginUser");
      navigate("/");
    } catch (error) {
      console.log(error.code);
      setError("firebase", { message: erroresFirebase(error.code) });
    }
  };

  return (
    <>
      <h1>LOGIN</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormError error={errors.firebase} />
        <FormInput
          type="email"
          placeholder="Ingrese Email"
          {...register("email", { required, pattern: patternEmail })}
        ></FormInput>
        <FormError error={errors.email} />

        <FormInput
          type="password"
          placeholder="Ingrese contraseña"
          {...register("password", {
            minLength,
            validate: validateTrim,
          })}
        ></FormInput>
        <FormError error={errors.password} />
        <button type="submit">Acceder</button>
      </form>
    </>
  );
};
export default Login;
