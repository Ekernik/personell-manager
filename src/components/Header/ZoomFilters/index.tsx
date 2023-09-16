'use client';

import React, { FC } from 'react';
import Link from 'next/link';
import { generateUrl } from '@/app/utils/urlGenerator';
import { cn } from '@/lib/utils';
import { ZoomFilterOptions } from '@/types/context';

const linkItem =
  'hover:bg-green-100 text-slate-700 flex px-2 py-1.5 items-center justify-center text-base leading-4 rounded outline-none focus-visible:z-10 focus-visible:outline-slate-700';

const disabled = 'bg-green-400 hover:bg-green-400 text-white select-none';

interface Props {
  zoom: ZoomFilterOptions;
}

const Filters: FC<Props> = ({ zoom }) => {
  return (
    <section
      className='inline-flex border border-slate-200 bg-white space-x-2 p-[5px] h-[42px] rounded-md'
      aria-label='Table scale'
    >
      {zoom === 'day' ? (
        <p className={cn(linkItem, disabled)}>Day</p>
      ) : (
        <Link
          className={cn(linkItem)}
          aria-label='Day'
          href={generateUrl('day')}
        >
          Day
        </Link>
      )}

      {zoom === 'week' ? (
        <p className={cn(linkItem, disabled)}>Week</p>
      ) : (
        <Link
          className={cn(linkItem)}
          aria-label='Week'
          href={generateUrl('week')}
        >
          Week
        </Link>
      )}

      {zoom === 'month' ? (
        <p className={cn(linkItem, disabled)}>Month</p>
      ) : (
        <Link
          className={cn(linkItem)}
          aria-label='Month'
          href={generateUrl('month')}
        >
          Month
        </Link>
      )}
    </section>
  );
};

export default Filters;
