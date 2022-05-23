import React from "react";
import { useUserData } from "../../contexts/UserDataContext";
import { useParams, useNavigate } from "react-router-dom";
import { AddButton } from "../../utilities/Buttons";
import { nanoid } from "nanoid";

export default function Bubble() {
  const navigate = useNavigate();
  let params = useParams();

  const { userData, setUserData } = useUserData();

  let currBubble = userData.bubbles.find(
    (bubble) => bubble.id === params.bubbleId
  );

  const deleteBubble = () => {
    const deletedItemsArr = userData.bubbles.filter(
      (bubble) => bubble.id !== currBubble.id
    );
    navigate("/bubbles");
    setUserData({ ...userData, bubbles: [...deletedItemsArr] });
  };
  const addFriends = () => {
    navigate("/friends/addFriend");
  };
  const addPrivateRecos = () => {};
  const addPublicRecos = () => {};

  return (
    <div>
      <div className="mt-6">
        <div className=" relative w-full">
          <div className="relative overflow-hidden bg-contain">
            <img src={currBubble.imageUrl} className="block  w-96 m-auto" />
            <div className="absolute top-0 right-0 bottom-0 left-0 w-full h-full overflow-hidden bg-fixed bg-black opacity-50"></div>
          </div>
          <div className="md:block absolute top-6 left-1/3 text-white  uppercase">
            <h5 className="text-4xl">{currBubble.name}</h5>
            <p>{currBubble.description}</p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 my-4 gap-4 text-center">
        <div>
          <h1 className="mb-3 uppercase">Your friends</h1>
          <ul>
            {currBubble.members ? (
              currBubble.members.map((member) => (
                <li key={nanoid()}>{member.username}</li>
              ))
            ) : (
              <>
                <p>Oh your bubble doesn't have any members ..yet</p>
                <p>add some</p>
              </>
            )}
          </ul>
          <AddButton action={addFriends} />
        </div>
        <div>
          <h1 className="mb-3 uppercase">
            All your public bubble Recommendations
          </h1>
          <ul>
            {currBubble.publicRecos ? (
              currBubble.publicRecos.map((publicReco) => (
                <li key={nanoid()}>{publicReco.username}</li>
              ))
            ) : (
              <>
                <p>
                  Oh your bubble doesn't have any public Recommendations ..yet
                </p>
                <p>add some</p>
              </>
            )}
          </ul>
          <AddButton action={addPublicRecos} />
        </div>
        <div>
          <h1 className="mb-3 uppercase">
            All your private Recommendation from your friends
          </h1>
          <ul>
            {currBubble.privateRecos ? (
              currBubble.privateRecos.recoFrom.map((privateRecos) => (
                <li key={nanoid()}>{privateRecos.username}</li>
              ))
            ) : (
              <>
                <p>Oh you don't have any Recommendations ..yet</p>
                <p>add some</p>
              </>
            )}
          </ul>
          <AddButton action={addPrivateRecos} />
        </div>
      </div>
      <div className="text-center mt-40 p-4">
        <p>
          It's always hard to say goodbye, but sometimes there is no other
          option
        </p>
        <button onClick={deleteBubble}>DELETE BUBBLE</button>
      </div>
    </div>
  );
}
