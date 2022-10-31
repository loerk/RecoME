import React, { createContext, useContext, useState } from "react";

import { fetchData } from "../api/fetchers";
import { useUsers } from "./UsersContext";

export const NotificationType = {
  INVITATION_TO_BUBBLE: "INVITATION_TO_BUBBLE",
  INVITATION_TO_RECO: "INVITATION_TO_RECO",
  NOTIFICATION_ABOUT_RECO_IN_BUBBLE: "NOTIFICATION_ABOUT_RECO_IN_BUBBLE",
};
const NotificationsContext = createContext([]);

export const useNotifications = () => {
  return useContext(NotificationsContext);
};

export function NotificationsContextProvider({ children }) {
  const [notifications, setNotifications] = useState([]);
  const [notificationsListAsync, setNotificationsListAsync] = useState({
    isLoading: false,
    error: null,
  });

  const { currentUser, setFriends } = useUsers();

  const fetchNotifications = async () => {
    setNotificationsListAsync({ isLoading: true, error: null });
    try {
      const result = await fetchData("/notifications", "GET");
      setNotifications(() => result.notifications);
      setNotificationsListAsync({ isLoading: false, error: null });
    } catch (error) {
      setNotificationsListAsync({ isLoading: false, error: error });
    }
  };

  // useEffect(() => {
  //   const fetchNotifications = async () => {
  //     setNotificationsListAsync({ isLoading: true, error: null });
  //     try {
  //       const result = await fetchData("/notifications", "GET");
  //       setNotifications(() => result.notifications);
  //       fetchNotifications(false);
  //       setNotificationsListAsync({ isLoading: false, error: null });
  //     } catch (error) {
  //       setNotificationsListAsync({ isLoading: false, error: error });
  //     }
  //   };
  //   if (shouldFetchNotifications && currentUser) fetchNotifications();
  // }, [shouldFetchNotifications, currentUser]);

  const addBubbleNotification = async (bubbleId, friendsList) => {
    try {
      const notification = {
        userIds: friendsList,
        bubbleId,
        type: NotificationType.INVITATION_TO_BUBBLE,
      };
      await fetchData("/notifications/", "POST", notification);
    } catch (error) {
      console.log(error);
    }
  };

  const addRecoToUserNotification = async (recoId, userId) => {
    const notification = {
      userIds: [userId],
      recoId,
      type: NotificationType.INVITATION_TO_RECO,
    };
    try {
      await fetchData(`/notifications/`, "POST", notification);
    } catch (error) {
      console.log(error);
    }
  };

  const addRecoToBubbleNotification = async (bubbleId, recoId, membersList) => {
    const notification = {
      userIds: [...membersList],
      bubbleId,
      recoId,
      type: NotificationType.NOTIFICATION_ABOUT_RECO_IN_BUBBLE,
    };
    try {
      await fetchData(`/notifications/`, "POST", notification);
    } catch (error) {
      console.log(error);
    }
  };

  const getNotifications = async () => {
    try {
      const result = await fetchData(`/notifications`, "GET");
      setNotifications(result);
    } catch (error) {
      console.log(error);
    }
  };

  const acceptNotification = async (id) => {
    try {
      const result = await fetchData(`/notifications/${id}`, "PUT");
      if (currentUser.friends.length !== result.currentUser.friends.length)
        setFriends(() => result.currentUser.friends);
    } catch (error) {
      console.log(error);
    }
  };
  const deleteNotification = async (id) => {
    try {
      const notifications = await fetchData(`/notifications/${id}`, "DELETE");
      if (typeof notifications !== "string")
        setNotifications(() => notifications);
    } catch (error) {
      console.log(error);
    }
  };

  const contextValue = {
    fetchNotifications,
    notificationsListAsync,
    acceptNotification,
    notifications,
    addBubbleNotification,
    addRecoToUserNotification,
    addRecoToBubbleNotification,
    getNotifications,
    deleteNotification,
  };
  return (
    <NotificationsContext.Provider value={contextValue}>
      {children}
    </NotificationsContext.Provider>
  );
}
