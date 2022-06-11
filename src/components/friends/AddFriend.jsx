import React, { useState } from "react";
import { useUsers } from "../../contexts/UsersContext";
import { useBubbles } from "../../contexts/BubbleContext";

export default function AddFriend() {
  const { findUserByEmail, inviteFriendToBubble, currentUser } = useUsers();
  const { getBubbles, getBubbleById } = useBubbles();

  const [invitiationStatus, setInvitationStatus] = useState(null);
  const [bubbleId, setBubbleId] = useState();
  const [email, setEmail] = useState(null);

  const bubbles = getBubbles();

  const onSubmit = () => {
    const selectedBubble = getBubbleById(bubbleId);
    const addFriend = findUserByEmail(email);

    const alreadyMember = selectedBubble.members.find(
      (member) => member === addFriend.id
    );

    if (alreadyMember) {
      setInvitationStatus("Your friend is already member of this group!");
      return;
    }
    if (email === "") {
      setInvitationStatus("Ooops, an email is missing :/ try again!");
      return;
    }
    if (!addFriend) {
      setInvitationStatus(
        "Oh, we dont know your friend,yet... please ask your friend to register first"
      );
    }

    inviteFriendToBubble(email, bubbleId);
    setInvitationStatus(" Great, your friend got invited!");
  };

  return (
    <div className="flex justify-center text-center">
      {bubbles ? (
        <div className="w-72 m-auto mt-8">
          <select
            onChange={(e) => {
              setBubbleId(e.target.value);
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
            <option selected>select a bubble</option>
            {bubbles.map((bubble) => {
              return <option value={bubble.id}>{bubble.name}</option>;
            })}
          </select>
          <input
            value={email}
            type="email"
            name="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
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
            onClick={onSubmit}
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
