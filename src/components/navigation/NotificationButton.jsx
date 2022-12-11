import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useNotifications } from '../../contexts/NotificationsContext';

export default function NotificationButton() {
  const navigate = useNavigate();

  const { notifications, setShouldFetchNotifications } = useNotifications();
  useEffect(() => {
    const intervalId = setInterval(() => {
      setShouldFetchNotifications(true);
    }, 3000);

    return clearInterval(intervalId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='relative'>
      {!!notifications?.length && (
        <div className=''>
          <button
            onClick={() => navigate('/notifications')}
            className='bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500'
          >
            {notifications.length} NEWS
          </button>
        </div>
      )}
    </div>
  );
}
