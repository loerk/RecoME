import React, { useEffect, useState } from "react";
import { useUserData } from "../../contexts/UserDataContext";
import { useNavigate } from "react-router-dom";

export default function Notifications() {
  const { userData } = useUserData();
  const navigate = useNavigate();
  const [hasNewNotifications, setHasNewNotifications] = useState(false);
  const [newNotificationsArr, setNewNotificationsArr] = useState([]);

  const checkNotifications = () => {
    if (userData.notifications) {
      const newNotifications = userData.notifications.filter(
        (notification) => notification.status === "new"
      );
      if (newNotifications !== 0) {
        setHasNewNotifications(true);
      }
      setNewNotificationsArr([...newNotifications]);
      navigate("/news");
    }
  };
  // const resetNotifications =()=>{

  //    setUserData({...userData, notifications:[]})
  // }
  useEffect(() => {
    checkNotifications();
    console.log("rendered useeffect");
  }, [hasNewNotifications]);
  return (
    <div className="p-2">
      <img src={userData.avatarUrl} alt="" className="w-10" />
      {hasNewNotifications ? (
        <p className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">
          {newNotificationsArr.length} NEWS
        </p>
      ) : null}
    </div>
  );
}
