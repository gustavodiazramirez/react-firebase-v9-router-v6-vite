import { useContext } from "react";
import { UserContext } from "../context/userProvider";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import erroresFirebase from "../utils/erroresFirebase";
import FormError from "../components/FormError";
import { formValidate } from "../utils/formValidate";
import FormInput from "../components/FormInput";
import Title from "../components/Title";
import Button from "../components/Button";
import ButtonLoading from "../components/ButtonLoading";
import { useState } from "react";
export const Register = () => {
  const navegate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { registerUser } = useContext(UserContext);
  const { required, patternEmail, minLength, validateTrim, validateEquals } =
    formValidate();
  const {
    register,
    handleSubmit,
    getValues,
    setError,
    formState: { errors },
  } = useForm();

  const onSubmit = async ({ email, password }) => {
    try {
      setLoading(true);
      await registerUser(email, password);
      navegate("/");
    } catch (error) {
      console.log(error.code);
      const { code, message } = erroresFirebase(error.code);
      setError(code, { message });
    } finally { 
      setLoading(false);
    }
  };

  return (
    <>
      <div className="mt-64">
        <Title text="Registro de usuario" />
        <FormError error={errors.firebase} />
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormInput
            type="email"
            placeholder="Ingrese Email"
            {...register("email", { required, pattern: patternEmail })}
            label="Ingresa tu Email"
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

          <FormInput
            type="password"
            placeholder="Repita la contraseña"
            {...register("repassword", {
              validate: validateEquals(getValues),
            })}
            label="Repita la contraseña"
            error={errors.repassword}
          ></FormInput>
          <FormError error={errors.repassword} />
          {loading ? <ButtonLoading /> : <Button text="Registrar" />}
        </form>
      </div>
    </>
  );
};
export default Register;
