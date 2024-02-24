import React from "react";
import { ButtonProps } from "../interfaces/ButtonProps";

const Button: React.FC<ButtonProps> = ({ type }) => {
  return (
    <button
    type="submit"
     className="text-white text-opacity-95 px-4 py-1 my-1 w-full mt-5 bg-green-900 rounded-md text-[1.15rem]">
      {type}
    </button>
  );
};

export default Button;
