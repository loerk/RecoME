import React, { createContext, useContext, useState } from "react";
import { v1 as uuidv1 } from "uuid";
import { useBubbles } from "./BubbleContext";
import { useGetCurrentUser } from "./UsersContext";
export const NotificationType = {
  INVITATION_TO_BUBBLE: "INVITATION_TO_BUBBLE",
  INVITATION_TO_RECO: "INVITATION_TO_RECO",
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

  const addRecoNotification = (userId) => {
    const currentUser = getCurrentUser();
    const newNotification = {
      id: uuidv1(),
      user: userId,
      invitedAt: Date.now(),
      type: NotificationType.INVITATION_TO_RECO,
      invitedBy: currentUser.id,
      invitedByUser: currentUser.username,
    };
    setNotifications([...notifications, newNotification]);
    localStorage.setItem(
      "notifications",
      JSON.stringify([...notifications, newNotification])
    );
  };

  const getNotifications = () => {
    const currentUser = getCurrentUser();
    return notifications
      .filter((notification) =>
        notification.user.find((id) => id === currentUser.id)
      )
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
  const getUserNotificationsToBubble = (userId, bubbleId) => {
    const userNotifications = getNotifications(userId);
    return userNotifications.filter(
      (notification) => notification.bubbleId === bubbleId
    );
  };
  const deleteNotification = (id) => {
    const filteredNotifications = notifications.filter(
      (notification) => notification.id !== id
    );
    setNotifications(filteredNotifications);
    localStorage.setItem(
      "notifications",
      JSON.stringify(filteredNotifications)
    );
  };
  const contextValue = {
    addBubbleNotification,
    addRecoNotification,
    getNotifications,
    getUserNotificationsToBubble,
    deleteNotification,
  };
  return (
    <NotificationsContext.Provider value={contextValue}>
      {children}
    </NotificationsContext.Provider>
  );
}
