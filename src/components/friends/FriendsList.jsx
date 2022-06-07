import { v1 as uuidv1 } from "uuid";
import React from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useUsers } from "../../contexts/UsersContext";

export default function FriendsList() {
  const { currentUser, findUserById } = useUsers();
  const friends = currentUser.friends;
  const params = useParams();
  const navigate = useNavigate();

  const findFriend = (id) => {
    return findUserById(id);
  };

  return (
    <div>
      {friends.length !== 0 ? (
        <ul className="pt-6 flex flex-wrap gap-4 justify-around">
          {friends
            // .filter((friendId) => {
            //   let friend = findUserById(friendId);
            //   let filter = useSearchParams.get("filter");
            //   if (!filter) return true;
            //   let name = friend.username.toLowerCase();
            //   return name.includes(filter.toLowerCase());
            // })
            .map((friendId) => {
              let currFriend = findFriend(friendId);
              if (params.friendId === undefined) {
                return (
                  <li key={uuidv1()}>
                    <div className="text-center">
                      <img
                        onClick={() => navigate(`/friends/${currFriend.id}`)}
                        className="w-28 h-28 object-cover object-center opacity-50  hover:opacity-100 rounded-full cursor-pointer"
                        src={currFriend.avatarUrl}
                        alt=""
                      />
                      <button className="relative">
                        {currFriend.username}
                      </button>
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
    </div>
  );
}
