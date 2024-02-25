import { useState } from "react";
import { AUTH_TYPES } from "../constants/AuthTypes";
import { AuthInputs } from "../constants/AuthInputs";
import Input from "../components/Input";
import Button from "../components/Button";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthFormData } from "../interfaces/AuthFormData";
import axios from "axios";
import { AUTH_ENDPOINTS } from "../services/ApiEndpoints";
import toast from "react-hot-toast";

const Auth = () => {

  const location = useLocation();

  const [authType, setAuthType] = useState<string>(
    location.pathname === "/login" ?
    AUTH_TYPES.LOGIN :
    AUTH_TYPES.REGISTER
  );

  const [authFormData, setAuthFormData] = useState<AuthFormData>(
    location.pathname === "/login" ?
    {
      email: "",
      password: ""
    }
    :
    {
      name: "",
      email: "",
      password: ""
    }
  )

  const [loading, setIsLoading] = useState<boolean>(false);
  
  console.log(authType);

  const navigate = useNavigate();

  const switchAuthPage = () => {
    if(authType === AUTH_TYPES.LOGIN) {
      navigate("/register");
      setAuthType(AUTH_TYPES.REGISTER);
      setAuthFormData({
        name: "",
        email: "",
        password: ""
      })
    }
    else {
      navigate("/login");
      setAuthType(AUTH_TYPES.LOGIN);
      setAuthFormData({
        email: "",
        password: ""
      })
    }
  }

  const handleInputChange = (name: string, value: string) => {
    setAuthFormData((prevAuthFormData) => ({
      ...prevAuthFormData,
      [name]: value
    }))
  }

  const handleAuthFormSubmit: React.FocusEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    console.log(authFormData);
    if(authType === AUTH_TYPES.REGISTER) {

      setIsLoading(true);
      loading ?? toast.loading("loading...");
      axios.post(AUTH_ENDPOINTS.SIGNUP_API, authFormData) 
      .then((response) => {
        if(response.data.success) {
          toast.success("Registered successfully");
          navigate("/login");
          setAuthType(AUTH_TYPES.LOGIN);
          setAuthFormData({
            email: "",
            password: ""
          })
        }
        else {
          console.log(response.data.message);
        }
      })
      .catch((error) => {
        console.log("Error while calling Register API ");
        console.log(error);
        if(!error.response.data.success) {
          setAuthFormData({
            name: authFormData.name,
            email: "",
            password: ""
          })
          console.log(error.response.data.message);
          toast.error(error.response.data.message);
        }
      })
      setIsLoading(false);
    }
    else {
      
      setIsLoading(true);
      loading ?? toast.loading("loading...");
      axios.post(AUTH_ENDPOINTS.LOGIN_API, authFormData)
      .then((response) => {
        console.log(response.data);
        if(response.data.success) {
          toast.success("Login successfull");
          navigate("/home");
        }
        else {
          console.log(response.data.message);
        }
      })
      .catch((error) => {
        console.log("Error while calling login API");
        console.log(error);
        if(!error.response.data.success) {
          setAuthFormData({
            email: authFormData.email,
            password: ""
        })
        console.log(error.response.data.message);
        toast.error(error.response.data.message);
        }
      })
      setIsLoading(false);
    }
  }

  return (
    <>
      <div className="bg-slate-800 h-screen w-screen flex flex-col justify-center items-center">
        <div className="bg-slate-900 px-7 py-12 w-1/4 rounded-md flex flex-col gap-3">
          {/* <img height={90} width={90} src="/logo.png" alt="logo" /> */}
          <h4 className="text-white text-3xl mb-4 text-center text-opacity-85">
            Welcome to{" "}
            <span className="text-green-600 font-semibold">Splitwise</span>
          </h4>
          <form onSubmit={handleAuthFormSubmit}>
            <div className="flex flex-col gap-5">

            {
              authType === AUTH_TYPES.REGISTER ?
              <Input
              label="Name"
              type="text"
              name="name"
              id="name"
              value={authFormData.name || " "}
              getInputValue={(value) => {
                handleInputChange("name", value)
              }}
              /> : <></>
            }
            {
              AuthInputs.map((input, index) => {
                return (
                  <Input
                  key={index}
                  label={input.label}
                  type={input.type}
                  name={input.name}
                  id={input.id}
                  value={authFormData[input.id as keyof AuthFormData] || ""}
                  getInputValue={(value) => {
                    handleInputChange(input.id, value);
                  }}
                  />
                )
              })
            }

            </div>
            <div className="flex justify-center">
              <Button type={authType === AUTH_TYPES.LOGIN ? "Login" : "Register"}/>
            </div>
          </form>
          <h5 className="text-white text-center text-[1.15rem] text-opacity-85">
            {
              authType === AUTH_TYPES.LOGIN ?
              "Don't have account, create " : 
              "Already have account "
            }
            <span
            onClick={switchAuthPage}
            className="text-green-600 hover:text-green-500  font-semibold cursor-pointer"
            >
            {
              authType === AUTH_TYPES.LOGIN ?
              "new account" :
              "login"
            }
            </span>
          </h5>
        </div>
        {/* <div className="relative top-40">
          <h4 className="text-white text-center text-[1.15rem] mt-2 text-opacity-85">
            Built with Passion &#x2764; by{" "}
            <span className="text-green-600 hover:text-green-500 font-semibold">
              Imran Pasha
            </span>
          </h4>
        </div> */}
      </div>
    </>
  );
};

export default Auth;
