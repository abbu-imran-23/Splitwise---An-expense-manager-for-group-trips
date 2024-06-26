import { AUTH_TYPES } from "../constants/AuthTypes";
import Input from "../components/Input";
import Button from "../components/Button";
import { useLocation, useNavigate } from "react-router-dom";
import { AUTH_ENDPOINTS } from "../services/ApiEndpoints";
import toast from "react-hot-toast";
import { HTTP_METHODS } from "../constants/HttpMethods";
import { apiConnector } from "../services/apiConnector";
import React, { useEffect, useState } from "react";
import { AuthFormInputs } from "../constants/AuthFormInputs";

const Auth = () => {
  const location = useLocation();

  const [authType, setAuthType] = useState(
    location.pathname === "/register" ? AUTH_TYPES.REGISTER : AUTH_TYPES.LOGIN
  );

  const [authFormData, setAuthFormData] = useState(
    location.pathname === "/register"
      ? {
          name: "",
          email: "",
          password: "",
        }
      : {
          email: "",
          password: "",
        }
  );

  const [loading, setIsLoading] = useState(false);
  const [apiResponse, setApiResponse] = useState({});

  const navigate = useNavigate();

  const switchAuthPage = () => {
    if (authType === AUTH_TYPES.LOGIN) {
      navigate("/register");
      setAuthType(AUTH_TYPES.REGISTER);
      setAuthFormData({
        name: "",
        email: "",
        password: "",
      });
    } else {
      navigate("/login");
      setAuthType(AUTH_TYPES.LOGIN);
      setAuthFormData({
        email: "",
        password: "",
      });
    }
  };

  const handleInputChange = (name, value) => {
    setAuthFormData((prevAuthFormData) => ({
      ...prevAuthFormData,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (authType === AUTH_TYPES.LOGIN) {
      if (apiResponse.success) {
        toast.success("Login successful");
        localStorage.setItem("authToken", apiResponse.authToken);
        apiResponse.data.authToken = apiResponse.authToken;
        localStorage.setItem("user", JSON.stringify(apiResponse.data));
        const userId = apiResponse.data._id;
        navigate(`/dashboard/${userId}`);
      } else {
        if (!apiResponse.success) {
          setAuthFormData({
            email: authFormData.email,
            password: "",
          });
          if (apiResponse.message) {
            toast.error(apiResponse.message);
          }
        }
      }
    } else {
      if (apiResponse.success) {
        toast.success("Registered successfully");
        navigate("/login");
        setAuthType(AUTH_TYPES.LOGIN);
        setAuthFormData({
          email: "",
          password: "",
        });
      } else {
        if (!apiResponse.success) {
          setAuthFormData({
            name: authFormData.name,
            email: "",
            password: "",
          });
          if (apiResponse.message) {
            toast.error(apiResponse.message);
          }
        }
      }
    }
  }, [apiResponse]);

  const setApiResponseData = (response) => {
    if (response && response.data) {
      setApiResponse(response.data);
    } else if (response && response.response.data) {
      setApiResponse(response.response.data);
    }
  }

  const register = async () => {
    try {
      setIsLoading(true);
      loading ?? toast.loading("loading...");

      const response = await apiConnector(
        HTTP_METHODS.POST,
        AUTH_ENDPOINTS.SIGNUP_API,
        authFormData
      );

      setApiResponseData(response);

      setIsLoading(false);
    } catch (error) {
      console.error("Error occurred while registering:", error);
      toast.error("An error occurred while registering. Please try again later.");
    }
  };

  const login = async () => {
    setIsLoading(true);
    loading ?? toast.loading("loading...");

    try {
      const response = await apiConnector(
        HTTP_METHODS.POST,
        AUTH_ENDPOINTS.LOGIN_API,
        authFormData
      );

      setApiResponseData(response);

      setIsLoading(false);
    } catch (error) {
      console.error("Error occurred during login:", error);
      toast.error("An error occurred during login. Please try again later.");
    }
  };

  const handleAuthFormSubmit = (
    event
  ) => {
    event.preventDefault();
    if (authType === AUTH_TYPES.REGISTER) {
      register();
    } else {
      login();
    }
  };

  return (
    <>
      <div className="bg-slate-800 min-h-screen min-w-screen flex flex-col justify-center items-center">
        <div className="bg-slate-900 px-7 py-12 w-[85%] sm:w-3/4 md:w-2/4 lg:w-1/3 xl:w-1/4 rounded-md flex flex-col gap-3">
          <h4 className="text-white text-3xl mb-4 text-center text-opacity-85 sm:text-4xl md:text-5xl">
            Welcome to{" "}
            <span className="text-green-600 font-semibold">Splitwise</span>
          </h4>
          <form onSubmit={handleAuthFormSubmit}>
            <div className="flex flex-col gap-5">
              {authType === AUTH_TYPES.REGISTER ? (
                <Input
                  label="Name"
                  type="text"
                  name="name"
                  id="name"
                  value={authFormData.name || " "}
                  getInputValue={(value) => {
                    handleInputChange("name", value);
                  }}
                />
              ) : (
                <></>
              )}

              {AuthFormInputs.map((input, index) => {
                return (
                  <Input
                    key={index}
                    label={input.label}
                    type={input.type}
                    name={input.name}
                    id={input.id}
                    value={authFormData[input.id]}
                    getInputValue={(value) => {
                      handleInputChange(input.id, value);
                    }}
                  />
                );
              })}
            </div>
            <div className="flex justify-center">
              <Button
                type={authType === AUTH_TYPES.LOGIN ? "Login" : "Register"}
              />
            </div>
          </form>
          <h5 className="text-white text-center text-[1.15rem] text-opacity-85 sm:text-lg md:text-xl">
            {authType === AUTH_TYPES.LOGIN
              ? "Don't have account, create "
              : "Already have account "}
            <span
              onClick={switchAuthPage}
              className="text-green-600 hover:text-green-500  font-semibold cursor-pointer"
            >
              {authType === AUTH_TYPES.LOGIN ? "new account" : "login"}
            </span>
          </h5>
        </div>
      </div>
    </>
  );
};

export default Auth;
