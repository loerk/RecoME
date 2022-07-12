import React from "react";
import { VscCheck, VscChromeClose } from "react-icons/vsc";
import { Link } from "react-router-dom";
import { useBubbles } from "../../contexts/BubbleContext";
import { useNotifications } from "../../contexts/NotificationsContext";
import { useUsers } from "../../contexts/UsersContext";

export default function BubbleNotification({ notification }) {
  const { currentUser, addFriend } = useUsers();
  const { addMember, getBubbleById } = useBubbles();

  const { deleteNotification } = useNotifications();
  const currentBubble = getBubbleById(notification.bubbleId);
  const acceptBubbleInvitation = (friendId, notificationId) => {
    addFriend(friendId);
    addMember(currentUser.id, notification.bubbleId);
    deleteNotification(notificationId);
  };

  return (
    <div className="flex mt-8 w-full justify-center">
      <div className="flex w-64 md:w-full flex-col md:flex-row md:max-w-xl rounded-lg bg-gradient-to-r from-cyan-500 to-blue-300 shadow-lg">
        <div
          className="pattern-isometric pattern-indigo-800 pattern-bg-white 
            pattern-size-6 pattern-opacity-20 h-28 md:h-auto opacity-60 object-cover md:w-48 rounded-t-lg md:rounded-none md:rounded-l-lg"
        ></div>
        <div
          className="p-6 flex w-full flex-col   
        justify-start"
        >
          <div>
            <h5 className="text-gray-900 uppercase text-xl font-medium">
              Invitation to BUBBLE
            </h5>
            <h5 className="mb-2">{notification.bubble.name.toUpperCase()}</h5>
            <p className="text-gray-900 text-base mb-4">
              by {notification.invitedByUser.toUpperCase()} !
            </p>
          </div>
          <div className="text-black flex justify-between gap-3">
            <Link to={`/bubbles/${currentBubble.id}`}>go to bubble</Link>
            <div className="flex gap-3">
              <VscChromeClose
                onClick={() => deleteNotification(notification.id)}
                className="cursor-pointer"
              ></VscChromeClose>
              <VscCheck
                onClick={() =>
                  acceptBubbleInvitation(
                    notification.invitedBy,
                    notification.id
                  )
                }
                className="cursor-pointer"
              ></VscCheck>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
