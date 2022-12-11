import React from 'react';

import {
  NotificationType,
  useNotifications,
} from '../../contexts/NotificationsContext';
import RecommendationNotification from './RecommendationNotification';
import BubbleNotification from './BubbleNotification';
import RecommendationToBubbleNotification from './RecommendationToBubbleNotification';

export default function Notifications() {
  const { notifications } = useNotifications();
  return (
    <div className='flex items-center flex-col pt-32 pb-12'>
      <h1>WOW WOW WOW</h1>
      <p>here are your news</p>
      {notifications.length ? (
        notifications.map((notification) => {
          if (notification.type === NotificationType.INVITATION_TO_RECO) {
            return (
              <RecommendationNotification
                key={notification._id}
                notification={notification}
              />
            );
          }
          if (notification.type === NotificationType.INVITATION_TO_BUBBLE) {
            return (
              <BubbleNotification
                key={notification._id}
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
                key={notification._id}
                notification={notification}
              />
            );
          }

          return null;
        })
      ) : (
        <h1 className='mt-10'> : - / </h1>
      )}
    </div>
  );
}
