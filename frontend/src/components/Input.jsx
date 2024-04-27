import React from "react";

const Input = ({ label, type, name, id, value, getInputValue }) => {

    const sendInputValue = (event) => {
        getInputValue(event.target.value);
    }

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor="email" className="text-white text-[1.15rem]">{label}</label>
      <input
        className="rounded-sm text-opacity-95 text-[1.10rem] h-9 bg-slate-300 outline-none px-2 py-1 text-black"
        type={type}
        name={name}
        id={id}
        value={value}
        onChange={sendInputValue}
      />
    </div>
  );
};

export default Input;
