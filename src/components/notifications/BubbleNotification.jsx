import React from "react";
import { VscCheck, VscChromeClose } from "react-icons/vsc";
import { useNavigate } from "react-router-dom";
import { useBubbles } from "../../contexts/BubbleContext";
import { useNotifications } from "../../contexts/NotificationsContext";
import { useUsers } from "../../contexts/UsersContext";

export default function BubbleNotification({ notification }) {
  const { currentUser, addFriend } = useUsers();
  const { addMember } = useBubbles();

  const { deleteNotification } = useNotifications();
  const navigate = useNavigate();
  const acceptBubbleInvitation = (friendId, notificationId) => {
    addFriend(friendId);
    addMember(currentUser.id);
    deleteNotification(notificationId);

    navigate(`/bubbles/${notification.bubbleId}`);
  };

  return (
    <div className="flex mt-8 justify-center">
      <div className="flex flex-col md:flex-row md:max-w-xl rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 shadow-lg">
        <img
          className="h-28 md:h-auto opacity-60 object-cover md:w-48 rounded-t-lg md:rounded-none md:rounded-l-lg"
          src={notification.bubble.imageUrl}
          alt=""
        />
        <div className="p-6 flex flex-col bg- justify-start">
          <h5 className="text-gray-900 uppercase text-xl font-medium mb-2">
            Invitation to {notification.bubble.name}
          </h5>
          <p className="text-gray-900 text-base mb-4">
            Congratulations, you are invited by {notification.invitedByUser}!
          </p>
          <div className="text-black flex justify-end gap-3">
            <VscChromeClose
              onClick={() => deleteNotification(notification.id)}
              className="cursor-pointer"
            ></VscChromeClose>
            <VscCheck
              onClick={() =>
                acceptBubbleInvitation(notification.createdBy, notification.id)
              }
              className="cursor-pointer"
            ></VscCheck>
          </div>
        </div>
      </div>
    </div>
  );
}
