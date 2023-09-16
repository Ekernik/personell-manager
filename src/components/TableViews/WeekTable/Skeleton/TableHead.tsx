import { Skeleton } from '@/components/ui/skeleton';
import React, { FC } from 'react';

interface Props {
  days: number;
}

const TableHead: FC<Props> = ({ days: _days }) => {
  const days = new Array(_days).fill('');

  return (
    <div className='h-[42px] w-full flex'>
      <div className='flex w-[310px] items-center border border-slate-200 px-4 py-2 '>
        <Skeleton className='h-5 w-12' />
      </div>
      {days.map((_, i) => (
        <div
          key={i}
          className={`flex flex-1 justify-center items-center border px-4 py-2 ${
            i > 0 && (i % 5 === 0 || i % 6 === 0)
              ? 'bg-red-50 border-red-200'
              : 'border-slate-200'
          }`}
        >
          <Skeleton className='h-5 w-12' />
        </div>
      ))}
    </div>
  );
};

export default TableHead;
