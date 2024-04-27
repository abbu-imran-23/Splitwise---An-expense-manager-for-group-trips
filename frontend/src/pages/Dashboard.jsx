import React, { useEffect, useState } from "react"
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";
import Content from "../components/Content";

const Dashboard = () => {

  const navigate = useNavigate();
  const { userId } = useParams();
  const [user, setUser] = useState({});

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");

    const userString = localStorage.getItem("user");

    if(!authToken) {
      redirectToLoginPage();
    }
    else {
      const user = JSON.parse(userString || "");
      setUser(user);

      if(userId !== user._id) {
        redirectToLoginPage();
      }
    }

  }, [])

  const redirectToLoginPage = () => {
    toast.error("Please login to continue...");
    navigate("/login");
  }

  return (
    <>
      <Header userId={user._id} authToken={user.authToken}/>
      <Content user={user}/>
    </>
    // <div>
    //   {
    //     userId === user._id ? <div>Dashboard of {user.name}</div> : <div>Please login to continue...</div>
    //   }
    // </div>
  )
}

export default Dashboard