import React, { createContext, useContext, useState } from "react";
import { v1 as uuidv1 } from "uuid";
import { useGetCurrentUser } from "./UsersContext";

const BubbleContext = createContext([]);

export const useBubbles = () => {
  return useContext(BubbleContext);
};
const initialBubbles = JSON.parse(localStorage.getItem("bubbles"));

export function BubbleContextProvider({ children }) {
  const [bubbles, setBubbles] = useState(initialBubbles || []);
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
  const exitBubble = (id) => {
    const currentUser = getCurrentUser();
    const currentBubble = getBubbleById(id);

    if (
      currentBubble.members.length === 0 ||
      currentBubble.members.length === 1
    ) {
      return deleteBubble(id);
    }
    const updatedMembersArr = currentBubble.members.filter(
      (member) => member !== currentUser.id
    );
    const updatedBubble = { ...currentBubble, members: updatedMembersArr };
    updateBubble(updatedBubble);
  };

  const contextValue = {
    addBubble,
    getBubbles,
    getBubbleById,
    updateBubble,
    deleteBubble,
    exitBubble,
  };
  return (
    <BubbleContext.Provider value={contextValue}>
      {children}
    </BubbleContext.Provider>
  );
}
