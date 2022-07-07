import { useRef, useState } from "react";
import { BsChevronUp, BsChevronDown } from "react-icons/bs";
import { RiDeleteBinLine } from "react-icons/ri";

import { LinkPreview } from "./LinkPreview";

export default function Accordion({
  key,
  title,
  date,
  comment,
  content,
  handleDelete,
}) {
  const [isOpened, setOpened] = useState(false);
  const [height, setHeight] = useState("0px");
  const contentElement = useRef(null);
  console.log(contentElement);
  const handleOpening = () => {
    setOpened(!isOpened);
    setHeight(!isOpened ? `${contentElement.current.scrollHeight}px` : "0px");
  };
  return (
    <div onClick={handleOpening} className="w-full bg-yellow-100">
      <div className="p-4 flex bg-yellow-200  justify-between">
        <h4 className="text-sm mt-auto">{date}</h4>
        <h4>{title}</h4>
        {isOpened ? <BsChevronUp /> : <BsChevronDown />}
      </div>
      <div
        ref={contentElement}
        style={{ height: height }}
        className="overflow-hidden transition-all duration-200"
      >
        <p className="p-4">{comment}</p>
        <LinkPreview url={content} />
      </div>
    </div>
  );
}
