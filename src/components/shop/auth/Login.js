import React, { Fragment, useState, useContext } from "react";
import { loginReq } from "./fetchApi";
import { LayoutContext } from "../index";
import { useSnackbar } from 'notistack';

const Login = (props) => {
  const { data: layoutData, dispatch: layoutDispatch } = useContext(
    LayoutContext
  );

  const [data, setData] = useState({
    email: "",
    password: "",
    error: false,
    loading: true,
  });

  const alert = (msg) => <div className="text-xs text-red-600">{msg}</div>;

  const { enqueueSnackbar } = useSnackbar();

  const formSubmit = async () => {
    setData({ ...data, loading: true });
    try {
      let responseData = await loginReq({
        email: data.email,
        password: data.password,
      });
      if (responseData.error) {
        setData({
          ...data,
          loading: false,
          error: responseData.error,
          password: "",
        });
      } else if (responseData.token) {
        setData({ email: "", password: "", loading: false, error: false });
        localStorage.setItem("jwt", JSON.stringify(responseData));
        enqueueSnackbar('Login Completed Successfully..!', { variant: 'success' })
        window.location.href = "/";
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Fragment>
      <div className="max-w-md mx-auto bg-white p-8">
        <div className="text-center text-3xl font-semibold mb-8 text-gray-800">Login</div>

        {layoutData.loginSignupError ? (
          <div className="bg-red-50 border border-red-200 text-red-700 py-3 px-4 rounded-lg mb-6">
            You need to login for checkout. Haven't account? Create new one.
          </div>
        ) : (
          ""
        )}

        <form className="space-y-6">
          <div className="flex flex-col">
            <label htmlFor="name" className="text-gray-700 font-medium mb-2">
              Username or email address
              <span className="text-red-500 ml-1">*</span>
            </label>
            <input
              onChange={(e) => {
                setData({ ...data, email: e.target.value, error: false });
                layoutDispatch({ type: "loginSignupError", payload: false });
              }}
              value={data.email}
              type="text"
              id="name"
              className={`${
                !data.error ? "border-gray-300" : "border-red-500"
              } px-4 py-3 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 border rounded-lg bg-gray-50 transition-colors`}
              placeholder="Enter your email"
            />
            {!data.error ? "" : alert(data.error)}
          </div>
          <div className="flex flex-col">
            <label htmlFor="password" className="text-gray-700 font-medium mb-2">
              Password<span className="text-red-500 ml-1">*</span>
            </label>
            <input
              onChange={(e) => {
                setData({ ...data, password: e.target.value, error: false });
                layoutDispatch({ type: "loginSignupError", payload: false });
              }}
              value={data.password}
              type="password"
              id="password"
              className={`${
                !data.error ? "border-gray-300" : "border-red-500"
              } px-4 py-3 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 border rounded-lg bg-gray-50 transition-colors`}
              placeholder="Enter your password"
            />
            {!data.error ? "" : alert(data.error)}
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
            Login
          </button>
        </form>
      </div>
    </Fragment>
  );
};

export default Login;
