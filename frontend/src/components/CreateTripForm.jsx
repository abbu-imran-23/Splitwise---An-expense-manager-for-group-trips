import axios from "axios";
import React, { useEffect, useState } from "react";
import Button from "./Button";

const CreateTripForm = ({ authToken, userId }) => {

  const [tripName, setTripName] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchQueryResult, setSearchQueryResult] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [tripMates, setTripMates] = useState([]);

  useEffect(() => {
    // Function to fetch data from API
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/user/65f51e18e6d06e275102d7c7/getAllUsers",
          {
            headers: {
              Authorization: `Bearer ${authToken}`, // Send the token in the Authorization header
            },
          }
        );
        // Assuming the response contains an array of objects
        console.log(response);
        //   setSearchQueryResult(response.data);
        if (response.data.success) {
          setSearchQueryResult(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (!searchQuery) {
      // If searchQuery is empty, set filteredData to an empty array
      setFilteredData([]);
      return; // Exit early
    }

    // Filter searchQueryResult based on searchQuery
    const filtered = searchQueryResult.filter((item) =>
      item.name.toLowerCase().startsWith(searchQuery.toLowerCase())
    );

    setFilteredData(filtered);
  }, [searchQuery, searchQueryResult]);

  const tripMateIds = tripMates.map((tripMate) => {
    return tripMate._id;
  })

  const submitNewTripDetails = () => {
    const tripDetails = {
        tripName: tripName,
        tripMates: tripMateIds,
        tripExpenses: [],
        userId: userId
    }
    console.log("Trip Deatils", tripDetails);
    
    createTripApiCall(tripDetails);
  };

  const createTripApiCall = async(tripDetails) => {
    try {
        const response = await axios.post("http://localhost:4000/trip/createTrip", 
        tripDetails,
        {
            headers: {
              Authorization: `Bearer ${authToken}`, // Send the token in the Authorization header
            },
        })
        console.log(response)
    } catch (error) {
        console.log("Error while createTripApiCall", error);
    }
  }

  const handleSearchQuery = (e) => {
    setSearchQuery(e.target.value);
  };

  const addTripMate = (tripMate) => {
    console.log(tripMate.tripMate.name);
    setTripMates([...tripMates, tripMate.tripMate]);
    setSearchQuery("");
  };

  const removeTripMate = (tripMateToBeRemoved) => {
    console.log(tripMateToBeRemoved);
    const updatedTripMates = tripMates.filter((tripMate) => {
        return tripMate.name !== tripMateToBeRemoved
    })
    setTripMates(updatedTripMates);
  }

  return (
    <form className="flex flex-col justify-center gap-3 text-lg">
      <div className="flex flex-row justify-center items-center gap-4">
        <label htmlFor="" className="font-normal">
          Trip Name
        </label>
        <input
          value={tripName}
          onChange={(e) => setTripName(e.target.value)}
          type="text"
          placeholder="GOA"
          name=""
          id=""
          className="outline-none px-2 py-1 border border-black rounded-md text-base"
        />
      </div>
      <div className="flex flex-row justify-center items-center gap-4">
        <label htmlFor="">Trip Mates</label>
        <div className="flex flex-col">
          <input
            value={searchQuery}
            onChange={handleSearchQuery}
            type="text"
            placeholder="Search your friend"
            name=""
            id=""
            className="outline-none px-2 py-1 border border-black rounded-md text-base"
          />
          {/* <h4 className="bg-white-100 mt-[0.10rem] px-2 rounded-sm">Hello</h4> */}
          {filteredData.map((tripMate, index) => (
            <h4
              onClick={() => addTripMate({ tripMate })}
              key={index}
              className="bg-white-100 mt-[0.10rem] px-2 rounded-sm"
            >
              {tripMate.name}
            </h4>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-4 flex-row gap-2 w-full">
        {tripMates &&
          tripMates.map((tripMate, index) => {
            return (
              <h5 className="bg-slate-100 pl-2 rounded-md py-1 flex gap-2">
                {tripMate.name}
                <span 
                  onClick={() => removeTripMate(tripMate.name)}
                  className="bg-gray-200 rounded-full px-3 pb-1">
                  x
                </span>
              </h5>
            );
          })}
      </div>
      <button
        onClick={submitNewTripDetails}
        className="text-l font-semibold text-green-800 border text-center border-green-500 bg-green-200 px-3 py-1 mt-1 rounded-md"
      >
        Add Trip
      </button>
    </form>
  );
};

export default CreateTripForm;
