import React, { useRef, useState } from "react";
import { IoMdCreate } from "react-icons/io";
import Card from "./Card";

function Foreground() {
  const ref = useRef(null);
  const [cards, setCards] = useState([
    {
      id: 1,
      textContent:
        "eat , code , sleep , gym and repeat",
      color: "bg-orange-500",
    },
    { id: 2, textContent: "Buy a ketchup bottle from market", color: "bg-lime-500" },
    { id: 3, textContent: "attend meeting at 10pm", color: "bg-lime-500" },
    { id: 4, textContent: "sleep well", color: "bg-blue-500" },
    { id: 5, textContent: "Go to gym regularly", color: "bg-lime-500" },
    // { id: 6, textContent: "eat ", color: "bg-blue-500" }
  ]);

  const handleCreateCard = () => {
    const rColor = Math.random();
    console.log(rColor);
    if (cards.length < 10) {
      const newId = cards.length + 1;
      const newCard = {
        id: newId,
        textContent: "",
        color: (rColor<1/3)? "bg-lime-500" : ((rColor<2/3) ?  "bg-orange-500" : "bg-blue-500")
      };
      setCards([...cards, newCard]);
    } else {
      alert("Maximum limit of 10 cards reached!");
    }
  };
  

  const handleDeleteCard = (id) => {
    const updatedCards = cards.filter((card) => card.id !== id);
    setCards(updatedCards);
  };

  return (
    <div ref={ref} className="fixed top-0 left-0 z-[3] w-full h-screen p-5 grid gap-4 grid-cols-2 md:grid-cols-5 grid-rows-2">
      {cards.map((card) => (
        <Card key={card.id} textContent={card.textContent} color={card.color} onDelete={() => handleDeleteCard(card.id)} />
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