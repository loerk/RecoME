import { nanoid } from "nanoid";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserData } from "../../contexts/UserDataContext";

export default function CreateBubble() {
  const [bubbleData, setBubbleData] = useState({});
  const { userData, setUserData } = useUserData();
  const navigate = useNavigate();

  function handleChange(event) {
    const { name, value } = event.target;
    setBubbleData((prevBubbleData) => ({
      ...prevBubbleData,
      [name]: value,
      id: nanoid(),
      createdAt: Date.now(),
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log(bubbleData);
    navigate(-1);
  }
  useEffect(() => {
    setUserData({ ...userData, bubbleData });
  }, [bubbleData]);
  console.log("user", userData);
  return (
    <div className="w-72 m-auto mt-8">
      <form className="flex flex-wrap gap-2" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="name"
          className="w-full font-face-tm text-2xl p-2 border-2"
          name="name"
          onChange={handleChange}
          value={bubbleData.name}
        />
        <input
          type="text"
          placeholder="descriptions"
          className=" w-full font-face-tm text-2xl p-2 border-2"
          name="categories"
          onChange={handleChange}
          value={bubbleData.categories}
        />
        <input
          type="text"
          placeholder="add categories (with comma)"
          className=" w-full font-face-tm text-2xl p-2 border-2"
          name="description"
          onChange={handleChange}
          value={bubbleData.description}
        />
        <input
          id="url"
          placeholder="image url"
          type="text"
          className=" w-full font-face-tm text-2xl p-2 border-2"
          name="imageUrl"
          onChange={handleChange}
          value={bubbleData.imageUrl}
        />

        <button className="w-full hover:translate-y-1  text-3xl p-3 bg-white  text-black  font-face-tm my-4">
          create
        </button>
      </form>
    </div>
  );
}
