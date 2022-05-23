import { nanoid } from "nanoid";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserData } from "../../contexts/UserDataContext";
import { useUsers } from "../../contexts/UsersContext";

export default function AddFriend() {
  const { userData, setUserData } = useUserData();
  const { users, setUsers } = useUsers();
  const navigate = useNavigate();
  const [addFriendData, setAddFriendData] = useState({
    email: "",
    toBubble: "",
  });

  const handleBubble = (e) => {
    setAddFriendData({ ...addFriendData, toBubble: e.target.value });
  };
  const handleEmail = (e) => {
    setAddFriendData({ ...addFriendData, email: e.target.value });
  };
  console.log(addFriendData);

  const sendNotification = () => {
    const addFriend = users.find((user) => user.email === addFriendData.email);
    if (addFriend.notifications.length !== 0) {
      setUsers(
        users.map((user) => {
          if (user.id === addFriend.id) {
            return {
              ...user,
              notifications: [
                ...user.notifications,
                {
                  ...addFriendData,
                  invitedAt: Date.now(),
                  invitationId: nanoid(),
                  type: "invitationToBubble",
                },
              ],
            };
          }
          return user;
        })
      );
    } else {
      setUsers(
        users.map((user) => {
          if (user.id === addFriend.id) {
            return {
              ...user,
              notifications: [
                {
                  ...addFriendData,
                  invitedAt: Date.now(),
                  invitationId: nanoid(),
                  type: "invitationToBubble",
                },
              ],
            };
          }
          return user;
        })
      );
    }
    if (userData.invitedFriends.length !== 0) {
      setUserData({
        ...userData,
        invitedFriends: [...userData.invitedFriends, { addFriendData }],
      });
    } else {
      setUserData({ ...userData, invitedFriends: [{ addFriendData }] });
    }
  };

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [userData, users]);

  return (
    <div className="flex justify-center">
      {userData.bubbles ? (
        <div className="w-72 m-auto mt-8">
          <select
            onChange={handleBubble}
            name="bubble"
            id="bubble"
            value={addFriendData.toBubble}
            aria-label="Default select example"
            className="form-select appearance-none
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
            focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
          >
            {userData.bubbles.map((bubble) => {
              return <option value={bubble.id}>{bubble.name}</option>;
            })}
          </select>
          <input
            value={addFriendData.email}
            type="email"
            name="email"
            onChange={handleEmail}
            className="
                text-center
                form-control
                block
                w-full
                px-3
                py-1.5
                text-base
                font-normal
                text-gray-700
                bg-white bg-clip-padding
                border border-solid border-gray-300
                rounded
                transition
                ease-in-out
                m-0
                focus:text-gray-700 focus:bg-white focus:border-slate-600 focus:outline-none
                     "
            id="exampleSearch"
            placeholder="Add your Friends Email"
          />
          <button onClick={sendNotification}>
            Invite Friend to your Bubble
          </button>
        </div>
      ) : (
        <p>You dont have any bubbles, please add a bubble first</p>
      )}
    </div>
  );
}
