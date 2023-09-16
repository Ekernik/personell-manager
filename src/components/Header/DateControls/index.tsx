'use client';

import { Button } from '@/components/ui/Button';
import { ZoomFilterOptions } from '@/types/context';
import { useRouter } from 'next/navigation';
import React, { FC } from 'react';

interface Props {
  date: string;
  zoom: ZoomFilterOptions;
}

const DateControls: FC<Props> = ({
  date = new Date().toISOString().split('T')[0],
  zoom = 'month',
}) => {
  const [year, month, day] = date.split('-');
  const router = useRouter();

  const handleIncrease = () => {
    let date = [year, month, day].join('-');

    if (zoom === 'day') {
      date = new Date(Number(year), Number(month) - 1, Number(day) + 2)
        .toISOString()
        .split('T')[0];
    }

    if (zoom === 'week') {
      date = new Date(Number(year), Number(month) - 1, Number(day) + 8)
        .toISOString()
        .split('T')[0];
    }

    if (zoom === 'month') {
      date = new Date(Number(year), Number(month), 2)
        .toISOString()
        .split('T')[0];
    }

    const url = new URLSearchParams({
      date,
      filter: 'all',
    }).toString();

    router.push(`/dashboard/${zoom}/?${url}`);
  };

  const handleDecrease = () => {
    let date = [year, month, day].join('-');

    if (zoom === 'day') {
      date = new Date(Number(year), Number(month) - 1, Number(day))
        .toISOString()
        .split('T')[0];
    }

    if (zoom === 'week') {
      date = new Date(Number(year), Number(month) - 1, Number(day) - 6)
        .toISOString()
        .split('T')[0];
    }

    if (zoom === 'month') {
      date = new Date(Number(year), Number(month) - 2, 2)
        .toISOString()
        .split('T')[0];
    }

    const url = new URLSearchParams({
      date,
      filter: 'all',
    }).toString();

    router.push(`/dashboard/${zoom}/?${url}`);
  };

  return (
    <div className='flex gap-4 border border-slate-200 justify-between items-center rounded-lg bg-white p-[5px] h-[42px]'>
      <Button
        variant='secondary'
        className='px-2 py-1.5 h-[32px] hover:bg-slate-200'
        onClick={handleDecrease}
      >
        -
      </Button>
      <span className='font-bold text-xl text-center w-24'>
        {zoom === 'day' &&
          new Date(date).toLocaleDateString('en-US', {
            day: '2-digit',
            month: 'short',
          })}

        {['week', 'month'].includes(zoom) &&
          new Date(date).toLocaleDateString('en-US', { month: 'long' })}
      </span>
      <Button
        variant='secondary'
        className='px-2 py-1.5 h-[32px] hover:bg-slate-200'
        onClick={handleIncrease}
      >
        +
      </Button>
    </div>
  );
};

export default DateControls;
