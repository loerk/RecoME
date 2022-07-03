import React, { createContext, useContext, useState } from "react";
import { useBubbles } from "./BubbleContext";
import { useGetCurrentUser } from "./UsersContext";

const RecoContext = createContext([]);

export const useRecos = () => {
  return useContext(RecoContext);
};
const initialValueRecos = JSON.parse(localStorage.getItem("recos"));

export function RecoContextProvider({ children }) {
  const [recos, setRecos] = useState(initialValueRecos || []);
  const getCurrentUser = useGetCurrentUser();
  const { getBubbles } = useBubbles();

  const addReco = (newReco) => {
    const currentUser = getCurrentUser();
    const newRecosArr = [
      ...recos,
      {
        ...newReco,
        createdAt: Date.now(),
        createdBy: currentUser.id,
      },
    ];

    setRecos(newRecosArr);
    localStorage.setItem("recos", JSON.stringify(newRecosArr));
  };

  const getRecosByCurrentUser = () => {
    const currentUser = getCurrentUser();
    return recos.filter((reco) => reco.createdBy === currentUser.id);
  };
  const getRecosForCurrentUser = () => {
    const currentUser = getCurrentUser();
    return recos.filter((reco) => reco.sharedWith === currentUser.id);
  };
  const getRecosFromBubble = (id) => {
    return recos.filter(
      (reco) => reco.sharedWithBubbles && reco.sharedWith === id
    );
  };

  const getAllRecos = () => {
    const recosByUser = getRecosByCurrentUser();
    const recosForUser = getRecosForCurrentUser();
    const userBubbles = getBubbles();
    const userBubbleRecos = userBubbles.flatMap((bubble) =>
      getRecosFromBubble(bubble.id)
    );
    const allRecos = [...recosByUser, ...recosForUser, ...userBubbleRecos];
    const getUniqueList = (arr, key) => {
      return [...new Map(arr.map((item) => [item[key], item])).values()];
    };
    return getUniqueList(allRecos, "id");
  };

  const deleteReco = (id) => {
    const filteredRecos = recos.filter((reco) => reco.id !== id);
    setRecos(filteredRecos);
    localStorage.setItem("recos", JSON.stringify(filteredRecos));
  };

  const findRecoById = (id) => {
    return recos.find((reco) => reco.id === id);
  };

  const contextValue = {
    addReco,
    getRecosByCurrentUser,
    deleteReco,
    getRecosFromBubble,
    getAllRecos,
    findRecoById,
    getRecosForCurrentUser,
  };
  return (
    <RecoContext.Provider value={contextValue}>{children}</RecoContext.Provider>
  );
}