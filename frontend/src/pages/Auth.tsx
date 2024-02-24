import { useState } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import { AuthInputs } from "../constants/AuthInputs";
import { useNavigate } from "react-router-dom";
import { AUTH_TYPES } from "../constants/AuthTypes";
import { AuthFormData } from "../interfaces/AuthFormData";

const Auth = () => {

  const [authType, setAuthType] = useState(AUTH_TYPES.LOGIN);
  const [authFormData, setAuthFormData] = useState<AuthFormData>({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const navigateToRegisterPage = () => {
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

  const handleInputChange = (name: string, value: string) => {
    setAuthFormData((prevAuthFormData) => ({
      ...prevAuthFormData,
      [name]: value,
    }));
  };

  const handleAuthFormSubmit: React.FormEventHandler<HTMLFormElement> = (
    event
  ) => {
    event.preventDefault();
    console.log(authFormData);
    if (authType === AUTH_TYPES.REGISTER) {
      navigate("/login");
      setAuthType(AUTH_TYPES.LOGIN);
      setAuthFormData({
        email: "",
        password: "",
      });
    } else {
      navigate("/home");
    }
  };

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
              {authType === AUTH_TYPES.REGISTER ? (
                <Input
                  label="Name"
                  type="text"
                  name="name"
                  id="name"
                  value={authFormData.name || ""}
                  getInputValue={(value) => {
                    handleInputChange("name", value);
                  }}
                />
              ) : (
                ""
              )}
              {AuthInputs.map((inputType, index) => {
                return (
                  <Input
                    key={index}
                    label={inputType.label}
                    type={inputType.type}
                    name={inputType.name}
                    id={inputType.id}
                    value={
                      authFormData[inputType.name as keyof AuthFormData] || ""
                    }
                    getInputValue={(value) => {
                      handleInputChange(inputType.name, value);
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
          <h5 className="text-white text-center text-[1.15rem] text-opacity-85">
            {authType === AUTH_TYPES.LOGIN
              ? "Don't have account, create "
              : "Already have account, "}
            <span
              onClick={navigateToRegisterPage}
              className="text-green-600 hover:text-green-500  font-semibold cursor-pointer"
            >
              {authType === AUTH_TYPES.LOGIN ? "new account" : "login"}
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
