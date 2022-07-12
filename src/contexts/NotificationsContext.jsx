import React, { createContext, useContext, useState } from "react";
import { v1 as uuidv1 } from "uuid";
import { useBubbles } from "./BubbleContext";
import { useGetCurrentUser } from "./UsersContext";
export const NotificationType = {
  INVITATION_TO_BUBBLE: "INVITATION_TO_BUBBLE",
  INVITATION_TO_RECO: "INVITATION_TO_RECO",
  NOTIFICATION_ABOUT_RECO_IN_BUBBLE: "NOTIFICATION_ABOUT_RECO_IN_BUBBLE",
};
const NotificationsContext = createContext([]);

export const useNotifications = () => {
  return useContext(NotificationsContext);
};

const initialNotifications = JSON.parse(localStorage.getItem("notifications"));

export function NotifivationsContextProvider({ children }) {
  const [notifications, setNotifications] = useState(
    initialNotifications || []
  );
  const getCurrentUser = useGetCurrentUser();
  const { getBubbleById } = useBubbles();

  const findNotificationById = (id) =>
    notifications.find((notification) => notification.id === id);

  const addBubbleNotification = (bubbleId, friendsList) => {
    const currentUser = getCurrentUser();
    const newNotification = {
      id: uuidv1(),
      user: friendsList,
      bubbleId,
      invitedAt: Date.now(),
      type: NotificationType.INVITATION_TO_BUBBLE,
      invitedBy: currentUser.id,
      invitedByUser: currentUser.username,
    };
    setNotifications([...notifications, newNotification]);
    localStorage.setItem(
      "notifications",
      JSON.stringify([...notifications, newNotification])
    );
  };

  const addRecoToUserNotification = (recoId, userId) => {
    const currentUser = getCurrentUser();
    const newNotification = {
      id: uuidv1(),
      user: [userId],
      invitedAt: Date.now(),
      type: NotificationType.INVITATION_TO_RECO,
      invitedBy: currentUser.id,
      recoId: recoId,
      invitedByUser: currentUser.username,
    };
    setNotifications([...notifications, newNotification]);
    localStorage.setItem(
      "notifications",
      JSON.stringify([...notifications, newNotification])
    );
  };

  const addRecoToBubbleNotification = (bubbleId, recoId, membersList) => {
    const currentUser = getCurrentUser();
    const newNotification = {
      id: uuidv1(),
      user: [...membersList],
      invitedAt: Date.now(),
      type: NotificationType.NOTIFICATION_ABOUT_RECO_IN_BUBBLE,
      invitedBy: currentUser.id,
      toBubble: bubbleId,
      invitedByUser: currentUser.username,
      recoId: recoId,
    };
    setNotifications([...notifications, newNotification]);
    localStorage.setItem(
      "notifications",
      JSON.stringify([...notifications, newNotification])
    );
  };

  const isAlreadyInvitedToBubble = (userId, bubbleId) => {
    return getNotificationsByUserId(userId).some(
      (notification) => notification.bubbleId === bubbleId
    );
  };

  const getNotificationsByUserId = (userId) => {
    return notifications
      .filter((notification) => notification.user.find((id) => id === userId))
      .map((notification) => {
        if (notification.type === NotificationType.INVITATION_TO_BUBBLE) {
          const bubble = getBubbleById(notification.bubbleId);
          return {
            ...notification,
            bubble: { name: bubble.name, imageUrl: bubble.imageUrl },
          };
        }
        return notification;
      });
  };

  const getNotifications = () => {
    const currentUser = getCurrentUser();
    return getNotificationsByUserId(currentUser.id);
  };

  const getUserNotificationsToBubble = (userId, bubbleId) => {
    const userNotifications = getNotifications(userId);
    return userNotifications.filter(
      (notification) => notification.bubbleId === bubbleId
    );
  };
  const updateNotifications = (updatedNotification) => {
    const updatedNotificationsArray = notifications.map((notification) => {
      if (notification.id === updatedNotification.id)
        return updatedNotification;
      return notification;
    });
    setNotifications(updatedNotificationsArray);
    localStorage.setItem(
      "notifications",
      JSON.stringify(updatedNotificationsArray)
    );
  };
  const deleteNotification = (id) => {
    const currentNotification = findNotificationById(id);
    const currentUser = getCurrentUser();
    if (currentNotification.user.length > 1) {
      const filteredUsers = currentNotification.user.filter(
        (userId) => userId !== currentUser.id
      );
      const updatedNotification = {
        ...currentNotification,
        user: filteredUsers,
      };
      updateNotifications(updatedNotification);
    } else {
      const filteredNotifications = notifications.filter(
        (notification) => notification.id !== id
      );
      setNotifications(filteredNotifications);
      localStorage.setItem(
        "notifications",
        JSON.stringify(filteredNotifications)
      );
    }
  };

  const contextValue = {
    findNotificationById,
    addBubbleNotification,
    addRecoToUserNotification,
    addRecoToBubbleNotification,
    getNotifications,
    getNotificationsByUserId,
    isAlreadyInvitedToBubble,
    deleteNotification,
    updateNotifications,
    getUserNotificationsToBubble,
  };
  return (
    <NotificationsContext.Provider value={contextValue}>
      {children}
    </NotificationsContext.Provider>
  );
}
