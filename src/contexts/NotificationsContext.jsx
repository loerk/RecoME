import React, { createContext, useContext, useEffect, useState } from 'react';

import { fetchData } from '../api/fetchers';
import { useUsers } from './UsersContext';

export const NotificationType = {
  INVITATION_TO_BUBBLE: 'INVITATION_TO_BUBBLE',
  INVITATION_TO_RECO: 'INVITATION_TO_RECO',
  NOTIFICATION_ABOUT_RECO_IN_BUBBLE: 'NOTIFICATION_ABOUT_RECO_IN_BUBBLE',
};
const NotificationsContext = createContext([]);

export const useNotifications = () => {
  return useContext(NotificationsContext);
};

export function NotificationsContextProvider({ children }) {
  const [notifications, setNotifications] = useState([]);
  const [shouldFetchNotifications, setShouldFetchNotifications] =
    useState(true);
  const { currentUser, setFriends } = useUsers();

  useEffect(() => {
    const fetchNotifications = async () => {
      const result = await fetchData('/notifications', 'GET');
      setNotifications(() => result.notifications);
      setShouldFetchNotifications(false);
      return result.notifications;
    };
    if (shouldFetchNotifications && currentUser) fetchNotifications();
  }, [shouldFetchNotifications, currentUser]);

  const addBubbleNotification = async (bubbleId, friendsList) => {
    try {
      const notification = {
        userIds: friendsList,
        bubbleId,
        type: NotificationType.INVITATION_TO_BUBBLE,
      };
      await fetchData(`/notifications/`, 'POST', notification);
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
      await fetchData(`/notifications/`, 'POST', notification);
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
      await fetchData(`/notifications/`, 'POST', notification);
    } catch (error) {
      console.log(error);
    }
  };

  const getNotifications = async () => {
    try {
      const result = await fetchData(`/notifications`, 'GET');
      setNotifications(result);
    } catch (error) {
      console.log(error);
    }
  };

  const acceptNotification = async (id) => {
    try {
      const result = await fetchData(`/notifications/${id}`, 'PUT');
      if (currentUser.friends.length !== result.currentUser.friends.length)
        setFriends(() => result.currentUser.friends);
    } catch (error) {
      console.log(error);
    }
  };
  const deleteNotification = async (id) => {
    try {
      const notifications = await fetchData(`/notifications/${id}`, 'DELETE');
      if (typeof notifications !== 'string')
        setNotifications(() => notifications);
    } catch (error) {
      console.log(error);
    }
  };

  const contextValue = {
    acceptNotification,
    notifications,
    setShouldFetchNotifications,
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
