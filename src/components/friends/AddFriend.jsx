import React, { useState } from "react";
import { useUsers } from "../../contexts/UsersContext";
import { useBubbles } from "../../contexts/BubbleContext";
import { useLocation, useParams, useNavigate } from "react-router-dom";

export default function AddFriend() {
  const { findUserById, currentUser, findUserByEmail, inviteFriendsToBubble } =
    useUsers();
  const { getBubbles, getBubbleById } = useBubbles();

  const [invitationStatus, setInvitationStatus] = useState(undefined);
  const [invitationStatusGroup, setInvitationStatusGroup] = useState(undefined);
  const [bubbleId, setBubbleId] = useState();
  const [email, setEmail] = useState(undefined);
  const [friendsList, setFriendsList] = useState([]);

  const params = useParams();
  const location = useLocation();
  const bubbles = getBubbles();
  const navigate = useNavigate();

  const { friends } = currentUser;

  const isFriendInvited = (id) => friendsList.includes(id);

  const toggleFriend = (id) => {
    if (isFriendInvited(id)) {
      setFriendsList(friendsList.filter((friendId) => friendId !== id));
    } else {
      setFriendsList([...friendsList, id]);
    }
  };

  const inviteFriends = () => {
    if (!bubbleId) {
      setInvitationStatusGroup("please select a bubble first");
      return;
    }
    if (!friendsList.length) {
      setInvitationStatusGroup("please select at least one friend");
      return;
    }
    const selectedBubble = getBubbleById(bubbleId);
    const filteredInvitedFriendsList = friendsList.filter((friendId) => {
      const friend = findUserById(friendId);
      const isAlreadyMember = selectedBubble.members.some(
        (member) => member === friendId
      );
      const isAlreadyInvited = friend.notifications.some(
        (notification) => notification.toBubble === bubbleId
      );

      if (isAlreadyInvited || isAlreadyMember) return false;
      return true;
      // return !isAlreadyMember && !isAlreadyInvited;
    });

    inviteFriendsToBubble(bubbleId, filteredInvitedFriendsList);

    if (filteredInvitedFriendsList.length === friendsList.length) {
      setInvitationStatusGroup("all your friends got invited");
    } else {
      setInvitationStatusGroup(
        "the friends who are not yet members got invited"
      );
    }
    setFriendsList([]);
  };

  const inviteFriend = () => {
    if (!bubbleId) {
      setInvitationStatus("please select a bubble");
      return;
    }

    if (!email) {
      setInvitationStatus("Ooops, an email is missing :/ try again!");
      return;
    }

    if (email && !findUserByEmail(email)) {
      setInvitationStatus(
        "Oh, we dont know your friend,yet... please ask your friend to register first"
      );
      return;
    }

    const selectedBubble = getBubbleById(bubbleId);
    const friend = findUserByEmail(email);
    const isAlreadyMember =
      selectedBubble &&
      selectedBubble.members.some((memberId) => memberId === friend.id);

    if (isAlreadyMember) {
      setInvitationStatus("Your friend is already member of this group!");
      return;
    }
    const isAlreadyInvited = friend.notifications.some(
      (notification) => notification.toBubble === bubbleId
    );

    if (isAlreadyInvited) return;

    if (!friend) {
      setInvitationStatus(
        "Oh, we dont know your friend, yet... please ask your friend to register first"
      );
      return;
    }
    inviteFriendsToBubble(bubbleId, [friend.id]);
    setInvitationStatus(" Great, your friend got invited!");
  };

  return (
    <div className="">
      {bubbles ? (
        <div className="w-72 m-auto mt-8">
          <h1 className=" my-10 uppercase">
            YEJ - invite your friends to your bubble
          </h1>
          <p>1. select the bubble you want your friends to join</p>
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
            <option value="">select a bubble</option>
            {bubbles.map((bubble) => {
              return (
                <option key={bubble.id} value={bubble.id}>
                  {bubble.name}
                </option>
              );
            })}
          </select>
          <p>2. add your friends email here :</p>
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
            onClick={inviteFriend}
          >
            Invite Friend to your Bubble
          </button>
          {!!invitationStatus && (
            <p className="text-fuchsia-600 pt-3">{invitationStatus}</p>
          )}
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
                    <li key={uuidv1()}>
                      <div className="">
                        {location.pathname !== "/friends/addFriend" ? (
                          <img
                            onClick={() =>
                              navigate(`/friends/${currFriend.id}`)
                            }
                            className="w-28 h-28 object-cover object-center opacity-50  hover:opacity-100 rounded-full cursor-pointer"
                            src={currFriend.avatarUrl}
                            alt=""
                          />
                        ) : (
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
                        )}
                      </div>
                    </li>
                  );
                } else {
                  return null;
                }
              })}
            </div>
            <div className="mt-8 ">
              <button
                className="inline-block leading-tight uppercase shadow-md hover:bg-gradient-to-r from-cyan-500 to-blue-500 hover:shadow-lg focus:bg-black focus:shadow-lg focus:outline-none focus:ring-0 active:bg-pink-800 active:shadow-lg transition duration-150 ease-in-out bg-black rounded-md  text-white px-2 py-1"
                onClick={inviteFriends}
              >
                invite selected Friends
              </button>
              {!!invitationStatusGroup && (
                <p className="text-fuchsia-600 pt-3">{invitationStatusGroup}</p>
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
