import React from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

import { AddButton } from "../../utilities/Buttons";
import { useTheme } from "../../contexts/ThemeContext";
import { useBubbles } from "../../contexts/BubbleContext";
import { useRecos } from "../../contexts/RecoContext";
import { useUsers } from "../../contexts/UsersContext";

import Accordion from "../../utilities/Accordion";

export default function Bubble() {
  const navigate = useNavigate();
  let { bubbleId } = useParams();

  const theme = useTheme();
  const { getBubbleById, deleteBubble } = useBubbles();
  const { getRecosFromBubble } = useRecos();
  const { findUserById, currentUser } = useUsers();

  const bubble = getBubbleById(bubbleId);
  const bubbleRecos = getRecosFromBubble(bubbleId);

  const handleDeleteBubble = () => {
    deleteBubble(bubbleId);
    navigate("/bubbles");
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
      <div className="w-2/3  m-auto text-center">
        <div>
          <h1 className="py-10 uppercase">Members</h1>
          <div>
            {!!bubble.members.length ? (
              <div className="flex gap-2">
                {bubble.members.map((memberId) => {
                  const member = findUserById(memberId);
                  return (
                    <div className="m-auto" key={memberId}>
                      <img
                        src={member.avatarUrl}
                        alt=""
                        className="w-16 aspect-square shadow-lg rounded-full"
                      />
                      <p>{member.username}</p>
                    </div>
                  );
                })}
              </div>
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
          <h1 className="mt-20 mb-5 uppercase">Recommendations</h1>
          <ul>
            {bubbleRecos ? (
              bubbleRecos
                .filter((reco) => !reco.ignoredBy?.includes(currentUser.id))
                .map((reco) => {
                  const date = new Date(reco.createdAt);
                  return (
                    <div key={reco.id}>
                      <Accordion
                        title={reco.title}
                        date={date.toLocaleDateString("en-GB")}
                        comment={reco.comment}
                        content={reco.url}
                      />
                    </div>
                  );
                })
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
      </div>
      <div className="text-center mt-40 p-4">
        <p>
          It's always hard to say goodbye, but sometimes there is no other
          option
        </p>
        <button
          className={
            theme
              ? "w-40 hover:translate-y-1  text-3xl p-3 bg-white  text-black  font-face-tm my-4"
              : "w-40 hover:translate-y-1  text-3xl p-3 bg-black  text-white  font-face-tm my-4"
          }
          onClick={handleDeleteBubble}
        >
          DELETE BUBBLE
        </button>
      </div>
    </div>
  );
}
