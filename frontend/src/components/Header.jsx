import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import CreateTripForm from "./CreateTripForm";

const Header = ({ userId, authToken }) => {
  const navigate = useNavigate();
  const [isCreateTripPopupFormOpen, setIsCreateTripPopupFormOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    toast.success("Logged out Successfully");
    navigate("/login");
  };

  const dashboardPage = `/dashboard/${userId}`

  const showCreateTripPopupForm = () => {
    setIsCreateTripPopupFormOpen(true);
  }

  const hideCreateTripPopupForm = () => {
    setIsCreateTripPopupFormOpen(false);
  };

  return (
    <>
      <div className="bg-slate-200 flex justify-between px-6 py-3">
      <Link to={dashboardPage} className="text-2xl font-semibold text-green-700 pb-1">
        Splitwise
      </Link>
      <div className="flex gap-6">
        <button
          onClick={showCreateTripPopupForm}
          className="text-l font-semibold text-green-800 border border-green-500 bg-green-200 px-3 pb-1 mt-1 rounded-md"
        >
          Start New Trip
        </button>
        <button
          onClick={handleLogout}
          className="text-l font-semibold text-red-800 border border-red-500 bg-red-200 px-3 pb-1 mt-1 rounded-md"
        >
          Logout
        </button>
      </div>

      {isCreateTripPopupFormOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg relative">
            <h1 className="absolute top-2 left-20 w-full font-semibold text-2xl">Start New Trip</h1>
            {/* Close button */}
            <button
              onClick={hideCreateTripPopupForm}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              Close
            </button>
            {/* Create Trip Form */}
            <div className="py-1 px-2 mt-7">
              <CreateTripForm authToken={authToken} userId={userId} />
            </div>
          </div>
        </div>
      )}

    </div>
    </>
  );
};

export default Header;
