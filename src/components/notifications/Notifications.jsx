import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUsers } from "../../contexts/UsersContext";

export default function Notifications() {
  const { currentUser } = useUsers();
  const navigate = useNavigate();
  const [showNotificationsList, setShowNotificationsList] = useState(false);
  const hasNewNotifications = currentUser.notifications.length !== 0;

  return (
    <div className="p-2">
      <img src={currentUser.avatarUrl} alt="" className="w-10" />
      {hasNewNotifications ? (
        <div className="relative">
          <button
            onClick={() => setShowNotificationsList(!showNotificationsList)}
            className="bg-clip-text pt-2  text-transparent bg-gradient-to-r from-pink-500 to-violet-500"
          >
            {currentUser.notifications.length} NEWS
          </button>
          {showNotificationsList ? (
            <ul>
              {currentUser.notifications.map((note) => {
                return (
                  <li
                    onClick={() => navigate("/friends/details")}
                    className="
                        absolute      
                        right-10
                        text-sm
                        py-2
                        font-normal
                        block
                        w-full
                        whitespace-nowrap
                        bg-transparent
                        text-gray-700
                        hover:text-fuchsia-800
                        cursor-pointer
                        "
                  >
                    {note.type}
                  </li>
                );
              })}
            </ul>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
