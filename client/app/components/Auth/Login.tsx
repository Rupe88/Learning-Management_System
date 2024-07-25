"use client";
import React, { FC, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  AiFillGithub,
  AiOutlineEye,
  AiOutlineEyeInvisible,
} from "react-icons/ai";
import { styles } from "../../../app/styles/style";
import { FcGoogle } from "react-icons/fc";

type Props = {
  setRoute: (route: string) => void;
};

const schema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email!")
    .required("Please enter Your Email"),
  password: Yup.string().required("Please enter Your Password").min(6),
});

const Login: FC<Props> = ({ setRoute }) => {
  const [show, setShow] = useState(false);

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: schema,
    onSubmit: async ({ email, password }) => {
      console.log(email, password);
    },
  });

  const { errors, touched, values, handleChange, handleSubmit } = formik;
  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white dark:bg-gray-800 shadow-md rounded-lg">
      <h1 className={`${styles.title}`}>Login with LMS</h1>
      <form onSubmit={handleSubmit}>
        <label className={`${styles.label}`}>Enter Your Email</label>
        <input
          type="email"
          name="email"
          value={values.email}
          onChange={handleChange}
          id="email"
          placeholder="example123@gmail.com"
          className={`${errors.email && touched.email ? "border-red-500" : "border-gray-300"} ${styles.input}`}
        />
        {errors.email && touched.email && (
          <span className="text-red-500 pt-2 block">{errors.email}</span>
        )}
        <div className="w-full mt-5 relative mb-5">
          <label className={`${styles.label}`}>Enter Your Password</label>
          <input
            type={!show ? "password" : "text"}
            name="password"
            id="password"
            value={values.password}
            onChange={handleChange}
            placeholder="Password"
            className={`${errors.password && touched.password ? "border-red-500" : "border-gray-300"} ${styles.input}`}
          />
          {!show ? (
            <AiOutlineEyeInvisible
              className="absolute bottom-3 right-2 z-10 cursor-pointer text-gray-600 dark:text-gray-300"
              size={20}
              onClick={() => setShow(true)}
            />
          ) : (
            <AiOutlineEye
              className="absolute bottom-3 right-2 z-10 cursor-pointer text-gray-600 dark:text-gray-300"
              size={20}
              onClick={() => setShow(false)}
            />
          )}
         
        </div>
        {errors.password && touched.password && (
            <span className="text-red-500 pt-2 block">{errors.password}</span>
          )}
        <div className="w-full mt-5">
          <input
            type="submit"
            value="Login"
            className={`${styles.button} hover:bg-blue-600 dark:hover:bg-blue-700 transition-colors duration-300`}
          />
        </div>
        <div className="text-center mt-4">
          <h5 className="text-sm font-Poppins text-gray-700 dark:text-gray-300">Or join with</h5>
          <div className="flex items-center justify-center my-3">
            <FcGoogle size={30} className="cursor-pointer mx-2" />
            <AiFillGithub size={30} className="cursor-pointer mx-2 text-white" />
          </div>
          <h5 className="text-sm font-Poppins text-gray-700 dark:text-gray-300">
            Dont have an account?{" "}
            <span
              className="text-blue-500 dark:text-blue-400 cursor-pointer"
              onClick={() => setRoute("Sign-Up")}
            >
              Sign Up
            </span>
          </h5>
        </div>
      </form>
    </div>
  );
};

export default Login;


