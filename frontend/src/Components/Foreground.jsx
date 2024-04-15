import React, { useState, useEffect, useRef } from "react";
import { IoMdCreate } from "react-icons/io";
import {BASE_URL} from "../assets/URL"
import axios from "axios";
import Card from "./Card";

function Foreground() {
  const ref = useRef(null);
  const [data, setData] = useState([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/cards`);
        setData(response.data);
      } catch (error) {
        console.error("Error fetching descriptions:", error);
      }
    };

    fetchData();
}, []);

const handleDeleteCard = async (id) => {
  // console.log(id);
  console.log(data);
  try {
    await axios.delete(`${BASE_URL}/cards/${id}`);
    setData(prevData => prevData.filter(card => card._id !== id)); // Filter out the deleted card
    console.log(data);
  } catch (error) {
    console.error('Error deleting card:', error);
  }
};

useEffect(() => {
  console.log(data);
}, [data]);


  const handleCreateCard = async () => {
    if (data.length >= 10) {
      alert("Maximum limit of 10 cards reached!");
      return;
    }
    try {
      // const response = await axios.post("http://localhost:3000/cards");
      const response = await axios.post(`${BASE_URL}/cards`, { description: "Type here..."});
      setData([...data, response.data]);
    } catch (error) {
      console.error("Error creating new card:", error);
    }
  };

  return (
    <div ref={ref} className="cardContainer fixed top-0 left-0 z-[3] w-full h-screen p-5 grid gap-4 grid-cols-2 md:grid-cols-5 grid-rows-2">
      {Array.isArray(data) && data.map((cardData, index) => (
        // this "key={index}" statement isnt wrking coz it doesnt give proper unique index, if  if the order or number of items in the data array changes
        <Card key={`${cardData._id}-${index}`} id={cardData._id} reference={ref} textContent={cardData.description} color={cardData.color} onDelete={() => handleDeleteCard(cardData._id)} />
      ))}
      <button
        className="create bg-blue-500 text-white w-12 h-12 fixed bottom-6 right-6 flex justify-center items-center rounded-full"
        onClick={handleCreateCard}
      >
        <IoMdCreate size={"1.5rem"} />
      </button>
    </div>
  );
}

export default Foreground;
