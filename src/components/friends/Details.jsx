import React, { useState, useEffect } from "react";
import { useUserData } from "../../contexts/UserDataContext";
import { useUsers } from "../../contexts/UsersContext";
import { VscChromeClose, VscCheck } from "react-icons/vsc";

export default function Details() {
  const { userData } = useUserData();
  const { users } = useUsers();
  const [invitedByUser, setInvitedByUser] = useState({
    userName: "",
    userId: null,
    notificationId: null,
  });
  const [invitedToBubble, setInvitedToBubble] = useState();

  console.log("hiiiiii");
  useEffect(() => {
    //map users Notifications
    userData.notifications?.map((notification) => {
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
                setInvitedByUser({
                  userName: notification.invitedByUser,
                  userId: notification.invitedBy,
                  notificationId: notification.id,
                });
                setInvitedToBubble({ ...bubble });
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
  }, []);

  const acceptBubbleInvitation = (id) => {
    console.log(invitedByUser);
  };

  const refuseBubbleInvitation = () => {};
  // const userId = userData.notifications.map(() => {});
  //const invitedBy = users.find((user)=>user.id===userData.notifications.)
  console.log(invitedByUser, invitedToBubble);
  return (
    <div className="flex items-center flex-col mt-6">
      <h1>WOW WOW WOW</h1>
      <p>here are your news</p>
      {invitedByUser && (
        <div className="flex mt-8 justify-center">
          <div className="flex flex-col md:flex-row md:max-w-xl rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 shadow-lg">
            <img
              className="h-28 md:h-auto opacity-60 object-cover md:w-48 rounded-t-lg md:rounded-none md:rounded-l-lg"
              src={invitedToBubble.imageUrl}
              alt=""
            />
            <div className="p-6 flex flex-col bg- justify-start">
              <h5 className="text-gray-900 uppercase text-xl font-medium mb-2">
                Invitation to {invitedToBubble.name}
              </h5>
              <p className="text-gray-900 text-base mb-4">
                Congratulations, you are invited by {invitedByUser}!
              </p>
              <div className="text-black flex justify-end gap-3">
                <VscChromeClose
                  onClick={() => refuseBubbleInvitation()}
                  className="cursor-pointer"
                ></VscChromeClose>
                <VscCheck
                  onClick={() => acceptBubbleInvitation(invitedToBubble.id)}
                  className="cursor-pointer"
                ></VscCheck>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
