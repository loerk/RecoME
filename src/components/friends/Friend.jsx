import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useUsers } from "../../contexts/UsersContext";

export default function Friend() {
  const params = useParams();
  const navigate = useNavigate();

  const { findUserById } = useUsers();

  const currentFriend = findUserById(params.friendId);

  return (
    <div className="flex m-10">
      <img src={currentFriend.avatarUrl} alt="friendAvatar" />
      <div>
        <div>
          <h2>shared Bubbles</h2>
          <h2>shared Recommendations </h2>
          <h2>private Recommendations </h2>
        </div>
      </div>
    </div>
  );
}
