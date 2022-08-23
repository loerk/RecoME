import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import moment from "moment";

import { AddButton } from "../../utilities/Buttons";
import { useTheme } from "../../contexts/ThemeContext";
import { useBubbles } from "../../contexts/BubbleContext";
import { useRecos } from "../../contexts/RecoContext";
import bubbleImg from "../../assets/images/bubble.jpg";
import Accordion from "../../utilities/Accordion";
import DeleteBubbleModal from "../../utilities/DeleteBubbleModal";

export default function Bubble() {
  const [showModal, setShowModal] = useState(false);
  const [fetchBubbleInfo, setFetchBubbleInfo] = useState(true);

  const [bubbleRecos, setBubbleRecos] = useState([]);

  let { bubbleId } = useParams();

  const theme = useTheme();
  const { getBubbleById, bubble } = useBubbles();
  const { getRecosFromBubble } = useRecos();

  useEffect(() => {
    const getCurrentBubbleInfo = async () => {
      try {
        const recoResult = await getRecosFromBubble(bubbleId);
        await getBubbleById(bubbleId);
        setBubbleRecos(recoResult);
        setFetchBubbleInfo(false);
      } catch (error) {
        console.log(error);
      }
    };
    if (fetchBubbleInfo) {
      getCurrentBubbleInfo();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchBubbleInfo]);

  const handleModal = () => {
    setShowModal(true);
  };
  if (!Object.keys(bubble).length) return;

  return (
    <div>
      <div className="pt-20">
        <div className="relative w-full">
          <div className="relative overflow-hidden bg-contain">
            {bubble.defaultImg ? (
              <img src={bubbleImg} className="block  w-96 m-auto" alt="" />
            ) : (
              <img
                src={bubble.imageUrl}
                className="block  w-96 m-auto"
                alt=""
              />
            )}
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
              <div className="flex gap-2 flex-wrap">
                {bubble.members.map((member) => {
                  return (
                    <div className="m-auto" key={member._id}>
                      <img
                        src={member.avatarUrl}
                        alt=""
                        className="w-16 shadow-lg rounded-full"
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
              bubbleRecos.map((reco) => {
                //const date = new Date(reco.createdAt);
                return (
                  <div key={reco._id}>
                    <Accordion
                      avatar={reco.createdBy.avatarUrl}
                      title={reco.title}
                      date={moment(reco.createdAt).fromNow()}
                      description={reco.description}
                      content={reco.recoUrl}
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
          onClick={handleModal}
        >
          DELETE BUBBLE
        </button>
      </div>
      {showModal && (
        <DeleteBubbleModal
          showModal={showModal}
          setShowModal={setShowModal}
          bubbleId={bubbleId}
        />
      )}
    </div>
  );
}
