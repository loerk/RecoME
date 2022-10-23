import { MdArrowForwardIos } from 'react-icons/md';
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
    console.log('e', e);
    e.target.src = bubbleImg;
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
        <div className='flex justify-around items-center w-full content-center'>
          <h1 className='px-10'>Your bubbles</h1>
          <ul className='flex overflow-x-scroll w-2/3'>
            {bubbles?.map((bubble) => (
              <li key={bubble._id}>
                <div className='text-center m-2'>
                  <div className='w-28 h-28 object-cover object-center opacity-50  hover:opacity-100 rounded-full cursor-pointer'>
                    <img
                      onClick={() => navigate(`/bubbles/${bubble._id}`)}
                      className='rounded-full object-cover h-28 w-28'
                      src={bubble.defaultImg ? bubbleImg : bubble.imageUrl}
                      onError={(e) => onImageError(e)}
                      alt='costum background'
                    />
                  </div>
                  <button className=' w-28 truncate px-3'>{bubble.name}</button>
                </div>
              </li>
            ))}
          </ul>
          <Link to={'/bubbles'}>
            <MdArrowForwardIos className='mx-6 text-2xl md:text-3xl'></MdArrowForwardIos>
          </Link>
        </div>
      </div>
      <div className='flex items-center m-auto gap-7 my-7 py-5 flex-col h-76  rounded shadow-2xl '>
        <div className='flex justify-around items-center w-full content-center'>
          <h1 className='px-10'>Your friends</h1>
          <ul className='flex overflow-x-scroll w-2/3'>
            {friends?.map((friend) => {
              return (
                <li key={friend._id}>
                  <div className='text-center m-2'>
                    <div className='w-28 h-28 object-cover object-center opacity-50  hover:opacity-100 rounded-full cursor-pointer'>
                      <img
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
          <Link to={'/friends'}>
            <MdArrowForwardIos className='mx-6 text-2xl md:text-3xl'></MdArrowForwardIos>
          </Link>
        </div>
      </div>{' '}
      <div className='flex items-center m-auto gap-7 my-7 py-5 flex-col h-76 rounded shadow-2xl '>
        <div className='flex justify-around items-center w-full content-center'>
          <h1 className='px-10'>Latest Recos</h1>
          <ul className='flex overflow-x-scroll w-2/3'>
            {recos?.map((reco) => (
              <button key={reco._id} onClick={() => navigate('/recos')}>
                <div className='flex m-2 items-center w-28 h-28 opacity-60 bg-yellow-200  hover:opacity-100 rounded-full cursor-pointer'>
                  <div className='truncate px-3 '>{reco.title}</div>
                </div>
              </button>
            ))}
          </ul>
          <Link to={'/recos'}>
            <MdArrowForwardIos className='mx-6 text-2xl md:text-3xl'></MdArrowForwardIos>
          </Link>
        </div>
      </div>
    </div>
  );
}
