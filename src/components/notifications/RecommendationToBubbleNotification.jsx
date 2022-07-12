import React from "react";
import { Link } from "react-router-dom";
import { VscCheck } from "react-icons/vsc";

import { useNotifications } from "../../contexts/NotificationsContext";
import { useBubbles } from "../../contexts/BubbleContext";
import { useRecos } from "../../contexts/RecoContext";

export default function RecommendationToBubbleNotification({ notification }) {
  const { deleteNotification } = useNotifications();
  const { getBubbleById } = useBubbles();
  const currentBubble = getBubbleById(notification.toBubble);
  const { findRecoById } = useRecos();
  const currentReco = findRecoById(notification.recoId);
  return (
    <div className="flex mt-8 md:w-full justify-center">
      <div className="flex flex-col w-64 md:w-full md:flex-row md:max-w-xl rounded-lg bg-gradient-to-br from-yellow-300 to-red-300 shadow-lg">
        <div
          className="pattern-wavy pattern-indigo-800 pattern-bg-white 
            pattern-size-6 pattern-opacity-20 h-28 md:h-auto opacity-60 object-cover md:w-48 rounded-t-lg md:rounded-none md:rounded-l-lg"
        ></div>
        <div className="p-6 flex w-full flex-col justify-between">
          <div>
            <h5 className="text-gray-900 uppercase text-xl font-medium mb-2">
              A new Reco was added to {currentBubble.name.toUpperCase()} !
            </h5>
            <p>{currentReco.title}</p>
            <p className="text-gray-900 text-base mb-4">
              by {notification.invitedByUser.toUpperCase()} !
            </p>
          </div>
          <div className="text-black flex justify-between gap-3">
            <Link to={`/bubbles/${notification.toBubble}`}>go to bubble</Link>
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
