import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useBubbles } from "../contexts/BubbleContext";

const DeletionType = {
  USER: "USER",
  ALL: "ALL",
};
export default function DeleteBubbleModal({
  showModal,
  setShowModal,
  bubbleId,
}) {
  const [deletionType, setDeletionType] = useState(null);

  const { deleteBubble, exitBubble } = useBubbles();

  const navigate = useNavigate();
  const handleDelete = () => {
    if (deletionType === "ALL") {
      deleteBubble(bubbleId);
      navigate("/bubbles");
    }
    if (deletionType === "USER") {
      exitBubble(bubbleId);
      navigate("/bubbles");
    }
    setShowModal(false);
  };

  if (!showModal) return null;
  const handleOnClose = (e) => {
    if (e.target.id === "container") setShowModal(false);
  };

  return (
    <div
      id="container"
      onClick={(e) => handleOnClose(e)}
      className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center"
    >
      <div className="bg-white p-2 rounded w-72">
        <h1 className="font-semibold my-2 text-center text-xl text-gray-700">
          I want to...
        </h1>
        <div className="flex w-2/3 m-auto flex-col">
          <label className="">
            <input
              type="checkbox"
              onChange={() => setDeletionType(DeletionType.USER)}
              className="border border-gray-700 p-2 mr-2 rounded mb-5"
            />
            exit Bubble
          </label>
          <label htmlFor="">
            <input
              type="checkbox"
              onChange={() => setDeletionType(DeletionType.ALL)}
              className="border border-gray-700 p-2 mr-2 rounded mb-5"
            />
            delete Bubble for everyone
          </label>
        </div>
        <div className="text-center">
          <button
            onClick={() => handleDelete()}
            className="px-5 py-2 bg-gray-700 text-white m-3 rounded"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
