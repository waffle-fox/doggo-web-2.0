import { FC, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import { getMe, loginUser } from "../redux/slices/auth.slice";

interface IData {
  login: string;
  password: string;
}

const Login: FC = () => {
  const [auth, setAuth] = useState<boolean>(false);
  const { register, handleSubmit } = useForm<IData>();

  const dispatch = useDispatch<AppDispatch>();

  const onSubmit: SubmitHandler<IData> = async inputData => {
    const data = await dispatch(loginUser(inputData));

    const token = data.payload.access_token;

    if (token) {
      localStorage.setItem("token", token);
      await dispatch(getMe());
      setAuth(true);
    }
  };

  if (auth) return <Navigate to="/" />;

  return (
    <section className="text-white bg-neutral-800 p-6 rounded-md flex flex-col gap-y-4 justify-center items-center">
      <h1 className="text-4xl font-thin py-1">Sign in</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-y-6 justify-center items-center">
        <div className="flex flex-col">
          <label htmlFor="login" className="font-light">
            Login
          </label>
          <input
            {...register("login", { required: true })}
            placeholder="login"
            className="text-lg font-light bg-neutral-700 bg-opacity-30 rounded-md border border-transparent hover:border-white focus:border-white outline-none shadow-lg py-1 px-2 transition-all placeholder:opacity-20"
            name="login"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="password" className="font-light">
            Password
          </label>
          <input
            {...register("password", { required: true })}
            placeholder="password"
            className="text-lg font-light bg-neutral-700 bg-opacity-30 rounded-md border border-transparent hover:border-white focus:border-white outline-none shadow-lg py-1 px-2 transition-all placeholder:opacity-20"
            name="password"
          />
        </div>
        <input
          type="submit"
          value="continue"
          className="cursor-pointer bg-neutral-600 rounded w-[40%] py-1 px-1 transition-all hover:bg-white hover:text-black active:translate-y-[1px]"
        />
      </form>
      <div className="flex text-xs font-thin justify-between gap-x-8 opacity-50">
        <p>New to here?</p>
        <Link className="underline" to="/register">
          Get started
        </Link>
      </div>
    </section>
  );
};

export default Login;