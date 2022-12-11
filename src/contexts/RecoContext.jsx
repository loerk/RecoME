import React, { createContext, useContext, useState } from 'react';
import { useEffect } from 'react';
import { fetchData } from '../api/fetchers';
import { useUsers } from './UsersContext';

const RecoContext = createContext([]);

export const useRecos = () => {
  return useContext(RecoContext);
};

export function RecoContextProvider({ children }) {
  const [recos, setRecos] = useState([]);
  const [shouldFetchRecos, setShouldFetchRecos] = useState(true);
  const [isLoadingRecos, setIsLoadingRecos] = useState(false);
  const { currentUser } = useUsers();

  useEffect(() => {
    const fetchRecos = async () => {
      setIsLoadingRecos(true);
      try {
        const result = await fetchData(`/recos`, 'GET');
        if (result) setIsLoadingRecos(false);
        setRecos(() => result.recos);
        setShouldFetchRecos(false);
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
      const result = await fetchData('/recos', 'POST', newReco);
      if (!result) throw new Error('no valid response while getting recos');
      setRecos(result);
      return result;
    } catch (error) {
      console.log(error);
    }
  };

  const getRecosFromBubble = async (id) => {
    try {
      const result = await fetchData(`/recos/${id}`, 'GET');
      if (!result)
        throw new Error('no valid response while getting BubbleRecos');
      return result.bubbleRecos;
    } catch (error) {
      console.log(error);
    }
  };

  const getAllRecos = async () => {
    try {
      const result = await fetchData('/recos', 'GET');
      if (!result) throw new Error('no valid response while getting recos');
      return result;
    } catch (error) {
      console.log(error);
    }
  };

  const deleteReco = async (id) => {
    try {
      await fetchData(`/recos/${id}`, 'DELETE');
      setRecos(recos.filter((reco) => reco.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const ignoreReco = async (id) => {
    try {
      await fetchData(`/recos/${id}/ignore`, 'PUT');
      setShouldFetchRecos(true);
    } catch (error) {
      console.log(error);
    }
  };
  const findRecoById = (id) => recos.find((reco) => reco.id === id);

  const contextValue = {
    isLoadingRecos,
    ignoreReco,
    setShouldFetchRecos,
    recos,
    addReco,
    deleteReco,
    getRecosFromBubble,
    getAllRecos,
    findRecoById,
    shouldFetchRecos,
  };
  return (
    <RecoContext.Provider value={contextValue}>{children}</RecoContext.Provider>
  );
}
