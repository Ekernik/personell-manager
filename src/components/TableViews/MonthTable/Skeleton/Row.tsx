import React, { FC } from 'react';
import DoctorsData from './DoctorsData';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

interface Props {
  days: number;
}

const Row: FC<Props> = ({ days: _days }) => {
  const days = new Array(_days).fill('');

  const holidayBG =
    '[&:nth-child(7n)]:bg-red-50 [&:nth-child(8)]:bg-red-50 [&:nth-child(15)]:bg-red-50 [&:nth-child(22)]:bg-red-50 [&:nth-child(29)]:bg-red-50';
  const holidayBorder =
    '[&:nth-child(7n)]:border-red-200 [&:nth-child(8)]:border-red-200 [&:nth-child(15)]:border-red-200 [&:nth-child(22)]:border-red-200 [&:nth-child(29)]:border-red-200';

  return (
    <div className='flex w-full items-center odd:bg-slate-100'>
      <DoctorsData />
      {days.map((_, i) => (
        <div
          key={i}
          className={cn(
            'flex flex-1 justify-center items-center border px-1 py-2',
            holidayBG,
            holidayBorder
          )}
        >
          <Skeleton className='h-5 w-full' />
        </div>
      ))}
    </div>
  );
};

export default Row;
