import React, { createContext, useContext, useState } from "react";
import { v1 as uuidv1 } from "uuid";
import { useGetCurrentUser } from "./UsersContext";

const BubbleContext = createContext([]);

export const useBubbles = () => {
  return useContext(BubbleContext);
};

export function BubbleContextProvider({ children }) {
  const [bubbles, setBubbles] = useState([]);
  const getCurrentUser = useGetCurrentUser();
  const addBubble = (newBubble) => {
    const currentUser = getCurrentUser();
    setBubbles([
      ...bubbles,
      {
        ...newBubble,
        id: uuidv1(),
        createdAt: Date.now(),
        createdBy: currentUser.id,
        members: [{ userId: currentUser.id, username: currentUser.username }],
      },
    ]);
  };
  const getBubbles = () => {
    const currentUser = getCurrentUser();
    return bubbles.filter(
      (bubble) =>
        bubble.createdBy === currentUser.id ||
        bubble.members.find((member) => member.userId === currentUser.id)
    );
  };
  const getBubbleById = (id) => {
    return bubbles.find((bubble) => bubble.id === id);
  };

  const deleteBubble = (id) => {
    setBubbles(bubbles.filter((bubble) => bubble.id !== id));
  };
  const contextValue = { addBubble, getBubbles, getBubbleById, deleteBubble };
  return (
    <BubbleContext.Provider value={contextValue}>
      {children}
    </BubbleContext.Provider>
  );
}
