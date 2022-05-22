import { nanoid } from "nanoid";

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserData } from "../../contexts/UserDataContext";
import { useUsers } from "../../contexts/UsersContext";
import LandingCard from "./LandingCard";

export default function Landing() {
  const [currUser, setCurrUser] = useState(false);
  const { users } = useUsers();
  const { userData } = useUserData();

  useEffect(() => {
    if (userData && userData[0].isLoggedIn) {
      setCurrUser(userData[0]);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    if (userData) {
      localStorage.setItem("currUser", JSON.stringify(userData));
    }
  }, [userData]);
  return (
    <>
      {currUser ? (
        <div>
          <LandingCard currUser={currUser} />
        </div>
      ) : null}
    </>
  );
}

// <div className="flex items-center m-auto gap-7 my-7 p-10 flex-col bg-red-300 w-96 rounded shadow-2xl ">
// <div>
//   <h1>Your friends</h1>
//   <ul>
//     {currUser.friends ? (
//       currUser.friends.map((friend) => (
//         <li key={nanoid()}>
//           <button onClick={() => navigate("/friends")}>
//             {friend.name}
//           </button>
//         </li>
//       ))
//     ) : (
//       <AddButton />
//     )}
//   </ul>
// </div>
// </div>{" "}
// <div className="flex items-center m-auto gap-7 my-7 p-10 flex-col bg-red-300 w-96 rounded shadow-2xl ">
// <div>
//   <h1>Latest Recos</h1>
//   <ul>
//     {currUser.recos ? (
//       currUser.recos.map((type) =>
//         type.map((reco) => (
//           <li key={nanoid()}>
//             <button onClick={() => navigate("/bubbles")}>
//               {reco.title}
//             </button>
//           </li>
//         ))
//       )
//     ) : (
//       <AddButton />
//     )}
//   </ul>
// </div>
// </div>
