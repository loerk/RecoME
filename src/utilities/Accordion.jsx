import { useRef, useState } from 'react';
import { BsChevronUp, BsChevronDown } from 'react-icons/bs';

import { LinkPreview } from './LinkPreview';

export default function Accordion({
  avatar,
  title,
  date,
  description,
  content,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const contentElement = useRef(null);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div onClick={handleClick} className='w-full bg-yellow-100'>
      <div className='p-4 flex bg-yellow-200  justify-between mb-4'>
        <div>
          <img
            src={avatar}
            alt=''
            className='w-9 h-9 object-cover shadow-lg rounded-full'
          />
          <h4 className='text-sm'>{date}</h4>
        </div>

        <h4>{title}</h4>

        {isOpen ? <BsChevronUp /> : <BsChevronDown />}
      </div>
      <div
        ref={contentElement}
        style={
          isOpen
            ? { height: contentElement.current.scrollHeight }
            : { height: '0px' }
        }
        className='overflow-hidden transition-all duration-200'
      >
        <div className='w-full mb-6 md:flex flex-col md:justify-around'>
          <p className='p-4'>{description}</p>
          <LinkPreview url={content} />
        </div>
      </div>
    </div>
  );
}
