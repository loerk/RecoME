import React, { useState } from "react";

import { useBubbles } from "../../contexts/BubbleContext";
import { useTheme } from "../../contexts/ThemeContext";
import { useUsers } from "../../contexts/UsersContext";
import { useNavigate, useParams } from "react-router-dom";
import { useRecos } from "../../contexts/RecoContext";

export default function AddReco() {
  const theme = useTheme();
  const navigate = useNavigate();
  const { bubbleId } = useParams();
  const { findUserById, currentUser } = useUsers();
  const { bubbles, getBubbleById } = useBubbles();
  const { addReco, setFetchReco } = useRecos();

  const [selected, setSelected] = useState({
    bubble: bubbleId || "",
    user: "",
  });

  const [recoData, setRecoData] = useState({
    title: "",
    userIds: [],
    categories: "",
    url: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setRecoData((prevRecoData) => ({
      ...prevRecoData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async () => {
    if (selected.bubble.id) {
      const recoToBubble = {
        ...recoData,
        bubbleId: selected.bubble.id,
      };
      await addReco(recoToBubble);
      setFetchReco(true);
      navigate("/recos");
    }

    if (selected.user.id) {
      const recoToFriend = {
        ...recoData,
        userIds: [selected.user.id],
      };
      await addReco(recoToFriend);
      setFetchReco(true);
      navigate("/recos");
    }
  };

  return (
    <div className="w-72 m-auto pt-10">
      <h1 className="uppercase tracking-wider text-3xl mb-8">
        create a Recommendation
      </h1>
      {!selected.bubble.name ? (
        <div className="flex flex-wrap gap-2">
          <div className="flex flex-col gap-3 mb-8">
            <label className="pl-3 font-face-tm text-2xl">
              <input
                className="mr-3"
                id="isSharedInBubble"
                type="checkbox"
                name="sharedWithBubbles"
                onChange={handleChange}
                checked={recoData.sharedWithBubbles}
              />
              share with Bubble
            </label>
            <label className="pl-3 font-face-tm text-2xl">
              <input
                className="mr-3"
                id="isSharedWithFriends"
                type="checkbox"
                name="sharedWithFriends"
                onChange={handleChange}
                checked={recoData.sharedWithFriends}
              />
              share with Friends
            </label>
          </div>
          {recoData.sharedWithBubbles && (
            <select
              onChange={(e) => {
                setSelected({
                  ...selected,
                  bubble: getBubbleById(e.target.value),
                });
              }}
              name="bubble"
              id="bubble"
              aria-label="Default select example"
              className="form-select appearance-none mb-5
            block
            w-full
            px-3
            py-2
            text-base
            font-normal
            text-gray-700
            bg-white bg-clip-padding bg-no-repeat
            border border-solid border-gray-300
            rounded
            transition
            ease-in-out
            m-0      
            focus:text-gray-700 focus:bg-white focus:border-black focus:outline-none"
            >
              <option value="">select a bubble</option>
              {bubbles.map((bubble) => {
                return (
                  <option key={bubble.id} value={bubble.id}>
                    {bubble.name}
                  </option>
                );
              })}
            </select>
          )}
          {recoData.sharedWithFriends && (
            <select
              onChange={(e) => {
                setSelected({
                  ...selected,
                  user: findUserById(e.target.value),
                });
              }}
              name="friends"
              id="friends"
              aria-label="Default select example"
              className="form-select appearance-none mb-5
            block
            w-full
            px-3
            py-2
            text-base
            font-normal
            text-gray-700
            bg-white bg-clip-padding bg-no-repeat
            border border-solid border-gray-300
            rounded
            transition
            ease-in-out
            m-0      
            focus:text-gray-700 focus:bg-white focus:border-black focus:outline-none"
            >
              <option value="">select a friend</option>
              {currentUser.friends.map((friendId) => {
                const friend = findUserById(friendId);
                return (
                  <option key={friend.id} value={friend.id}>
                    {friend.username}
                  </option>
                );
              })}
            </select>
          )}

          <input
            type="text"
            placeholder="title"
            className="w-full font-face-tm text-2xl p-2 border-2"
            name="title"
            onChange={handleChange}
            value={recoData.title}
          />
          <input
            type="categories"
            placeholder="categories (seperated with comma)"
            className="w-full font-face-tm text-2xl p-2 border-2"
            name="categories"
            onChange={handleChange}
            value={recoData.categories}
          />
          <input
            type="url"
            placeholder="paste link"
            className="w-full font-face-tm text-2xl p-2 border-2"
            name="url"
            onChange={handleChange}
            value={recoData.url}
          />
          <input
            type="text"
            placeholder="describe your reco"
            className=" w-full font-face-tm text-2xl p-2 border-2"
            name="description"
            onChange={handleChange}
            value={recoData.description}
          />
          <button
            onClick={handleSubmit}
            className={
              theme
                ? "w-full hover:translate-y-1  text-3xl p-3 bg-white  text-black  font-face-tm my-4"
                : "w-full hover:translate-y-1  text-3xl p-3 bg-black  text-white  font-face-tm my-4"
            }
            disabled={!recoData.title || !recoData.url}
          >
            Create
          </button>
        </div>
      ) : (
        <div className="flex flex-col gap-3 mb-8">
          <h2 className="my-5">
            to the bubble {selected.bubble.name.toUpperCase()}
          </h2>
          <input
            type="text"
            placeholder="title"
            className="w-full font-face-tm text-2xl p-2 border-2"
            name="title"
            onChange={handleChange}
            value={recoData.title}
          />
          <input
            type="categories"
            placeholder="categories (seperated with comma)"
            className="w-full font-face-tm text-2xl p-2 border-2"
            name="categories"
            onChange={handleChange}
            value={recoData.categories}
          />
          <input
            type="url"
            placeholder="paste link"
            className="w-full font-face-tm text-2xl p-2 border-2"
            name="url"
            onChange={handleChange}
            value={recoData.url}
          />
          <input
            type="text"
            placeholder="describe your reco"
            className=" w-full font-face-tm text-2xl p-2 border-2"
            name="description"
            onChange={handleChange}
            value={recoData.description}
          />
          <button
            onClick={handleSubmit}
            className={
              theme
                ? "w-full hover:translate-y-1  text-3xl p-3 bg-white  text-black  font-face-tm my-4"
                : "w-full hover:translate-y-1  text-3xl p-3 bg-black  text-white  font-face-tm my-4"
            }
            disabled={!recoData.title || !recoData.url}
          >
            Create Recommendation
          </button>
        </div>
      )}
    </div>
  );
}
