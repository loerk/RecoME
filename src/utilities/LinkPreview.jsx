import useLinkPreview from 'use-link-preview';
import abstract from '../assets/images/abstract.jpg';

export function LinkPreview({ url }) {
  const { metadata } = useLinkPreview(url);

  return (
    <div className='flex justify-center'>
      {metadata ? (
        <a
          href={url}
          target='_blank'
          rel='noopener noreferrer'
          className='border bg-purple-100 cursor:pointer rounded flex p-2 my-2 gap-4 md:w-56 w-52'
        >
          <img
            className='object-cover w-16 h-16'
            src={metadata.img || abstract}
            alt=''
          />
          <div className='w-2/3 pr-2'>
            <h3 className='text-xs truncate md:text-sm text-ellipsis'>
              {metadata.title || 'no further information available'}
            </h3>
            <p className='truncate text-xs p-2 text-ellipsis'>
              {metadata.description || 'the link should work :)'}
            </p>
          </div>
        </a>
      ) : (
        <a
          href={url}
          target='_blank'
          rel='noopener noreferrer'
          className='cursor:pointer  bg-purple-100 flex p-2 my-2 gap-4 md:w-56 w-52'
        >
          <img className='object-cover w-16 h-16' src={abstract} alt='' />
          <div>
            <h3 className='text-xs truncate md:text-sm text-ellipsis'>
              {'no further information available'}
            </h3>
            <p className='truncate text-xs p-2 text-ellipsis'>
              {'the link should work :)'}
            </p>
          </div>
        </a>
      )}
    </div>
  );
}
