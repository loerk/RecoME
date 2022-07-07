import React from "react";
import { useNavigate } from "react-router-dom";

import { useUsers } from "../../contexts/UsersContext";

export default function Notifications() {
  const navigate = useNavigate();

  const { currentUser } = useUsers();

  const notifications = currentUser.notifications;
  const hasNewNotifications = notifications.length !== 0;

  return (
    <div className="relative">
      {hasNewNotifications && (
        <div className="">
          <button
            onClick={() => navigate("/friends/details")}
            className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500"
          >
            {currentUser.notifications.length} NEWS
          </button>
        </div>
      )}
    </div>
  );
}
