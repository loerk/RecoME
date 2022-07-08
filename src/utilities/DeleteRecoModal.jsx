import React, { useState } from "react";
import { useRecos } from "../contexts/RecoContext";
const DeletionType = {
  USER: "USER",
  ALL: "ALL",
};
export default function DeleteRecoModal({
  showModal,
  setShowModal,
  recoIdToDelete,
}) {
  const [deletionType, setDeletionType] = useState(null);

  const { deleteReco, ignoreReco } = useRecos();

  const handleDelete = () => {
    if (deletionType === "ALL") deleteReco(recoIdToDelete);
    if (deletionType === "USER") ignoreReco(recoIdToDelete);
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
        <h1 className="font-semibold mt-2 text-center text-xl text-gray-700">
          Delete, sure!
        </h1>
        <p className="text-center mb-4">But tell me more...</p>
        <div className="flex w-2/3 m-auto flex-col">
          <label className="">
            <input
              type="checkbox"
              onChange={() => setDeletionType(DeletionType.USER)}
              className="border border-gray-700 p-2 mr-2 rounded mb-5"
            />
            delete Reco only for me
          </label>
          <label htmlFor="">
            <input
              type="checkbox"
              onChange={() => setDeletionType(DeletionType.ALL)}
              className="border border-gray-700 p-2 mr-2 rounded mb-5"
            />
            delete Reco for everybody
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
