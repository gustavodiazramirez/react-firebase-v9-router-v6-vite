import React, { useState } from "react";
import { useContext } from "react";
import { UserContext } from "../context/userProvider";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import erroresFirebase from "../utils/erroresFirebase";
import FormError from "../components/FormError";
import FormInput from "../components/FormInput";
import { formValidate } from "../utils/formValidate";
import Title from "../components/Title";
import Button from "../components/Button";
import ButtonLoading from "../components/ButtonLoading";
export const Login = () => {

  
  const { loginUser } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
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
      setLoading(true);
      await loginUser(email, password);
      console.log("loginUser");
      navigate("/");
    } catch (error) {
      console.log(error.code);
      const { code, message } = erroresFirebase(error.code);
      setError(code, { message });
    }
    finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="mt-64">
        <Title text="Inicio de sesión" />
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormError error={errors.firebase} />
          <FormInput
            type="email"
            placeholder="Ingrese Email"
            {...register("email", { required, pattern: patternEmail })}
            label="Ingresa tu email"
            error={errors.email}
          ></FormInput>
          <FormError error={errors.email} />

          <FormInput
            type="password"
            placeholder="Ingrese contraseña"
            {...register("password", {
              minLength,
              validate: validateTrim,
            })}
            label="Ingresa tu contraseña"
            error={errors.password}
          ></FormInput>
          <FormError error={errors.password} />
          <div className="mb-5">
            <p
              id="helper-text-explanation"
              className="mt-2 text-sm text-gray-500 dark:text-gray-400"
            >
              ¿No tienes una cuenta?{" "}
              <a
                href="/register"
                className="font-medium text-blue-600 hover:underline dark:text-blue-500"
              >
                Crear una cuenta aquí
              </a>
              .
            </p>
          </div>
          {
            loading ? <ButtonLoading/> :  <Button text="Acceder" />
          }
         
        </form>
      </div>
    </>
  );
};
export default Login;
