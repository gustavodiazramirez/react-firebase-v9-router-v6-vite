import { useContext } from "react";
import { UserContext } from "../context/userProvider";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import erroresFirebase from "../utils/erroresFirebase";
import FormError from "../components/FormError";
import { formValidate } from "../utils/formValidate";
import FormInput from "../components/FormInput";
export const Register = () => {
  const navegate = useNavigate();
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
      await registerUser(email, password);
      navegate("/");
    } catch (error) {
      console.log(error.code);
      setError("firebase", { message: erroresFirebase(error.code) });
    }
  };

  return (
    <>
      <h1>REGISTRO</h1>
      <FormError error={errors.firebase} />
      <form onSubmit={handleSubmit(onSubmit)}>
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

        <FormInput
          type="password"
          placeholder="Repita la contraseña"
          {...register("repassword", {
            validate: validateEquals(getValues),
          })}
        ></FormInput>
        <FormError error={errors.repassword} />
        
        <button type="submit">Register</button>
      </form>
    </>
  );
};
export default Register;
