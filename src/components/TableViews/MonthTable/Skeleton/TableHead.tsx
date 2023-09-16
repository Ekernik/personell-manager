import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import React, { FC } from 'react';

interface Props {
  days: number;
}

const TableHead: FC<Props> = ({ days: _days }) => {
  const days = new Array(_days).fill('');
  const holidayBG =
    '[&:nth-child(7n)]:bg-red-50 [&:nth-child(8)]:bg-red-50 [&:nth-child(15)]:bg-red-50 [&:nth-child(22)]:bg-red-50 [&:nth-child(29)]:bg-red-50';
  const holidayBorder =
    '[&:nth-child(7n)]:border-red-200 [&:nth-child(8)]:border-red-200 [&:nth-child(15)]:border-red-200 [&:nth-child(22)]:border-red-200 [&:nth-child(29)]:border-red-200';

  return (
    <div className='h-[42px] w-full flex'>
      <div className='flex min-w-[288px] items-center border border-slate-200 px-4 py-2 '>
        <Skeleton className='h-5 w-12' />
      </div>
      {days.map((_, i) => (
        <div
          key={i}
          className={cn(
            'flex flex-1 justify-center items-center border-slate-200 border px-1 py-2',
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

export default TableHead;
