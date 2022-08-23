import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useUsers } from "../../contexts/UsersContext";

export default function Friend() {
  const navigate = useNavigate();
  const { friendId } = useParams();
  const { friends, unfriendUser, setShouldUpdateFriends } = useUsers();
  const friend = friends.find((friend) => friend._id === friendId);

  const removeFriend = async () => {
    await unfriendUser(friendId);
    setShouldUpdateFriends(true);
    navigate("/friends");
  };

  return (
    <div className="md:flex m-10">
      <img src={friend.avatarUrl} alt="friendAvatar" />
      <div>
        <h2 className="tracking-widest pb-4">
          {friend.username.toUpperCase()}
        </h2>
        <div>
          <h2>shared Bubbles</h2>
          <h2>shared Recommendations </h2>
        </div>
        <button
          className="inline-block leading-tight uppercase  shadow-md hover:bg-gradient-to-r from-cyan-500 to-blue-500 hover:shadow-lg focus:bg-black focus:shadow-lg focus:outline-none focus:ring-0 active:bg-pink-800 active:shadow-lg transition duration-150 ease-in-out bg-black rounded-md  text-white px-2 py-1 my-4"
          onClick={() => removeFriend()}
        >
          remove friend
        </button>
      </div>
    </div>
  );
}
