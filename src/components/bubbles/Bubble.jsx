import React from "react";
import { useUserData } from "../../contexts/UserDataContext";
import { useParams, useNavigate } from "react-router-dom";
export default function Bubble() {
  const navigate = useNavigate();
  let params = useParams();

  const { userData, setUserData } = useUserData();

  const deleteBubble = (itemId) => {
    const deletedItemsArr = userData.bubbles.filter(
      (bubble) => bubble.id !== itemId
    );
    navigate("/bubbles");
    setUserData({ ...userData, bubbles: [...deletedItemsArr] });
  };

  return <div>Bubble</div>;
}
