import React from "react";
import { FiExternalLink } from "react-icons/fi";
import { VscCheck } from "react-icons/vsc";
import { useNotifications } from "../../contexts/NotificationsContext";

export default function RecommendationNotification({ notification }) {
  const { deleteNotification } = useNotifications();

  return (
    <div className="flex mt-8 justify-center">
      <div className="flex flex-col md:flex-row md:max-w-xl rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 shadow-lg">
        <img
          className="h-28 md:h-auto opacity-60 object-cover md:w-48 rounded-t-lg md:rounded-none md:rounded-l-lg"
          src="https://images.unsplash.com/photo-1545315003-c5ad6226c272?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1064&q=80"
          alt=""
        />
        <div className="p-6 flex flex-col bg- justify-start">
          <h5 className="text-gray-900 uppercase text-xl font-medium mb-2">
            You got a Reco: {notification.title}
          </h5>
          <p className="text-gray-900 text-base mb-4">
            Congratulations, you got a Reco by{" "}
            {notification.invitedByUser.toUpperCase()}!
          </p>
          <p>{notification.comment}</p>
          <a href={notification.url}>
            <FiExternalLink></FiExternalLink>
          </a>
          <div className="text-black flex justify-end gap-3">
            <VscCheck
              onClick={() => deleteNotification(notification.id)}
              className="cursor-pointer"
            ></VscCheck>
          </div>
        </div>
      </div>
    </div>
  );
}
