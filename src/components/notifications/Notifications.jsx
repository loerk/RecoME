import React, { useEffect, useState } from "react";
import { useUserData } from "../../contexts/UserDataContext";
import { useNavigate } from "react-router-dom";

export default function Notifications() {
  const { userData } = useUserData();
  const navigate = useNavigate();
  const [hasNewNotifications, setHasNewNotifications] = useState(false);
  const [newNotificationsArr, setNewNotificationsArr] = useState([]);
  const [showNotificationsList, setShowNotificationsList] = useState(false);

  // const resetNotifications =()=>{

  //    setUserData({...userData, notifications:[]})
  // }
  useEffect(() => {
    console.log("render");
    const checkNotifications = () => {
      if (userData.notifications.length !== 0) {
        const newNotifications = userData.notifications.filter(
          (notification) => notification.status === "new"
        );
        if (newNotifications.length !== 0) {
          setHasNewNotifications(true);
        }
        setNewNotificationsArr([...newNotifications]);
      }
    };

    checkNotifications();
  }, []);
  return (
    <div className="p-2">
      <img src={userData.avatarUrl} alt="" className="w-10" />
      {hasNewNotifications ? (
        <div className="relative">
          <button
            onClick={() => setShowNotificationsList(true)}
            className="bg-clip-text pt-2  text-transparent bg-gradient-to-r from-pink-500 to-violet-500"
          >
            {newNotificationsArr.length} NEWS
          </button>
          {showNotificationsList ? (
            <ul>
              {newNotificationsArr.map((note) => {
                return (
                  <li
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
                    <button onClick={navigate("/friends")}>{note.type}</button>
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
