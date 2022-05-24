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
  console.log("currUser", userData);
  const handleBubble = (e) => {
    let invitedBy = userData.id;
    setAddFriendData({
      ...addFriendData,
      toBubble: e.target.value,
      invitedBy: invitedBy,
    });
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
                  status: "new",
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
                  status: "new",
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
    <div className="flex justify-center text-center">
      {userData.bubbles ? (
        <div className="w-72 m-auto mt-8">
          <select
            onChange={handleBubble}
            name="bubble"
            id="bubble"
            defaultValue={addFriendData.toBubble}
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
            <option selected>select a bubble</option>
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
            mb-5
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
          <button
            className="bg-black rounded-md  text-white px-2 py-1"
            onClick={sendNotification}
          >
            Invite Friend to your Bubble
          </button>
        </div>
      ) : (
        <p>You dont have any bubbles, please add a bubble first</p>
      )}
    </div>
  );
}
