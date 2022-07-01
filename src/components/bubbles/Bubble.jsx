import React from "react";

import { useParams, useNavigate, Link } from "react-router-dom";
import { AddButton } from "../../utilities/Buttons";

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
          <Link to={`/bubbles/${bubbleId}/addFriend`}>
            <AddButton />
          </Link>
        </div>
        <div>
          <h1 className="mb-3 uppercase">Recommendations</h1>
          <ul>
            {bubble.recos ? (
              bubble.recos.map((reco) => <p key={reco.id}>{reco.title}</p>)
            ) : (
              <>
                <p>
                  Oh your bubble doesn't have any public Recommendations ..yet
                </p>
                <p>add some</p>
              </>
            )}
          </ul>
          <Link to={`/bubbles/${bubbleId}/addReco`}>
            <AddButton />
          </Link>
        </div>
        <div>
          <h1 className="mb-3 uppercase">private save</h1>
          <ul>
            {bubble.recos ? (
              bubble.recos.map((reco) => <li key={reco.id}>{reco.title}</li>)
            ) : (
              <>
                <p>Oh you don't have any private Recommendations ..yet</p>
                <p>add some</p>
              </>
            )}
          </ul>
          <AddButton />
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
