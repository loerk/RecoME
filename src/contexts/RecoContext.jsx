import React, { createContext, useContext, useState } from "react";
import { useEffect } from "react";
import { fetchData } from "../api/fetchers";
import { useUsers } from "./UsersContext";

const RecoContext = createContext([]);

export const useRecos = () => {
  return useContext(RecoContext);
};

export function RecoContextProvider({ children }) {
  const [recos, setRecos] = useState([]);
  const [shouldFetchRecos, setShouldFetchRecos] = useState(true);
  const { currentUser } = useUsers();

  useEffect(() => {
    const fetchRecos = async () => {
      try {
        const resp = await fetchData(`/recos`, "GET");
        setRecos(() => resp.recos);
        console.log("from recosContext", resp.recos);
        setShouldFetchRecos(false);
        localStorage.setItem("recos", JSON.stringify(resp.recos));
      } catch (error) {
        console.log(error);
      }
    };
    if (shouldFetchRecos && currentUser) {
      fetchRecos();
    }
  }, [shouldFetchRecos, currentUser]);

  const addReco = async (newReco) => {
    try {
      const result = await fetchData("/recos", "POST", newReco);
      if (!result) throw new Error("no valid response while getting recos");
      setRecos(result);
      return result;
    } catch (error) {
      console.log(error);
    }
  };

  const getRecosFromBubble = async (id) => {
    try {
      const result = await fetchData(`/recos/${id}`, "GET");
      if (!result)
        throw new Error("no valid response while getting BubbleRecos");
      return result.bubbleRecos;
    } catch (error) {
      console.log(error);
    }
  };

  const getAllRecos = async () => {
    try {
      const result = await fetchData("/recos", "GET");
      if (!result) throw new Error("no valid response while getting recos");
      return result;
    } catch (error) {
      console.log(error);
    }
  };

  const deleteReco = async (id) => {
    try {
      const result = await fetchData(`/recos/${id}`, "DELETE");
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  const findRecoById = (id) => recos.find((reco) => reco.id === id);
  // const updateRecos = (updatedReco) => {
  //   const updatedRecosArray = recos.map((reco) => {
  //     if (reco.id === updatedReco.id) return updatedReco;
  //     return reco;
  //   });
  //   setRecos(updatedRecosArray);
  //   localStorage.setItem("recos", JSON.stringify(updatedRecosArray));
  // };
  // const ignoreReco = (id) => {
  //   const currentUser = getCurrentUser();
  //   const currentReco = findRecoById(id);
  //   const updatedReco = {
  //     ...currentReco,
  //     ignoredBy: [...(currentReco.ignoredBy || []), currentUser.id],
  //   };
  //   updateRecos(updatedReco);
  // };

  const contextValue = {
    setShouldFetchRecos,
    recos,
    addReco,
    deleteReco,
    getRecosFromBubble,
    getAllRecos,
    findRecoById,
    // ignoreReco,
    shouldFetchRecos,
  };
  return (
    <RecoContext.Provider value={contextValue}>{children}</RecoContext.Provider>
  );
}
