import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUsers } from "../../contexts/UsersContext";

export default function Landing({ currUser }) {
  const navigate = useNavigate();
  const { users } = useUsers();
  useEffect(() => {
    if (currUser === undefined) {
      navigate("/login");
    }
  }, []);

  console.log("LandingCurrUser", currUser);

  console.log("landing", users);
  return <div>Landing </div>;
}
