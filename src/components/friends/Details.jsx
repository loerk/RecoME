import React from "react";
import { useUserData } from "../../contexts/UserDataContext";
import { GiConfirmed } from "react-icons/gi";

export default function Details() {
  const { userData } = useUserData();

  // const userId = userData.notifications.map(() => {});
  //const invitedBy = users.find((user)=>user.id===userData.notifications.)
  return (
    <div className="text-center mt-6">
      <h1>WOW WOW WOW</h1>
      <p>here are your news</p>

      <ul>
        {userData.notifications.map((notification) => {
          return (
            <li className="bg-clip-text pt-6  flex justify-center gap-2 text-transparent bg-gradient-to-r from-pink-500 to-violet-500">
              Congratulations, you are invited to your first bubble!{" "}
              <GiConfirmed className="text-black"></GiConfirmed>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
