import { useRef, useState } from "react";
import { BsChevronUp, BsChevronDown } from "react-icons/bs";

import { LinkPreview } from "./LinkPreview";

export default function Accordion({ title, date, comment, content }) {
  const [isOpened, setOpened] = useState(false);
  const [height, setHeight] = useState("0px");
  const contentElement = useRef(null);

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
