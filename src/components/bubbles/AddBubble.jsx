import { nanoid } from "nanoid";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserData } from "../../contexts/UserDataContext";
import { useUsers } from "../../contexts/UsersContext";

export default function AddBubble() {
  const [bubbleData, setBubbleData] = useState([]);
  const { userData, setUserData } = useUserData();
  const { users, setUsers } = useUsers();
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setBubbleData((prevBubbleData) => ({
      ...prevBubbleData,
      [name]: value,
      id: nanoid(),
      createdAt: Date.now(),
      createdBy: userData.id,
      members: [{ userId: userData.id, username: userData.username }],
    }));
  };

  function handleSubmit(event) {
    event.preventDefault();
    if (!userData.bubbles) {
      setUserData({ ...userData, bubbles: [bubbleData] });
    } else {
      setUserData({ ...userData, bubbles: [...userData.bubbles, bubbleData] });
    }
    navigate(-1);
  }

  useEffect(() => {
    setUsers(users.map((user) => (user.id === userData.id ? userData : user)));
    localStorage.setItem("users", JSON.stringify(users));
  }, [userData]); // eslint-disable-line

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
          name="description"
          onChange={handleChange}
          value={bubbleData.description}
        />
        <input
          type="text"
          placeholder="add categories (with comma)"
          className=" w-full font-face-tm text-2xl p-2 border-2"
          name="categories"
          onChange={handleChange}
          value={bubbleData.categories}
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
