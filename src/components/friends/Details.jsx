import React from "react";

import { useUsers } from "../../contexts/UsersContext";
import { useBubbles } from "../../contexts/BubbleContext";
import { VscChromeClose, VscCheck } from "react-icons/vsc";
import { useNavigate } from "react-router-dom";
import { useRecos } from "../../contexts/RecoContext";
import { FiExternalLink } from "react-icons/fi";

export default function Details() {
  const navigate = useNavigate();

  const { currentUser, updateCurrentUser, updateUsers, findUserById } =
    useUsers();
  const { getBubbleById, updateBubble } = useBubbles();
  const { findRecoById } = useRecos();

  let currentNotifications = currentUser.notifications;

  const currentBubble = getBubbleById(currentNotifications[0].toBubble);
  const invitedByUser = findUserById(currentNotifications[0].invitedBy);
  const newReco = findRecoById(currentNotifications[0].recoId);

  const resetInvitationsArr = () => {
    currentUser.notifications.shift();
    const updatedUser = { ...currentUser };
    updateCurrentUser(updatedUser);
    updateUsers([updatedUser]);
  };

  const acceptBubbleInvitation = () => {
    const alreadyFriends = currentUser.friends.find(
      (friend) => friend === invitedByUser.id
    );

    if (!alreadyFriends) {
      currentUser.friends = [
        ...currentUser.friends,
        currentNotifications[0].invitedBy,
      ];
      invitedByUser.friends = [...invitedByUser.friends, currentUser.id];
    }
    currentBubble.members = [...currentBubble.members, currentUser.id];
    resetInvitationsArr();
    updateBubble(currentBubble);
    navigate(`/bubbles/${currentBubble.id}`);
  };

  const refuseBubbleInvitation = () => {
    resetInvitationsArr();
    navigate("/bubbles");
  };
  const acceptReco = () => {
    const updatedUser = {
      ...currentUser,
      recos: [...currentUser.recos, newReco.id],
    };
    updateCurrentUser(updatedUser);
    updateUsers([updatedUser]);
    resetInvitationsArr();
    navigate("/recos");
  };
  const refuseReco = () => {
    resetInvitationsArr();
    navigate("/recos");
  };
  return (
    <div className="flex items-center flex-col pt-28">
      <h1>WOW WOW WOW</h1>
      <p>here are your news</p>
      {newReco && (
        <div className="flex mt-8 justify-center">
          <div className="flex flex-col md:flex-row md:max-w-xl rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 shadow-lg">
            <img
              className="h-28 md:h-auto opacity-60 object-cover md:w-48 rounded-t-lg md:rounded-none md:rounded-l-lg"
              src="https://images.unsplash.com/photo-1545315003-c5ad6226c272?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1064&q=80"
              alt=""
            />
            <div className="p-6 flex flex-col bg- justify-start">
              <h5 className="text-gray-900 uppercase text-xl font-medium mb-2">
                You got a Reco: {newReco.title}
              </h5>
              <p className="text-gray-900 text-base mb-4">
                Congratulations, you got a Reco by{" "}
                {currentNotifications[0].invitedByUser.toUpperCase()}!
              </p>
              <p>{newReco.comment}</p>
              <a href={newReco.url}>
                <FiExternalLink></FiExternalLink>
              </a>
              <div className="text-black flex justify-end gap-3">
                <VscChromeClose
                  onClick={() => refuseReco()}
                  className="cursor-pointer"
                ></VscChromeClose>
                <VscCheck
                  onClick={() => acceptReco()}
                  className="cursor-pointer"
                ></VscCheck>
              </div>
            </div>
          </div>
        </div>
      )}
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
