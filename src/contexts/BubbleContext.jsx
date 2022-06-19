import React, { createContext, useContext, useState } from "react";
import { v1 as uuidv1 } from "uuid";
import { useGetCurrentUser } from "./UsersContext";

const BubbleContext = createContext([]);

export const useBubbles = () => {
  return useContext(BubbleContext);
};
const initialValueBubbles = JSON.parse(localStorage.getItem("bubbles"));

export function BubbleContextProvider({ children }) {
  const [bubbles, setBubbles] = useState(initialValueBubbles || []);
  const getCurrentUser = useGetCurrentUser();

  const addBubble = (newBubble) => {
    const currentUser = getCurrentUser();
    const newBubblesArr = [
      ...bubbles,
      {
        ...newBubble,
        id: uuidv1(),
        createdAt: Date.now(),
        createdBy: currentUser.id,
        members: [currentUser.id],
        recos: [],
      },
    ];
    setBubbles(newBubblesArr);
    localStorage.setItem("bubbles", JSON.stringify(newBubblesArr));
  };
  const getBubbles = () => {
    const currentUser = getCurrentUser();
    return bubbles.filter(
      (bubble) =>
        bubble.createdBy === currentUser.id ||
        bubble.members.find((member) => member === currentUser.id)
    );
  };

  const getBubbleById = (id) => {
    return bubbles.find((bubble) => bubble.id === id);
  };
  const updateBubble = (updatedBubble) => {
    const updatedBubblesArray = bubbles.map((bubble) =>
      bubble.id === updatedBubble.id ? updatedBubble : bubble
    );

    setBubbles(updatedBubblesArray);
    localStorage.setItem("bubbles", JSON.stringify(updatedBubblesArray));
  };
  const deleteBubble = (id) => {
    const deletedBubbleArr = bubbles.filter((bubble) => bubble.id !== id);
    setBubbles(deletedBubbleArr);
    localStorage.setItem("bubbles", JSON.stringify(deletedBubbleArr));
  };
  const getRecosByBubbles = (currentUser) => {
    const usersBubbles = getBubbles();
    return usersBubbles.flatMap((bubble) =>
      (bubble.recos || []).filter((reco) => reco.createdBy === currentUser.id)
    );
  };

  const contextValue = {
    addBubble,
    getBubbles,
    getBubbleById,
    updateBubble,
    deleteBubble,
    getRecosByBubbles,
  };
  return (
    <BubbleContext.Provider value={contextValue}>
      {children}
    </BubbleContext.Provider>
  );
}
