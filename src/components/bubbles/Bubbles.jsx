import React, { useEffect } from "react";
import {
  Outlet,
  useNavigate,
  useSearchParams,
  useParams,
} from "react-router-dom";
import { AddButton } from "../../utilities/Buttons";

import BubbleList from "./BubbleList";
import { useBubbles } from "../../contexts/BubbleContext";
export default function Bubbles() {
  const { setShouldFetchBubbles } = useBubbles();

  useEffect(() => {
    setShouldFetchBubbles(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  window.scrollTo(0, 0);
  const [searchParams, setSearchParams] = useSearchParams();

  const navigate = useNavigate();
  const params = useParams();

  const addBubble = () => {
    navigate("/bubbles/addBubble");
  };

  return (
    <div className="pt-32 pb-12">
      {!params.bubbleId ? (
        <div>
          <div className="flex  justify-center">
            <div className="mb-3 xl:w-96">
              <input
                value={searchParams.get("filter") || ""}
                onChange={(e) => {
                  let filter = e.target.value;
                  if (filter) {
                    setSearchParams({ filter });
                  } else {
                    setSearchParams({ filter: "" });
                  }
                }}
                type="search"
                className="
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
                  focus:text-gray-700 focus:bg-white focus:border-slate-600 focus:outline-none
                "
                id="exampleSearch"
                placeholder="Search Bubble"
              />
            </div>
          </div>
          <AddButton action={addBubble} />
        </div>
      ) : null}

      <div>
        <Outlet />
        <BubbleList searchParams={searchParams} />
      </div>
    </div>
  );
}
