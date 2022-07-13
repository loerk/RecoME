import useLinkPreview from "use-link-preview";
import { useParams } from "react-router-dom";
export function LinkPreview({ url }) {
  const { bubbleId } = useParams();

  const { metadata } = useLinkPreview(url);

  return (
    <div className="flex ">
      {metadata && bubbleId && (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="border m-auto cursor:pointer rounded flex justify-center p-4 mb-5 gap-4 "
        >
          <img
            className="object-cover w-16 aspect-square"
            src={metadata.img}
            alt=""
          />
          <div className="w-1/3 md:w-2/3 pr-3">
            <h3 className="text-base md:text-xl">{metadata.title}</h3>
            <p className="truncate text-sm md:text-lg text-ellipsis">
              {metadata.description}
            </p>
          </div>
        </a>
      )}
      {metadata && !bubbleId && (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="border cursor:pointer rounded flex p-4 my-2 gap-4 md:w-96 w-52 "
        >
          <img
            className="object-cover w-1/3 aspect-square"
            src={metadata.img}
            alt=""
          />
          <div className="w-2/3 pr-3">
            <h3 className="text-base md:text-xl">{metadata.title}</h3>
            <p className="truncate text-sm md:text-lg text-ellipsis">
              {metadata.description}
            </p>
          </div>
        </a>
      )}
    </div>
  );
}
