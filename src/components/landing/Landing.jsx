import {
  MdOutlineArrowBackIos,
  MdOutlineArrowForwardIos,
} from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';
import { useUsers } from '../../contexts/UsersContext';
import { useBubbles } from '../../contexts/BubbleContext';
import { useRecos } from '../../contexts/RecoContext';
import { useEffect } from 'react';
import { useNotifications } from '../../contexts/NotificationsContext';
import bubbleImg from '../../assets/images/bubble.jpg';

export default function Landing() {
  const navigate = useNavigate();

  const { bubbles, setShouldFetchBubbles } = useBubbles();
  const { recos, setShouldFetchRecos } = useRecos();
  const { friends, setShouldUpdateFriends } = useUsers();
  const { setShouldFetchNotifications } = useNotifications();

  const onImageError = (e) => {
    e.target.src = bubbleImg;
  };
  const slideBubblesLeft = () => {
    const bubbleSlider = document.getElementById('bubbleSlider');
    bubbleSlider.scrollLeft = bubbleSlider.scrollLeft - 500;
  };
  const slideBubblesRight = () => {
    const bubbleSlider = document.getElementById('bubbleSlider');
    bubbleSlider.scrollLeft = bubbleSlider.scrollLeft + 500;
  };
  const slideFriendsLeft = () => {
    const friendSlider = document.getElementById('friendsSlider');
    friendSlider.scrollLeft = friendSlider.scrollLeft - 500;
  };
  const slideFriendsRight = () => {
    const friendSlider = document.getElementById('friendsSlider');
    friendSlider.scrollLeft = friendSlider.scrollLeft + 500;
  };
  const slideRecosLeft = () => {
    const recoSlider = document.getElementById('recoSlider');
    recoSlider.scrollLeft = recoSlider.scrollLeft - 500;
  };
  const slideRecosRight = () => {
    const recoSlider = document.getElementById('recoSlider');
    recoSlider.scrollLeft = recoSlider.scrollLeft + 500;
  };
  useEffect(() => {
    setShouldFetchBubbles(true);
    setShouldFetchRecos(true);
    setShouldFetchNotifications(true);
    setShouldUpdateFriends(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className='pb-12 pt-32'>
      <div className='flex items-center m-auto gap-7 mt-16 py-5 flex-col h-76 rounded shadow-2xl '>
        <div className='flex flex-col justify-around items-center w-full content-center'>
          <Link to={'/bubbles'}>
            <h4 className='my-3 text-md md:text-2xl'>Your bubbles</h4>
          </Link>
          <div className='flex items-center w-full'>
            <MdOutlineArrowBackIos
              onClick={slideBubblesLeft}
              className='opacity-50 cursor-pointer hover:opacity-100 mx-6 text-2xl md:text-3xl'
            ></MdOutlineArrowBackIos>
            <ul
              id='bubbleSlider'
              className='flex overflow-x-scroll justify-center scroll-smooth w-full scrollbar-hide'
            >
              {bubbles?.map((bubble) => (
                <li key={bubble._id}>
                  <div className='text-center m-2'>
                    <div className='w-28 h-28 object-cover object-center opacity-50  duration-300  hover:opacity-100 rounded-full cursor-pointer'>
                      <img
                        onClick={() => navigate(`/bubbles/${bubble._id}`)}
                        className='rounded-full object-cover h-28 w-28 hover:scale-105 duration-300  '
                        src={bubble.defaultImg ? bubbleImg : bubble.imageUrl}
                        onError={(e) => onImageError(e)}
                        alt='costum background'
                      />
                    </div>
                    <button className=' w-28 truncate px-3'>
                      {bubble.name}
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            <MdOutlineArrowForwardIos
              onClick={slideBubblesRight}
              className='opacity-50 cursor-pointer hover:opacity-100 mx-6 text-2xl md:text-3xl'
            ></MdOutlineArrowForwardIos>
          </div>
        </div>
      </div>
      <div className='flex items-center m-auto gap-7 mt-16 py-5 flex-col h-76 rounded shadow-2xl '>
        <div className='flex flex-col justify-around items-center w-full content-center'>
          <Link to={'/friends'}>
            <h4 className='my-3 text-md md:text-2xl'>Your friends</h4>
          </Link>
          <div className='flex items-center w-full'>
            <MdOutlineArrowBackIos
              onClick={slideFriendsLeft}
              className='opacity-50 cursor-pointer hover:opacity-100 mx-6 text-2xl md:text-3xl'
            ></MdOutlineArrowBackIos>
            <ul
              id='friendSlider'
              className='flex overflow-x-scroll justify-center scroll-smooth w-full scrollbar-hide'
            >
              {friends?.map((friend) => {
                return (
                  <li key={friend._id}>
                    <div className='text-center m-2'>
                      <div className='w-28 h-28 object-cover object-center opacity-50  duration-300 hover:opacity-100 rounded-full cursor-pointer'>
                        <img
                          className='hover:scale-105 ease-in-out duration-300'
                          onClick={() => navigate(`/friends/${friend._id}`)}
                          src={friend.avatarUrl}
                          alt=''
                        />
                      </div>
                      <button className='relative truncate px-3'>
                        {friend.username}
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>
            <MdOutlineArrowForwardIos
              onClick={slideFriendsRight}
              className='opacity-50 cursor-pointer hover:opacity-100 mx-6 text-2xl md:text-3xl'
            ></MdOutlineArrowForwardIos>
          </div>
        </div>
      </div>
      <div className='flex items-center m-auto gap-7 mt-16 py-5 flex-col h-76 rounded shadow-2xl '>
        <div className='flex flex-col justify-around items-center w-full content-center'>
          <Link to={'/friends'}>
            <h4 className='my-3 text-md md:text-2xl'>Latest Recos</h4>
          </Link>
          <div className='flex items-center w-full'>
            <MdOutlineArrowBackIos
              onClick={slideRecosLeft}
              className='opacity-50 cursor-pointer hover:opacity-100 mx-6 text-2xl md:text-3xl'
            ></MdOutlineArrowBackIos>
            <ul
              id='recoSlider'
              className='flex overflow-x-scroll justify-center scroll-smooth w-full scrollbar-hide'
            >
              {recos?.map((reco) => (
                <button key={reco._id} onClick={() => navigate('/recos')}>
                  <div className='flex m-2 items-center w-28 h-28 opacity-60 bg-yellow-200  hover:opacity-100 hover:scale-105 duration-300  rounded-full cursor-pointer'>
                    <div className='truncate px-3 '>{reco.title}</div>
                  </div>
                </button>
              ))}
            </ul>
            <MdOutlineArrowForwardIos
              onClick={slideRecosRight}
              className='opacity-50 cursor-pointer hover:opacity-100 mx-6 text-2xl md:text-3xl'
            ></MdOutlineArrowForwardIos>
          </div>
        </div>
      </div>
    </div>
  );
}
