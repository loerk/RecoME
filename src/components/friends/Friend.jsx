import React from "react";
import { useParams } from "react-router-dom";
import { useUsers } from "../../contexts/UsersContext";

export default function Friend() {
  const { friendId } = useParams();

  const { currentUser } = useUsers();
  const currentFriend = currentUser.friends.find(
    (friend) => friend._id === friendId
  );

  return (
    <div className="flex m-10">
      <img src={currentFriend.avatarUrl} alt="friendAvatar" />
      <div>
        <div>
          <h2>shared Bubbles</h2>
          <h2>shared Recommendations </h2>
        </div>
      </div>
    </div>
  );
}
