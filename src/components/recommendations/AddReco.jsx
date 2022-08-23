import React, { useEffect, useState } from "react";

import { useBubbles } from "../../contexts/BubbleContext";
import { useUsers } from "../../contexts/UsersContext";
import { useNavigate, useParams } from "react-router-dom";
import { useRecos } from "../../contexts/RecoContext";

export default function AddReco() {
  const navigate = useNavigate();
  const { bubbleId } = useParams();
  const { friends } = useUsers();
  const { bubbles, getBubbleById, bubble } = useBubbles();
  const { addReco, setShouldFetchRecos } = useRecos();

  const [selected, setSelected] = useState({
    bubble: "",
    user: "",
  });

  const getBubble = async (id) => {
    await getBubbleById(id);
  };
  useEffect(() => {
    if (bubbleId) getBubble(bubbleId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bubbleId]);

  useEffect(() => {
    const selectedBubbleId = selected.bubble;
    if (selectedBubbleId) getBubble(selectedBubbleId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected]);
  const [recoData, setRecoData] = useState({
    title: "",
    userIds: [],
    categories: "",
    url: "",
    description: "",
    sharedWithBubbles: false,
    sharedWithFriends: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setRecoData((prevRecoData) => ({
      ...prevRecoData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async () => {
    const { sharedWithFriends, sharedWithBubbles, url, ...rest } = recoData;

    if (selected.bubble || (!!bubbleId && bubble._id === bubbleId)) {
      const recoToBubble = {
        ...rest,
        bubbleId: bubble._id || selected.bubble,
        recoUrl: url,
        userIds: bubble.members,
      };
      await addReco(recoToBubble);
      setShouldFetchRecos(true);
      navigate("/recos");
    }

    if (selected.user) {
      const recoToFriend = {
        ...rest,
        userIds: [selected.user],
        recoUrl: url,
      };
      await addReco(recoToFriend);
      setShouldFetchRecos(true);
      navigate("/recos");
    }
  };

  return (
    <div className="w-72 m-auto pt-10">
      <h1 className="uppercase tracking-wider text-3xl mb-8">
        create a Recommendation
      </h1>
      {!bubbleId ? (
        <div className="flex flex-wrap gap-2">
          <div className="flex flex-col gap-3 mb-8">
            <label className="pl-3 font-face-tm text-2xl">
              <input
                className="mr-3 scale-150"
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
                className="mr-3 scale-150"
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
                  bubble: e.target.value,
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
              {bubbles.map((bubble, index) => {
                return (
                  <option key={index} value={bubble._id}>
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
                  user: e.target.value,
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
              {friends.map((friend) => {
                return (
                  <option key={friend._id} value={friend._id}>
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
            required
          />
          <input
            type="categories"
            placeholder="categories (seperated with comma)"
            className="w-full font-face-tm text-2xl p-2 border-2"
            name="categories"
            onChange={handleChange}
            value={recoData.categories}
            required
          />
          <input
            type="url"
            placeholder="paste link"
            className="w-full font-face-tm text-2xl p-2 border-2"
            name="url"
            onChange={handleChange}
            value={recoData.url}
            required
          />
          <input
            type="text"
            placeholder="describe your reco"
            className=" w-full font-face-tm text-2xl p-2 border-2"
            name="description"
            onChange={handleChange}
            value={recoData.description}
            required
          />
          <button
            onClick={handleSubmit}
            className="w-full hover:translate-y-1 text-3xl p-3 bg-black  text-white font-face-tm my-4"
            disabled={
              !recoData.title ||
              !recoData.description ||
              !recoData.url ||
              !recoData.categories
            }
          >
            Create
          </button>
        </div>
      ) : (
        <div className="flex flex-col gap-3 mb-8">
          <h2 className="my-5">to bubble {bubble.name?.toUpperCase()}</h2>
          <input
            type="text"
            placeholder="title"
            className="w-full font-face-tm text-2xl p-2 border-2"
            name="title"
            onChange={handleChange}
            value={recoData.title}
            required
          />
          <input
            type="categories"
            placeholder="categories (seperated with comma)"
            className="w-full font-face-tm text-2xl p-2 border-2"
            name="categories"
            onChange={handleChange}
            value={recoData.categories}
            required
          />
          <input
            type="url"
            placeholder="paste link"
            className="w-full font-face-tm text-2xl p-2 border-2"
            name="url"
            onChange={handleChange}
            value={recoData.url}
            required
          />
          <input
            type="text"
            placeholder="describe your reco"
            className=" w-full font-face-tm text-2xl p-2 border-2"
            name="description"
            onChange={handleChange}
            value={recoData.description}
            required
          />
          <button
            onClick={handleSubmit}
            className="w-full hover:translate-y-1 text-3xl p-3 bg-black  text-white font-face-tm my-4"
            disabled={
              !recoData.title ||
              !recoData.description ||
              !recoData.url ||
              !recoData.categories
            }
          >
            Create Recommendation
          </button>
        </div>
      )}
    </div>
  );
}
