import React from "react";

const TripCard = () => {
  return (
    <>
      <div className="bg-white shadow-lg rounded-lg overflow-hidden mx-auto max-w-sm">
        <img
          className="w-full h-40 object-cover object-center"
          src=""
          alt="trip.title"
        />
        <div className="py-4 px-6">
          <h2 className="text-xl font-semibold text-gray-800">title</h2>
          <p className="mt-2 text-gray-600">description</p>
          <div className="flex justify-between items-center mt-4">
            <span className="text-sm font-semibold">date</span>
            <button className="px-3 py-1 bg-blue-500 text-white text-xs font-semibold rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
              Book Now
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default TripCard;
