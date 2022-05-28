import React, { useState, useEffect } from "react";
import { useUserData } from "../../contexts/UserDataContext";
import { useUsers } from "../../contexts/UsersContext";
import { GiConfirmed } from "react-icons/gi";

export default function Details() {
  const { userData } = useUserData();
  const { users } = useUsers();
  const [bubbleInvitations, setBubbleInvitations] = useState();

  console.log("hiiiiii");

  //map users Notifications
  userData.notifications.map((notification) => {
    console.log("111111", notification);
    //if Notification hasProperty of toBubble it has a bubble
    if (notification.toBubble) {
      //find bubble in UsersArray
      return users.map((user) => {
        if (user.bubbles) {
          console.log("22222", user);
          //find specific Bubble
          user.bubbles.map((bubble) => {
            console.log("bubble", bubble);
            //if you found the specific Bubble setState
            console.log("bubbleId", bubble.id);
            console.log("notifi.toBubble", notification.toBubble);
            if (bubble.id === notification.toBubble) {
              console.log("YWEEESSSSAAA");
              setBubbleInvitations({
                ...bubble,
                invitedBy: notification.invitedByUser,
              });
            } else {
              return null;
            }
          });
        } else {
          return null;
        }
      });
    } else {
      return null;
    }
  });

  // const userId = userData.notifications.map(() => {});
  //const invitedBy = users.find((user)=>user.id===userData.notifications.)
  console.log(bubbleInvitations);
  return (
    <div className="text-center mt-6">
      <h1>WOW WOW WOW</h1>
      <p>here are your news</p>

      <p className="bg-clip-text pt-6  flex justify-center gap-2 text-transparent bg-gradient-to-r from-pink-500 to-violet-500">
        Congratulations, you are invited by {bubbleInvitations.invitedBy} to{" "}
        {bubbleInvitations.name}!{" "}
        <GiConfirmed className="text-black"></GiConfirmed>
      </p>
    </div>
  );
}
