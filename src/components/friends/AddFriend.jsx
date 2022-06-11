import React, { useState } from "react";
import { useUsers } from "../../contexts/UsersContext";
import { useBubbles } from "../../contexts/BubbleContext";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { v1 as uuidv1 } from "uuid";
export default function AddFriend() {
  const { findUserById, currentUser, findUserByEmail, inviteFriendToBubble } =
    useUsers();
  const { getBubbles, getBubbleById } = useBubbles();

  const [invitationStatus, setInvitationStatus] = useState(null);
  const [invitationStatusGroup, setInvitationStatusGroup] = useState(null);
  const [bubbleId, setBubbleId] = useState();
  const [email, setEmail] = useState(null);
  const [inviteFromFriendsList, setInviteFromFriendsList] = useState([]);

  const params = useParams();
  const location = useLocation();
  const bubbles = getBubbles();
  const navigate = useNavigate();

  const friends = currentUser.friends;

  const findFriend = (id) => {
    return findUserById(id);
  };
  const isInvitedFriend = (id) => {
    return inviteFromFriendsList.includes(id);
  };

  const toggleFriendToInvitationsList = (id) => {
    if (isInvitedFriend(id)) {
      setInviteFromFriendsList(
        inviteFromFriendsList.filter((friendId) => friendId !== id)
      );
    } else {
      setInviteFromFriendsList([...inviteFromFriendsList, id]);
    }
  };

  const inviteFriends = () => {
    const selectedBubble = getBubbleById(bubbleId);
    inviteFromFriendsList.map((friendId) => {
      let addFriend = findUserById(friendId);
      const alreadyMember = selectedBubble.members.find(
        (member) => member === addFriend.id
      );
      if (alreadyMember) {
        return null;
      } else {
        inviteFriendToBubble(addFriend.email, bubbleId);
        setInvitationStatusGroup(
          "the friends who are not yet members got invited"
        );
      }
      setInvitationStatusGroup("all your friends got invited");
    });

    setInviteFromFriendsList([]);
    setInvitationStatusGroup(
      "all your friends got invited, if they aren't already part of the bubble"
    );
  };

  const inviteFriend = () => {
    const selectedBubble = getBubbleById(bubbleId);
    const addFriend = findUserByEmail(email);
    const alreadyMember = selectedBubble.members.find(
      (member) => member === addFriend.id
    );

    if (!addFriend) {
      setInvitationStatus(
        "Oh, we dont know your friend,yet... please ask your friend to register first"
      );
      return;
    }

    if (alreadyMember) {
      setInvitationStatus("Your friend is already member of this group!");
      return;
    }

    if (email === "") {
      setInvitationStatus("Ooops, an email is missing :/ try again!");
      return;
    }

    inviteFriendToBubble(email, bubbleId);
    setInvitationStatus(" Great, your friend got invited!");
  };

  return (
    <div className="justify-center text-center">
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

      <div>
        {friends.length !== 0 ? (
          <ul className="pt-6 flex flex-wrap gap-4 justify-around">
            {friends.map((friendId) => {
              let currFriend = findFriend(friendId);
              if (params.friendId === undefined) {
                return (
                  <li key={uuidv1()}>
                    <div className="text-center">
                      {location.pathname !== "/friends/addFriend" ? (
                        <img
                          onClick={() => navigate(`/friends/${currFriend.id}`)}
                          className="w-28 h-28 object-cover object-center opacity-50  hover:opacity-100 rounded-full cursor-pointer"
                          src={currFriend.avatarUrl}
                          alt=""
                        />
                      ) : (
                        <img
                          onClick={() =>
                            toggleFriendToInvitationsList(currFriend.id)
                          }
                          className="w-28 h-28 object-cover object-center opacity-50  hover:opacity-100 rounded-full cursor-pointer"
                          src={currFriend.avatarUrl}
                          alt=""
                        />
                      )}
                      {isInvitedFriend(currFriend.id) ? (
                        <p className="relative">{currFriend.username} ✅</p>
                      ) : (
                        <p className="relative">{currFriend.username}</p>
                      )}
                    </div>
                  </li>
                );
              } else {
                return null;
              }
            })}
          </ul>
        ) : (
          <p className="text-center pt-5">:/ you dont have any friends...yet</p>
        )}
        {location.pathname === "/friends/addFriend" ? (
          <div className="bg-fuchsia-200 mt-8 p-3 flex justify-center">
            <button
              className="inline-block leading-tight uppercase  shadow-md hover:bg-gradient-to-r from-cyan-500 to-blue-500 hover:shadow-lg focus:bg-black focus:shadow-lg focus:outline-none focus:ring-0 active:bg-pink-800 active:shadow-lg transition duration-150 ease-in-out bg-black rounded-md  text-white px-2 py-1"
              onClick={inviteFriends}
            >
              invite selected Friends
            </button>
            {!!invitationStatusGroup && (
              <p className="text-fuchsia-600 pt-3">{invitationStatusGroup}</p>
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
}
