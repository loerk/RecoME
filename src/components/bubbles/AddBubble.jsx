import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useBubbles } from "../../contexts/BubbleContext";

export default function AddBubble() {
  const [bubbleData, setBubbleData] = useState({
    name: "",
    description: "",
    categories: "",
    imageUrl: "",
    defaultImg: false,
  });

  const { addBubble, setShouldFetchBubbles } = useBubbles();

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setBubbleData((prevBubbleData) => ({
      ...prevBubbleData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (event) => {
    if (!bubbleData.imageUrl)
      setBubbleData((prevBubbleData) => ({
        ...prevBubbleData,
        defaultImg: true,
      }));

    event.preventDefault();
    await addBubble(bubbleData);
    navigate("/bubbles");
    setShouldFetchBubbles(true);
  };

  return (
    <div className="w-72 m-auto mt-8">
      <form className="flex flex-wrap gap-2" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="name"
          className="w-full font-face-tm text-2xl p-2 border-2"
          name="name"
          onChange={handleChange}
          value={bubbleData.name}
          required
        />
        <input
          type="text"
          placeholder="descriptions"
          className=" w-full font-face-tm text-2xl p-2 border-2"
          name="description"
          onChange={handleChange}
          value={bubbleData.description}
          required
        />
        <input
          type="text"
          placeholder="add categories (with comma)"
          className=" w-full font-face-tm text-2xl p-2 border-2"
          name="categories"
          onChange={handleChange}
          value={bubbleData.categories}
          required
        />
        <input
          id="url"
          placeholder="image url"
          type="url"
          className="w-full font-face-tm text-2xl p-2 border-2"
          name="imageUrl"
          onChange={handleChange}
          value={bubbleData.imageUrl}
        />
        <label className="pl-3 font-face-tm text-2xl">
          <input
            className="mr-3 scale-150"
            id="defaultImg"
            type="checkbox"
            name="defaultImg"
            onChange={handleChange}
            checked={bubbleData.defaultImg}
          />
          or let us choose the Image
        </label>
        <button className="w-full hover:translate-y-1  text-3xl p-3 bg-white  text-black  font-face-tm my-4">
          create
        </button>
      </form>
    </div>
  );
}
