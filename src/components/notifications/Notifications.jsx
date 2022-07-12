import React from "react";

import { useUsers } from "../../contexts/UsersContext";
import {
  NotificationType,
  useNotifications,
} from "../../contexts/NotificationsContext";
import RecommendationNotification from "./RecommendationNotification";
import BubbleNotification from "./BubbleNotification";
import RecommendationToBubbleNotification from "./RecommendationToBubbleNotification";

export default function Notifications() {
  const { currentUser } = useUsers();
  const { getNotifications } = useNotifications();
  let currentNotifications = getNotifications(currentUser.id);

  return (
    <div className="flex items-center flex-col pt-28">
      <h1>WOW WOW WOW</h1>
      <p>here are your news</p>
      {currentNotifications.map((notification) => {
        if (notification.type === NotificationType.INVITATION_TO_RECO) {
          return (
            <RecommendationNotification
              key={notification.id}
              notification={notification}
            />
          );
        }
        if (notification.type === NotificationType.INVITATION_TO_BUBBLE) {
          return (
            <BubbleNotification
              key={notification.id}
              notification={notification}
            />
          );
        }
        if (
          notification.type ===
          NotificationType.NOTIFICATION_ABOUT_RECO_IN_BUBBLE
        ) {
          return (
            <RecommendationToBubbleNotification
              key={notification.id}
              notification={notification}
            />
          );
        }

        return null;
      })}
    </div>
  );
}
