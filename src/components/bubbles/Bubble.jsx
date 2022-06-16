import React from "react";

import { useParams, useNavigate } from "react-router-dom";
import { AddButton } from "../../utilities/Buttons";
import { v1 as uuidv1 } from "uuid";
import { useTheme } from "../../contexts/ThemeContext";
import { useBubbles } from "../../contexts/BubbleContext";

export default function Bubble() {
  const navigate = useNavigate();
  let { bubbleId } = useParams();
  const theme = useTheme();
  const { getBubbleById, deleteBubble } = useBubbles();

  let bubble = getBubbleById(bubbleId);

  const handleDelete = () => {
    deleteBubble(bubbleId);
    navigate("/bubbles");
  };

  const addFriends = () => {
    navigate("/friends/addFriend");
  };
  const addReco = () => {
    navigate("/recos/addReco");
  };

  return (
    <div>
      <div className="mt-20">
        <div className=" relative w-full">
          <div className="relative overflow-hidden bg-contain">
            <img src={bubble.imageUrl} className="block  w-96 m-auto" alt="" />
            <div className="absolute top-0 right-0 bottom-0 left-0 w-full h-full overflow-hidden bg-fixed bg-black opacity-50"></div>
          </div>
          <div className="md:block absolute top-6 left-1/3 text-white  uppercase">
            <h5 className="text-4xl">{bubble.name}</h5>
            <p>{bubble.description}</p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 my-4 gap-4 text-center">
        <div>
          <h1 className="mb-3 uppercase">Members</h1>
          <div>
            {!!bubble.members.length ? (
              <p>{bubble.members.length}</p>
            ) : (
              <>
                <p>Oh your bubble doesn't have any members ..yet</p>
                <p>add some</p>
              </>
            )}
          </div>
          <AddButton action={addFriends} />
        </div>
        <div>
          <h1 className="mb-3 uppercase">Recommendations</h1>
          <ul>
            {bubble.publicRecos ? (
              bubble.publicRecos.map((publicReco) => (
                <li key={publicReco.id}>{publicReco.username}</li>
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
          <AddButton action={addReco} />
        </div>
        <div>
          <h1 className="mb-3 uppercase">private save</h1>
          <ul>
            {bubble.privateRecos ? (
              bubble.privateRecos.recoFrom.map((privateRecos) => (
                <li key={uuidv1()}>{privateRecos.username}</li>
              ))
            ) : (
              <>
                <p>Oh you don't have any private Recommendations ..yet</p>
                <p>add some</p>
              </>
            )}
          </ul>
          <AddButton action={addReco} />
        </div>
      </div>
      <div className="text-center mt-40 p-4">
        <p>
          It's always hard to say goodbye, but sometimes there is no other
          option
        </p>
        {/* TODO:theme doesnt work */}
        <button
          className={
            theme
              ? "w-40 hover:translate-y-1  text-3xl p-3 bg-white  text-black  font-face-tm my-4"
              : "w-40 hover:translate-y-1  text-3xl p-3 bg-black  text-white  font-face-tm my-4"
          }
          onClick={handleDelete}
        >
          DELETE BUBBLE
        </button>
      </div>
    </div>
  );
}
