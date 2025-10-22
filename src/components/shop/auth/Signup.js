import React, { Fragment, useState } from "react";
import { signupReq } from "./fetchApi";
import { useSnackbar } from 'notistack';

const Signup = (props) => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    cPassword: "",
    error: false,
    loading: false,
    success: false,
  });

  const alert = (msg, type) => (
    <div className={`text-xs text-${type}-600`}>{msg}</div>
  );
  const { enqueueSnackbar } = useSnackbar();
  const formSubmit = async () => {
    setData({ ...data, loading: true });
    if (data.cPassword !== data.password) {
      return setData({
        ...data,
        error: {
          cPassword: "Password doesn't match",
          password: "Password doesn't match",
        },
      });
    }
    try {
      let responseData = await signupReq({
        name: data.name,
        email: data.email,
        password: data.password,
        cPassword: data.cPassword,
      });
      if (responseData.error) {
        setData({
          ...data,
          loading: false,
          error: responseData.error,
          password: "",
          cPassword: "",
        });
      } else if (responseData.success) {
        setData({
          success: responseData.success,
          name: "",
          email: "",
          password: "",
          cPassword: "",
          loading: false,
          error: false,
        })
        enqueueSnackbar('Account Created Successfully..!', { variant: 'success' })
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Fragment>
      <div className="max-w-md mx-auto bg-white p-8">
        <div className="text-center text-3xl font-semibold mb-8 text-gray-800">Register</div>

        <form className="space-y-6">
          {data.success ? (
            <div className="bg-green-50 border border-green-200 text-green-700 py-3 px-4 rounded-lg text-sm">
              {data.success}
            </div>
          ) : ""}
          <div className="flex flex-col">
            <label htmlFor="name" className="text-gray-700 font-medium mb-2">
              Name<span className="text-red-500 ml-1">*</span>
            </label>
            <input
              onChange={(e) =>
                setData({
                  ...data,
                  success: false,
                  error: {},
                  name: e.target.value,
                })
              }
              value={data.name}
              type="text"
              id="name"
              className={`${
                data.error.name ? "border-red-500" : "border-gray-300"
              } px-4 py-3 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 border rounded-lg bg-gray-50 transition-colors`}
              placeholder="Enter your name"
            />
            {!data.error ? "" : alert(data.error.name, "red")}
          </div>
          <div className="flex flex-col">
            <label htmlFor="email" className="text-gray-700 font-medium mb-2">
              Email address<span className="text-red-500 ml-1">*</span>
            </label>
            <input
              onChange={(e) =>
                setData({
                  ...data,
                  success: false,
                  error: {},
                  email: e.target.value,
                })
              }
              value={data.email}
              type="email"
              id="email"
              className={`${
                data.error.email ? "border-red-500" : "border-gray-300"
              } px-4 py-3 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 border rounded-lg bg-gray-50 transition-colors`}
              placeholder="Enter your email"
            />
            {!data.error ? "" : alert(data.error.email, "red")}
          </div>
          <div className="flex flex-col">
            <label htmlFor="password" className="text-gray-700 font-medium mb-2">
              Password<span className="text-red-500 ml-1">*</span>
            </label>
            <input
              onChange={(e) =>
                setData({
                  ...data,
                  success: false,
                  error: {},
                  password: e.target.value,
                })
              }
              value={data.password}
              type="password"
              id="password"
              className={`${
                data.error.password ? "border-red-500" : "border-gray-300"
              } px-4 py-3 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 border rounded-lg bg-gray-50 transition-colors`}
              placeholder="Enter your password"
            />
            {!data.error ? "" : alert(data.error.password, "red")}
          </div>
          <div className="flex flex-col">
            <label htmlFor="cPassword" className="text-gray-700 font-medium mb-2">
              Confirm password
              <span className="text-red-500 ml-1">*</span>
            </label>
            <input
              onChange={(e) =>
                setData({
                  ...data,
                  success: false,
                  error: {},
                  cPassword: e.target.value,
                })
              }
              value={data.cPassword}
              type="password"
              id="cPassword"
              className={`${
                data.error.cPassword ? "border-red-500" : "border-gray-300"
              } px-4 py-3 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 border rounded-lg bg-gray-50 transition-colors`}
              placeholder="Confirm your password"
            />
            {!data.error ? "" : alert(data.error.cPassword, "red")}
          </div>
          <div className="flex flex-col space-y-3 md:flex-row md:justify-between md:items-center md:space-y-0">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="rememberMe"
                className="w-4 h-4 text-green-600 focus:ring-green-500 border-gray-300 rounded cursor-pointer"
              />
              <label htmlFor="rememberMe" className="ml-2 text-gray-600 cursor-pointer">
                Remember me
              </label>
            </div>
            <a className="text-green-700 hover:text-green-800 font-medium transition-colors" href="/">
              Lost your password?
            </a>
          </div>

          <button
            type="button"
            onClick={(e) => formSubmit()}
            className="w-full bg-green-700 hover:bg-green-800 font-semibold px-4 py-3 text-white text-center cursor-pointer rounded-lg transition-colors shadow-md hover:shadow-lg"
          >
            Create an account
          </button>
        </form>
      </div>
    </Fragment>
  );
};

export default Signup;
