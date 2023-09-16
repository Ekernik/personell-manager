import React, { FC } from 'react';
import DoctorsData from './DoctorsData';
import { Skeleton } from '@/components/ui/skeleton';

interface Props {
  days: number;
}

const Row: FC<Props> = ({ days: _days }) => {
  const days = new Array(_days).fill('');

  return (
    <div className='flex w-full items-center odd:bg-slate-100'>
      <DoctorsData />
      {days.map((_, i) => (
        <div
          key={i}
          className={`flex flex-1 justify-center items-center border px-4 py-2 ${
            i > 0 && (i % 5 === 0 || i % 6 === 0)
              ? 'bg-red-50 border-red-200'
              : 'border-slate-200'
          }`}
        >
          <Skeleton className='h-5 w-20' />
        </div>
      ))}
    </div>
  );
};

export default Row;
