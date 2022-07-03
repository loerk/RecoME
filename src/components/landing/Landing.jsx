import { MdArrowForwardIos } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { useUsers } from "../../contexts/UsersContext";
import { useBubbles } from "../../contexts/BubbleContext";
import { useRecos } from "../../contexts/RecoContext";

export default function Landing() {
  const { currentUser, findUserById } = useUsers();
  const { getBubbles } = useBubbles();
  const { getAllRecos } = useRecos();
  const navigate = useNavigate();
  window.scrollTo(0, 0);

  if (!currentUser) {
    return null;
  }

  const bubbles = getBubbles();
  const recosFromUser = getAllRecos();
  const findFriend = (id) => {
    return findUserById(id);
  };

  return (
    <div className="py-10 ">
      <div className="flex items-center m-auto gap-7 mt-16 p-10 flex-col h-76 rounded shadow-2xl ">
        <div className="flex justify-around items-center w-full content-center">
          <h1 className="px-10">Your bubbles</h1>
          <ul className="flex overflow-x-hidden w-2/3">
            {bubbles?.map((bubble) => (
              <li key={bubble.id}>
                <div className="text-center">
                  <img
                    onClick={() => navigate(`/bubbles/${bubble.id}`)}
                    className="w-28 h-28 object-cover object-center opacity-50  hover:opacity-100 rounded-full cursor-pointer"
                    src={bubble.imageUrl}
                    alt=""
                  />
                  <button>{bubble.name}</button>
                </div>
              </li>
            ))}
          </ul>
          <Link to={"/bubbles"}>
            <MdArrowForwardIos className="mx-6 text-2xl md:text-3xl"></MdArrowForwardIos>
          </Link>
        </div>
      </div>
      <div className="flex items-center m-auto gap-7 my-7 p-10 flex-col h-76   rounded shadow-2xl ">
        <div className="flex justify-around items-center w-full content-center">
          <h1 className="px-10">Your friends</h1>
          <ul className="flex overflow-x-hidden w-2/3">
            {currentUser.friends?.map((friendId) => {
              let currFriend = findFriend(friendId);
              return (
                <li key={friendId}>
                  <div className="text-center">
                    <img
                      onClick={() => navigate(`/friends/${currFriend.id}`)}
                      className="w-28 h-28 object-cover object-center opacity-50  hover:opacity-100 rounded-full cursor-pointer"
                      src={currFriend.avatarUrl}
                      alt=""
                    />
                    <button className="relative">{currFriend.username}</button>
                  </div>
                </li>
              );
            })}
          </ul>
          <Link to={"/friends"}>
            <MdArrowForwardIos className="mx-6 text-2xl md:text-3xl"></MdArrowForwardIos>
          </Link>
        </div>
      </div>{" "}
      <div className="flex items-center m-auto gap-7 my-7 p-10   flex-col h-76rounded shadow-2xl ">
        <div className="flex justify-around items-center w-full content-center">
          <h1 className="px-10">Latest Recos</h1>
          <ul className="flex  overflow-x-hidden w-2/3">
            {recosFromUser?.map((reco) => (
              <li key={reco.id}>
                <div className="flex w-28 h-28 object-cover object-center opacity-60 bg-yellow-200 hover:opacity-100 rounded-full cursor-pointer">
                  <button className="pl-2" onClick={() => navigate("/recos")}>
                    {reco.title}
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <Link to={"/recos"}>
            <MdArrowForwardIos className="mx-6 text-2xl md:text-3xl"></MdArrowForwardIos>
          </Link>
        </div>
      </div>
    </div>
  );
}
