import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FiLogIn } from "react-icons/fi";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { baseApiURL } from "../baseUrl";

const Login = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState("Student");
  const { register, handleSubmit } = useForm();
  const roles = ["Student", "Faculty", "Admin"];

  const onSubmit = (data) => {
    if (data.login !== "" && data.password !== "") {
      const headers = {
        "Content-Type": "application/json",
      };
      axios
        .post(`${baseApiURL()}/${selected.toLowerCase()}/auth/login`, data, {
          headers: headers,
        })
        .then((response) => {
          navigate(`/${selected.toLowerCase()}`, {
            state: { type: selected, loginid: response.data.loginid },
          });
        })
        .catch((error) => {
          toast.dismiss();
          console.error(error);
          toast.error(error.response.data.message);
        });
    }
  };

  return (
    <div className="bg-slate-200 h-[100vh] w-full flex justify-between items-center">
      <div className="relative w-[70%] h-[100vh] overflow-hidden bg-slate-400">
        <div className="flex items-center justify-center min-h-screen ">
          <p className="font-semibold text-5xl text-white">
            Welcome to our Portal!
          </p>
        </div>
      </div>

      <div className="w-[40%] flex justify-center items-start flex-col pl-8">
        <p className="text-xl text-slate-600 font-semibold">
          {selected && selected} Login
        </p>
        <form
          className="flex justify-center items-start flex-col w-full mt-6"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-col w-[70%]">
            <label
              className="mb-1 font-semibold text-xs text-slate-500"
              htmlFor="eno"
            >
              {selected && selected} Login ID
            </label>
            <input
              type="number"
              id="eno"
              required
              className="bg-white text-xs font-extralight h-12 outline-none border-2 border-white py-2 px-4 rounded-md w-full focus:border-2 focus:border-slate-400 transition-all duration-200"
              {...register("loginid")}
            />
          </div>
          <div className="flex flex-col w-[70%] mt-3">
            <label
              className="mb-1 font-semibold text-xs text-slate-500"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              required
              className="bg-white text-xs font-extralight h-12 outline-none border-2 border-white py-2 px-4 rounded-md w-full focus:border-2 focus:border-slate-400 transition-all duration-200"
              {...register("password")}
            />
          </div>
          <button className="bg-slate-500 mt-5 text-slate-200 hover:text-sla text-sm px-14 py-4 rounded-lg  hover:bg-slate-700 ease-linear duration-300 hover:ease-linear hover:duration-300 hover:transition-all transition-all flex justify-center items-center">
            Login
            <span className="ml-2">
              <FiLogIn />
            </span>
          </button>
        </form>
      </div>
      <div className="absolute top-4 right-4 flex space-x-4">
        {roles.map((role) => (
          <button
            key={role}
            className={`text-base font-semibold hover:text-slate-700 hover:border-slate-400 hover:bg-slate-100 text-slate-600 transition-all duration-300 border-b-2 px-2 py-1 rounded-md
        ${
          selected === role
            ? "border-slate-600 text-slate-700"
            : "border-transparent hover:text-slate-700 hover:border-slate-400 hover:bg-slate-100"
        }`}
            onClick={() => setSelected(role)}
          >
            {role}
          </button>
        ))}
      </div>

      <Toaster position="bottom-center" />
    </div>
  );
};

export default Login;
