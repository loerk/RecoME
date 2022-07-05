import React from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";

export default function Modal({
  showModal,
  onClose,
  setDeleteCurrentReco,
  deleteCurrentReco,
  handleModalDelete,
}) {
  if (!showModal) return null;
  const handleOnClose = (e) => {
    if (e.target.id === "container") onClose();
  };

  return (
    <div
      id="container"
      onClick={handleOnClose}
      className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center"
    >
      <div className="bg-white p-2 rounded w-72">
        <AiOutlineCloseCircle className="ml-auto" onClick={onClose} />
        <h1 className="font-semibold text-center text-xl text-gray-700">
          What do you want to delete?
        </h1>
        <p className="text-center text-gray-700 mb-5">?</p>

        <div className="flex flex-col">
          <label htmlFor="">
            <input
              type="checkbox"
              onChange={() =>
                setDeleteCurrentReco({ ...deleteCurrentReco, forUser: true })
              }
              className="border border-gray-700 p-2 rounded mb-5"
            />
            delete Reco only for me
          </label>
          <label htmlFor="">
            <input
              type="checkbox"
              onChange={() =>
                setDeleteCurrentReco({ ...deleteCurrentReco, forAll: true })
              }
              className="border border-gray-700 p-2 rounded mb-5"
            />
            delete Reco for everybody
          </label>
        </div>
        <div className="text-center">
          <button
            onClick={() => handleModalDelete()}
            className="px-5 py-2 bg-gray-700 text-white rounded"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
