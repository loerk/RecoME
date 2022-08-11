import React, { createContext, useContext, useState } from "react";
import { useEffect } from "react";
import { fetchData } from "../api/fetchers";
import { useUsers } from "./UsersContext";

const BubbleContext = createContext([]);

export const useBubbles = () => {
  return useContext(BubbleContext);
};

export function BubbleContextProvider({ children }) {
  const [bubbles, setBubbles] = useState([]);
  const [bubble, setBubble] = useState({});
  const [shouldFetchBubbles, setShouldFetchBubbles] = useState(true);

  const { currentUser } = useUsers();

  useEffect(() => {
    const fetchBubbles = async () => {
      const result = await fetchData("/bubbles", "GET");

      if (!result) throw new Error("no valid response while getting bubbles");
      setBubbles(() => result.userBubbles);
      setShouldFetchBubbles(false);
    };
    if (shouldFetchBubbles && currentUser) fetchBubbles();
  }, [shouldFetchBubbles, currentUser]);

  const addBubble = async (bubbleData) => {
    const result = await fetchData("/bubbles", "POST", bubbleData);
    return result;
  };

  const getBubbles = async () => {
    try {
      const result = await fetchData("/bubbles", "GET");
      if (!result) throw new Error("no valid response while getting bubbles");

      return result.userBubbles;
    } catch (error) {
      console.log(error);
    }
  };

  const updateBubble = async (updatedBubble) => {
    try {
      const result = await fetchData(
        `/bubbles/${updatedBubble._id}`,
        "PUT",
        updatedBubble
      );
      if (!result) throw new Error("invalid response while updating bubble");
      return result;
    } catch (error) {
      console.log(error);
    }
  };

  const deleteBubble = async (id) => {
    try {
      const result = await fetchData(`/bubbles/${id}`, "DELETE");
      return result;
    } catch (error) {
      console.log(error);
    }
  };

  const getBubbleById = async (id) => {
    try {
      const resp = await fetchData(`/bubbles/${id}`, "GET");
      setBubble(resp.bubble);
    } catch (error) {
      console.log(error);
    }
  };

  const exitBubble = async (id) => {
    console.log(id);
    try {
      const result = await fetchData(`/bubbles/${id}/leave`, "DELETE");
      return result;
    } catch (error) {
      console.log(error);
    }
  };

  const inviteUsers = async (bubbleId, userIds) => {
    try {
      const result = await fetchData(
        `/bubbles/${bubbleId}/inviteUsers`,
        "PUT",
        {
          userIds,
        }
      );
      if (result.message) throw new Error("something went wrong");
      return result.currentBubble;
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  const inviteUserByEmail = async (bubbleId, email) => {
    const result = await fetchData(`/bubbles/${bubbleId}/inviteUsers`, "PUT", {
      email,
    });
    console.log(result);
    return result;
  };

  const contextValue = {
    bubble,
    setShouldFetchBubbles,
    bubbles,
    addBubble,
    getBubbles,
    getBubbleById,
    updateBubble,
    shouldFetchBubbles,
    deleteBubble,
    exitBubble,
    inviteUsers,
    inviteUserByEmail,
  };
  return (
    <BubbleContext.Provider value={contextValue}>
      {children}
    </BubbleContext.Provider>
  );
}

export const useGetCurrentBubble = () => {
  const context = useBubbles();
  return () => {
    return context.bubbles;
  };
};
