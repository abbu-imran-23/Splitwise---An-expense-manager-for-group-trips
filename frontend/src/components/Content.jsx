import React from "react";

const Content = ({ user }) => {

  const { name } = user;

  return (
    <>
      <div className="bg-green-300 flex justify-around">
        <h4>{name} here are you previous trip memories!</h4>
      </div>
    </>
  );
};

export default Content;
