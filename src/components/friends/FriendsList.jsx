import { v1 as uuidv1 } from "uuid";
import React from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { useUsers } from "../../contexts/UsersContext";

export default function FriendsList() {
  const { currentUser } = useUsers();
  const friends = currentUser.friends;
  const params = useParams();

  return (
    <div className=" m-auto p-10 mt-5">
      {friends.length !== 0 ? (
        <ul>
          {friends
            .filter((friend) => {
              let filter = useSearchParams.get("filter");
              if (!filter) return true;
              let name = friend.name.toLowerCase();
              return name.includes(filter.toLowerCase());
            })
            .map((friend) => {
              if (params.friendId === undefined) {
                return (
                  <div
                    key={uuidv1()}
                    //onClick={() => navigate(`/friends/${friend.id}`)}
                    //className="grid grid-cols-3 gap-4 flex items-center"
                  >
                    <div className="mb-4">
                      <img
                        src={friend.avatarUrl}
                        className="max-w-full h-auto rounded-full"
                        alt=""
                      />
                      <h5 className="text-gray-900 text-xl font-medium mb-2">
                        {friend.name}
                      </h5>
                    </div>
                  </div>
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
