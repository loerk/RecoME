import { v1 as uuidv1 } from "uuid";
import React, { useState } from "react";
import { useUsers } from "../../contexts/UsersContext";
import { useBubbles } from "../../contexts/BubbleContext";

export default function AddFriend() {
  const { currentUser, updateUser, updateUsers, findUserByEmail } = useUsers();
  const { getBubbles } = useBubbles();

  const [invitiationStatus, setInvitationStatus] = useState(null);
  const [addFriendData, setAddFriendData] = useState({
    email: "",
    toBubble: "",
  });

  const bubbles = getBubbles();

  const handleBubble = (e) => {
    setAddFriendData({
      ...addFriendData,
      type: "invitation",
      toBubble: e.target.value,
      invitedBy: currentUser.id,
      invitedByUser: currentUser.username,
    });
  };

  const handleEmail = (e) => {
    setAddFriendData({ ...addFriendData, email: e.target.value });
  };

  const sendNotification = () => {
    if (addFriendData.email === "") {
      setInvitationStatus("Ooops, an email is missing :/ try again!");
      return;
    }

    const addFriend = findUserByEmail(addFriendData.email);
    const updateAddFriend = {
      ...addFriend,
      notifications: [
        ...addFriend.notifications,
        {
          ...addFriendData,
          invitedAt: Date.now(),
          invitationId: uuidv1(),
          type: "invitationToBubble",
        },
      ],
    };

    updateUser(updateAddFriend);
    updateUsers(updateAddFriend);

    setInvitationStatus(" Great, your friend got invited!");
  };

  return (
    <div className="flex justify-center text-center">
      {bubbles ? (
        <div className="w-72 m-auto mt-8">
          <select
            onChange={handleBubble}
            name="bubble"
            id="bubble"
            defaultValue={addFriendData.toBubble}
            aria-label="Default select example"
            required
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
            {bubbles.map((bubble) => {
              return <option value={bubble.id}>{bubble.name}</option>;
            })}
          </select>
          <input
            value={addFriendData.email}
            type="email"
            name="email"
            onChange={handleEmail}
            required
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
                focus:text-gray-700 focus:bg-white focus:border-slate-600 focus:outline-none"
            id="exampleSearch"
            placeholder="Add your Friends Email"
          />
          <button
            className="inline-block leading-tight uppercase  shadow-md hover:bg-gradient-to-r from-cyan-500 to-blue-500 hover:shadow-lg focus:bg-black focus:shadow-lg focus:outline-none focus:ring-0 active:bg-pink-800 active:shadow-lg transition duration-150 ease-in-out bg-black rounded-md  text-white px-2 py-1"
            onClick={sendNotification}
          >
            Invite Friend to your Bubble
          </button>
          {!!invitiationStatus && (
            <p className="text-fuchsia-600 pt-3">{invitiationStatus}</p>
          )}
        </div>
      ) : (
        <p>You dont have any bubbles, please add a bubble first</p>
      )}
    </div>
  );
}
