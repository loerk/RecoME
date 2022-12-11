import React, { useState } from 'react';
import { useRecos } from '../contexts/RecoContext';

export default function LoadingModal() {
  const [shouldStartSpinner, setShouldStartSpinner] = useState({
    first: false,
    second: false,
    third: false,
  });

  const { isLoadingRecos } = useRecos();

  if (!isLoadingRecos) return null;

  setTimeout(() => {
    setShouldStartSpinner((prevState) => ({ ...prevState, first: true }));
  }, 1000);

  setTimeout(() => {
    setShouldStartSpinner((prevState) => ({ ...prevState, second: true }));
  }, 2000);

  setTimeout(() => {
    setShouldStartSpinner((prevState) => ({ ...prevState, third: true }));
  }, 3000);

  return (
    <div className='fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center'>
      <div className='flex items-center justify-center space-x-2'>
        <div className='flex justify-center items-center'>
          {shouldStartSpinner && (
            <div className='spinner-border animate-spin inline-block w-12 h-12 border-4 rounded-full'></div>
          )}
          {shouldStartSpinner && (
            <div className='spinner-border animate-spin inline-block w-12 h-12 border-4 rounded-full'></div>
          )}
          {shouldStartSpinner && (
            <div className='spinner-border animate-spin inline-block w-12 h-12 border-4 rounded-full'></div>
          )}
          <div className='absolute'>Loading</div>
        </div>
      </div>
    </div>
  );
}
