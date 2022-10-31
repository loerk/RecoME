import React from "react";
import { FiExternalLink } from "react-icons/fi";
import { VscCheck } from "react-icons/vsc";
import { useNotifications } from "../../contexts/NotificationsContext";

export default function RecommendationNotification({ notification }) {
  const { deleteNotification, fetchNotifications } = useNotifications();
  const handleDelete = async (id) => {
    const result = await deleteNotification(id);
    if (result) fetchNotifications();
  };

  if (notification)
    return (
      <div className="flex mt-8 mb-4 md:w-full justify-center">
        <div className="flex flex-col w-64 md:w-full md:flex-row md:max-w-xl rounded-lg bg-gradient-to-r from-green-500 to-yellow-200 shadow-lg">
          <div
            className="pattern-zigzag-3d pattern-indigo-800 pattern-bg-white 
          pattern-size-6 pattern-opacity-20 h-28 md:h-auto opacity-60 object-cover md:w-48 rounded-t-lg md:rounded-none md:rounded-l-lg"
          ></div>
          <div className="p-6 flex w-full flex-col  justify-start">
            <h5 className="text-gray-900 uppercase text-xl font-medium mb-4">
              You got a personal Reco !
            </h5>

            <h5 className="uppercase">{notification.recoId.title}</h5>
            <p className="text-gray-900 text-base mb-4">
              by {notification.invitedBy.username.toUpperCase()} !
            </p>

            <div className="text-black flex justify-between gap-3">
              <a href={notification.recoId.url}>
                <FiExternalLink></FiExternalLink>
              </a>
              <VscCheck
                onClick={() => handleDelete(notification._id)}
                className="cursor-pointer"
              ></VscCheck>
            </div>
          </div>
        </div>
      </div>
    );
}
