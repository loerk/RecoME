import { useRef, useState } from "react";
import { BsChevronUp, BsChevronDown } from "react-icons/bs";

import { LinkPreview } from "./LinkPreview";

export default function Accordion({ title, date, description, content }) {
  const [isOpen, setIsOpen] = useState(false);
  const contentElement = useRef(null);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div onClick={handleClick} className="w-full bg-yellow-100">
      <div className="p-4 flex bg-yellow-200  justify-between">
        <h4 className="text-sm mt-auto">{date}</h4>
        <h4>{title}</h4>
        {isOpen ? <BsChevronUp /> : <BsChevronDown />}
      </div>
      <div
        ref={contentElement}
        style={
          isOpen
            ? { height: contentElement.current.scrollHeight }
            : { height: "0px" }
        }
        className="overflow-hidden transition-all duration-200"
      >
        <p className="p-4">{description}</p>
        <LinkPreview url={content} />
      </div>
    </div>
  );
}
