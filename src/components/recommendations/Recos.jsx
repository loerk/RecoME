import React, { useState } from 'react';
import { Outlet, useLocation, Link, useNavigate } from 'react-router-dom';
import { RiDeleteBinLine } from 'react-icons/ri';
import { v1 as uuidv1 } from 'uuid';
import { AiOutlineHeart } from 'react-icons/ai';
import moment from 'moment';

import { AddButton } from '../../utilities/Buttons';
import { LinkPreview } from '../../utilities/LinkPreview';
import { useRecos } from '../../contexts/RecoContext';
import { useUsers } from '../../contexts/UsersContext';
import bubbleImg from '../../assets/images/bubble.jpg';
import DeleteRecoModal from '../../utilities/DeleteRecoModal';

export default function Recos() {
  const [showModal, setShowModal] = useState(false);
  const [searchFor, setSearchFor] = useState('');
  const [recoIdToDelete, setRecoIdToDelete] = useState(null);
  const navigate = useNavigate();
  const { currentUser } = useUsers();
  const location = useLocation();
  const { recos, isLoadingRecos } = useRecos();
  const onImageError = (e) => {
    e.target.src = bubbleImg;
  };
  const handleModal = (id) => {
    setShowModal(true);
    setRecoIdToDelete(id);
  };
  if (isLoadingRecos) return <div>Loading</div>;
  if (!recos) return;
  return (
    <div className='pt-32 pb-12'>
      {location.pathname === '/recos' ? (
        <div>
          <div className='flex justify-center'>
            <div className='mb-3 xl:w-96'>
              <input
                onChange={(e) => setSearchFor(e.target.value)}
                type='search'
                className='
                  text-center
                  form-control
                  block
                  w-full
                  px-3
                  py-1.5
                  text-base
                  font-normal
                  text-gray-700
                  bg-white bg-clip-padding
                  border border-solid border-gray-300
                  rounded
                  transition
                  ease-in-out
                  m-0
                  focus:text-gray-700 focus:bg-white focus:outline-none
                '
                id='exampleSearch'
                placeholder='Search Recs'
              />
            </div>
          </div>

          <Link to='/recos/addReco'>
            <AddButton />
          </Link>

          {recos.length ? (
            <ul className='pt-6 p-10 flex flex-wrap gap-4 justify-around'>
              {recos
                ?.filter((reco) => {
                  return reco.title
                    .toLowerCase()
                    .includes(searchFor.toLowerCase());
                })
                .map((reco) => {
                  const date = moment(reco.createdAt).fromNow();

                  return (
                    <div key={uuidv1()}>
                      <div className='flex w-64 flex-col hover:shadow-inner md:flex-row  rounded-lg shadow-lg  '>
                        <div className='relative w-full rounded flex flex-col justify-start'>
                          <div className='z-2 flex justify-between'>
                            <div className='p-4'>
                              <p className='tracking-widest text-xs'>{date}</p>
                              <h5 className='text-xl w-24 break-words font-medium mb-2'>
                                {reco.title}
                              </h5>
                            </div>
                            <div className='relative flex p-4'>
                              <img
                                onClick={() => {
                                  if (reco?.createdBy?._id !== currentUser._id)
                                    return navigate(
                                      `/friends/${reco?.createdBy?._id}`
                                    );
                                }}
                                src={reco?.createdBy?.avatarUrl || bubbleImg}
                                alt='user avatar'
                                onError={(e) => onImageError(e)}
                                className='w-9 h-9 z-3 relative hover:scale-110 duration-300 left-3 shadow-lg cursor-pointer rounded-full'
                              />
                              {reco.bubbleId ? (
                                <img
                                  onClick={() =>
                                    navigate(`/bubbles/${reco.bubbleId._id}`)
                                  }
                                  src={reco.bubbleId.imageUrl || bubbleImg}
                                  onError={(e) => onImageError(e)}
                                  alt='bubble background'
                                  className='w-9 h-9 object-cover cursor-pointer shadow-lg rounded-full hover:scale-110 duration-300'
                                />
                              ) : (
                                <img
                                  onClick={() => {
                                    if (reco.userIds[0]._id !== currentUser._id)
                                      navigate(
                                        `/friends/${reco.userIds[0]._id}`
                                      );
                                  }}
                                  src={reco?.userIds[0]?.avatarUrl || bubbleImg}
                                  alt='user avatar'
                                  onError={(e) => onImageError(e)}
                                  className='w-9 h-9 shadow-lg cursor-pointer rounded-full hover:scale-110 duration-300'
                                />
                              )}
                            </div>
                          </div>
                          <p className='text-base pl-4 pb-4'>
                            {reco.description}
                          </p>
                          <div className='h-24 w-52 flex'>
                            <div className='h-24 mr-5 bg-black'>l</div>
                            <LinkPreview url={reco.recoUrl} />
                          </div>
                          <div className='flex flex-wrap  gap-2 justify-center mt-auto'>
                            {reco.categories.map((category) => {
                              return (
                                <span
                                  key={uuidv1()}
                                  className='text-xs tracking-widest font-face-tl inline-block py-1 px-2.5 leading-none text-center whitespace-nowrap align-baseline font-bold bg-lime-400 text-black rounded-full'
                                >
                                  {category}
                                </span>
                              );
                            })}
                          </div>
                          <div className='flex m-4 mt-8 justify-center gap-4'>
                            <RiDeleteBinLine
                              className='cursor-pointer'
                              onClick={() => handleModal(reco._id)}
                            ></RiDeleteBinLine>
                            <AiOutlineHeart className='cursor-pointer'></AiOutlineHeart>
                          </div>
                        </div>
                        {showModal && (
                          <DeleteRecoModal
                            showModal={showModal}
                            setShowModal={setShowModal}
                            recoId={recoIdToDelete}
                          />
                        )}
                      </div>
                    </div>
                  );
                })}
            </ul>
          ) : (
            <p className='text-center'>:/ you didnt write any recos...yet</p>
          )}
        </div>
      ) : null}

      <Outlet />
    </div>
  );
}
