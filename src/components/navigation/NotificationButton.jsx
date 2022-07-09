import React from "react";
import { useNavigate } from "react-router-dom";
import { useNotifications } from "../../contexts/NotificationsContext";

export default function NotificationButton() {
  const navigate = useNavigate();

  const { getNotifications } = useNotifications();
  const notifications = getNotifications();

  return (
    <div className="relative">
      {!!notifications.length && (
        <div className="">
          <button
            onClick={() => navigate("/notifications")}
            className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500"
          >
            {notifications.length} NEWS
          </button>
        </div>
      )}
    </div>
  );
}
