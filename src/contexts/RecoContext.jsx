import React, { createContext, useContext, useState } from "react";
import { useBubbles } from "./BubbleContext";
import { useGetCurrentUser } from "./UsersContext";

const RecoContext = createContext([]);

export const useRecos = () => {
  return useContext(RecoContext);
};
const initialRecos = JSON.parse(localStorage.getItem("recos"));

export function RecoContextProvider({ children }) {
  const [recos, setRecos] = useState(initialRecos || []);
  const getCurrentUser = useGetCurrentUser();
  const { getBubbles } = useBubbles();

  const addReco = (newReco) => {
    const currentUser = getCurrentUser();
    const newRecos = [
      ...recos,
      {
        ...newReco,
        createdAt: Date.now(),
        createdBy: currentUser.id,
      },
    ];

    setRecos(newRecos);
    localStorage.setItem("recos", JSON.stringify(newRecos));
  };

  const getRecosFromBubble = (id) => {
    return recos.filter(
      (reco) => reco.sharedWithBubbles && reco.sharedWith === id
    );
  };
  const getRecosForAndByUser = () => {
    const currentUser = getCurrentUser();
    return recos.filter(
      (reco) =>
        reco.sharedWith === currentUser.id && reco.createdBy === currentUser.id
    );
  };
  const getAllRecos = () => {
    const recosForAndByUser = getRecosForAndByUser();
    const userBubbles = getBubbles();
    const userBubbleRecos = userBubbles.flatMap((bubble) =>
      getRecosFromBubble(bubble.id)
    );
    return [...recosForAndByUser, ...userBubbleRecos];

    // return allRecos.reduce((acc, curr) => {
    //   if (acc.some((user) => user.id === curr.id)) return acc;
    //   return [...acc, curr];
    // }, []);

    //   return [...new Map(arr.map((item) => [item[key], item])).values()];
  };

  const deleteReco = (id) => {
    const filteredRecos = recos.filter((reco) => reco.id !== id);
    setRecos(filteredRecos);
    localStorage.setItem("recos", JSON.stringify(filteredRecos));
  };

  const findRecoById = (id) => recos.find((reco) => reco.id === id);
  const updateRecos = (updatedReco) => {
    const updatedRecosArray = recos.map((reco) => {
      if (reco.id === updatedReco.id) return updatedReco;
      return reco;
    });
    setRecos(updatedRecosArray);
    localStorage.setItem("recos", JSON.stringify(updatedRecosArray));
  };
  const ignoreReco = (id) => {
    const currentUser = getCurrentUser();
    const currentReco = findRecoById(id);
    const updatedReco = {
      ...currentReco,
      ignoredBy: [...(currentReco.ignoredBy || []), currentUser.id],
    };
    updateRecos(updatedReco);
  };

  const contextValue = {
    addReco,
    deleteReco,
    getRecosFromBubble,
    getAllRecos,
    findRecoById,
    ignoreReco,
    updateRecos,
  };
  return (
    <RecoContext.Provider value={contextValue}>{children}</RecoContext.Provider>
  );
}
