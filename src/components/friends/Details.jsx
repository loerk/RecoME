import React, { useState } from "react";

import { useUsers } from "../../contexts/UsersContext";
import { useBubbles } from "../../contexts/BubbleContext";
import { VscChromeClose, VscCheck } from "react-icons/vsc";
import { useNavigate } from "react-router-dom";

export default function Details() {
  const navigate = useNavigate();

  const { currentUser, updateUser, updateUsers, findUserById } = useUsers();
  const { getBubbleById, updateBubble } = useBubbles();

  const [updatedBubble, setUpdatedBubble] = useState();

  let currentNotifications = currentUser.notifications;

  const currentBubble = getBubbleById(currentNotifications[0].toBubble);
  const invitedByUser = findUserById(currentNotifications[0].invitedBy);

  const resetInvitationsArr = () => {
    //deletes latest notification
    currentUser.notifications.shift();
    const updatedUser = { ...currentUser };
    updateUser(updatedUser);
    updateUsers(updatedUser);
  };

  const acceptBubbleInvitation = () => {
    currentBubble.members = [...currentBubble.members, currentUser.id];
    currentUser.friends = [
      ...currentUser.friends,
      currentNotifications[0].invitedBy,
    ];
    invitedByUser.friends = [...invitedByUser.friends, currentUser.id];
    resetInvitationsArr();
    updateBubble(currentBubble);
    navigate(`/bubbles/${currentBubble.id}`);
  };

  const refuseBubbleInvitation = () => {
    resetInvitationsArr();
    navigate("/bubbles");
  };

  return (
    <div className="flex items-center flex-col mt-6">
      <h1>WOW WOW WOW</h1>
      <p>here are your news</p>
      {currentBubble && (
        <div className="flex mt-8 justify-center">
          <div className="flex flex-col md:flex-row md:max-w-xl rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 shadow-lg">
            <img
              className="h-28 md:h-auto opacity-60 object-cover md:w-48 rounded-t-lg md:rounded-none md:rounded-l-lg"
              src={currentBubble.imageUrl}
              alt=""
            />
            <div className="p-6 flex flex-col bg- justify-start">
              <h5 className="text-gray-900 uppercase text-xl font-medium mb-2">
                Invitation to {currentBubble.name}
              </h5>
              <p className="text-gray-900 text-base mb-4">
                Congratulations, you are invited by{" "}
                {currentNotifications[0].invitedByUser}!
              </p>
              <div className="text-black flex justify-end gap-3">
                <VscChromeClose
                  onClick={() => refuseBubbleInvitation()}
                  className="cursor-pointer"
                ></VscChromeClose>
                <VscCheck
                  onClick={() => acceptBubbleInvitation()}
                  className="cursor-pointer"
                ></VscCheck>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
