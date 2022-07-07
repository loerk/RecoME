import React, { useState } from "react";
import { useUsers } from "../../contexts/UsersContext";
import { useBubbles } from "../../contexts/BubbleContext";
import { useParams } from "react-router-dom";

export default function AddFriend() {
  const params = useParams();
  const { findUserById, currentUser, findUserByEmail, inviteFriendsToBubble } =
    useUsers();
  const { getBubbles, getBubbleById } = useBubbles();
  const [invitationStatus, setInvitationStatus] = useState({
    single: "",
    group: "",
  });
  const [selectedBubbleId, setSelectedBubbleId] = useState(
    params.bubbleId || ""
  );
  const [email, setEmail] = useState("");
  const [friendsList, setFriendsList] = useState([]);

  const bubbles = getBubbles();
  const { friends } = currentUser;
  const selectedBubble = getBubbleById(selectedBubbleId);

  const isFriendInvited = (id) => friendsList.includes(id);

  const toggleFriend = (id) => {
    if (isFriendInvited(id)) {
      setFriendsList(friendsList.filter((friendId) => friendId !== id));
    } else {
      setFriendsList([...friendsList, id]);
    }
  };

  const inviteFriends = () => {
    if (!selectedBubbleId) {
      setStatus({ group: "please select a bubble first" });
      return;
    }
    if (!friendsList.length) {
      setStatus({ group: "please select at least one friend" });
      return;
    }

    const filteredInvitedFriendsList = friendsList.filter((friendId) => {
      const friend = findUserById(friendId);
      const isAlreadyMember = selectedBubble.members.some(
        (member) => member === friendId
      );
      const isAlreadyInvited = friend.notifications.some(
        (notification) => notification.toBubble === selectedBubbleId
      );

      if (isAlreadyInvited || isAlreadyMember) return false;
      return true;
    });

    inviteFriendsToBubble(selectedBubbleId, filteredInvitedFriendsList);

    if (filteredInvitedFriendsList.length === friendsList.length) {
      setStatus({ group: "all your friends got invited" });
    } else {
      setStatus({ group: "the friends who are not yet members got invited" });
    }
    setFriendsList([]);
  };

  function setStatus(message) {
    setInvitationStatus(message);
    setTimeout(() => {
      setInvitationStatus("");
    }, 4000);
  }

  const inviteFriend = () => {
    if (!selectedBubbleId) {
      setStatus({ single: "please select a bubble" });
      return;
    }

    if (!email) {
      setStatus({ single: "Ooops, an email is missing :/ try again!" });
      return;
    }

    if (email && !findUserByEmail(email)) {
      setStatus({
        single:
          "Oh, we dont know your friend,yet... please ask your friend to register first",
      });
      return;
    }

    const selectedBubble = getBubbleById(selectedBubbleId);
    const friend = findUserByEmail(email);
    const isAlreadyMember =
      selectedBubble &&
      selectedBubble.members.some((memberId) => memberId === friend.id);

    if (isAlreadyMember) {
      setStatus({ single: "Your friend is already member of this group!" });
      return;
    }
    const isAlreadyInvited = friend.notifications.some(
      (notification) => notification.toBubble === selectedBubbleId
    );

    if (isAlreadyInvited) return;

    if (!friend) {
      setStatus({
        single:
          "Oh, we dont know your friend, yet... please ask your friend to register first",
      });
      return;
    }
    inviteFriendsToBubble(selectedBubbleId, [friend.id]);
    setStatus({ single: "Great, your friend got invited!" });
  };
  if (!selectedBubble && params.bubbleId) {
    return;
  }

  return (
    <div>
      {bubbles ? (
        <div>
          {!params.bubbleId && (
            <div className="w-72 m-auto mt-8">
              <h1 className="my-10 uppercase">
                YEJ - invite your friends to your bubble
              </h1>
              <p>Select the bubble you want your friends to join</p>
              <select
                onChange={(e) => {
                  setSelectedBubbleId(e.target.value);
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
            </div>
          )}
          {params.bubbleId && (
            <div className="w-72 m-auto mt-8">
              <h1 className=" my-10 uppercase">
                YEJ - invite your friends to {selectedBubble.name}
              </h1>
            </div>
          )}
          <div className="w-72 m-auto mt-8">
            <p>Add your friends email here :</p>
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
            {email ? (
              <button
                className="inline-block leading-tight uppercase  shadow-md hover:bg-gradient-to-r from-cyan-500 to-blue-500 hover:shadow-lg focus:bg-black focus:shadow-lg focus:outline-none focus:ring-0 active:bg-pink-800 active:shadow-lg transition duration-150 ease-in-out bg-black rounded-md  text-white px-2 py-1"
                onClick={inviteFriend}
              >
                Invite Friend to your Bubble
              </button>
            ) : (
              <button
                className="inline-block leading-tight uppercase  shadow-md  focus:bg-black  disabled:bg-slate-400 disabled:opacity-50 rounded-md  text-white px-2 py-1"
                onClick={inviteFriend}
                disabled
              >
                Invite Friend to your Bubble
              </button>
            )}
            {!!invitationStatus.single && (
              <p className="text-fuchsia-600 pt-3">{invitationStatus.single}</p>
            )}
          </div>
        </div>
      ) : (
        <p>You dont have any bubbles, please add a bubble first</p>
      )}

      <div className="w-72 m-auto my-10">
        {friends.length !== 0 ? (
          <ul className="pt-6 ">
            <h1 className=" pb-5 ">...or choose from your friends:</h1>
            <div className="flex  gap-4 flex-wrap mb-2  w-56  text-center">
              {friends.map((friendId) => {
                let currFriend = findUserById(friendId);
                if (params.friendId === undefined) {
                  return (
                    <li key={friendId}>
                      <div className="">
                        <div
                          className={
                            isFriendInvited(currFriend.id)
                              ? "bg-gradient-to-r from-cyan-500 to-blue-500 shadow-lg "
                              : null
                          }
                        >
                          <img
                            onClick={() => toggleFriend(currFriend.id)}
                            className="w-14 h-14 p-1 object-cover object-center shadow-lg  rounded-full cursor-pointer"
                            src={currFriend.avatarUrl}
                            alt=""
                          />
                          <p className="relative">{currFriend.username}</p>
                        </div>
                      </div>
                    </li>
                  );
                } else {
                  return null;
                }
              })}
            </div>
            <div className="mt-8 ">
              {friendsList.length !== 0 ? (
                <button
                  className="inline-block leading-tight uppercase shadow-md hover:bg-gradient-to-r from-cyan-500 to-blue-500 hover:shadow-lg focus:bg-black focus:shadow-lg focus:outline-none focus:ring-0 active:bg-pink-800 active:shadow-lg transition duration-150 ease-in-out bg-black rounded-md  text-white px-2 py-1"
                  onClick={inviteFriends}
                >
                  Invite selected Friends
                </button>
              ) : (
                <button
                  className="inline-block leading-tight uppercase  shadow-md  focus:bg-black  disabled:bg-slate-400 disabled:opacity-50 rounded-md  text-white px-2 py-1"
                  onClick={inviteFriends}
                  disabled
                >
                  Invite selected Friends
                </button>
              )}
              {!!invitationStatus.group && (
                <p className="text-fuchsia-600 pt-3">
                  {invitationStatus.group}
                </p>
              )}
            </div>
          </ul>
        ) : (
          <p className="text-center pt-5">:/ you dont have any friends...yet</p>
        )}
      </div>
    </div>
  );
}
