'use client';

import React, { FC } from 'react';
import { cn } from '@/lib/utils';
import { generateUrl } from '@/app/utils/urlGenerator';
import { SearchParams } from '@/types/searchParams';
import { ViewFilterOptions } from '@/types/context';
import { useRouter } from 'next/navigation';

const toggleGroupItemClasses =
  'hover:bg-slate-200 text-slate-700 flex px-2 py-1.5 items-center justify-center text-base leading-4 rounded outline-none focus-visible:z-10 focus-visible:outline-slate-700 disabled:bg-white disabled:text-slate-900 disabled:select-none';

interface Props {
  pathname: string;
  searchParams: SearchParams;
}

const Filters: FC<Props> = ({ pathname, searchParams }) => {
  const date = searchParams.get('date') as string;
  const filter = searchParams.get('filter') as ViewFilterOptions;
  const router = useRouter();

  if (pathname.split('/')[2] === 'day') return null;

  return (
    <section
      className='inline-flex bg-white space-x-2 p-[5px] h-[42px] rounded-md border border-slate-200'
      aria-label='Table data filter'
    >
      <button
        className={cn(
          toggleGroupItemClasses,
          'bg-orange-100 hover:bg-orange-200 disabled:bg-orange-400 disabled:text-white'
        )}
        aria-label='All info'
        disabled={filter === 'all'}
        onClick={() =>
          router.push(
            generateUrl(pathname, { ...searchParams, date, filter: 'all' })
          )
        }
      >
        All
      </button>
      <button
        className={cn(
          toggleGroupItemClasses,
          'bg-green-100 hover:bg-green-200 disabled:bg-green-400 disabled:text-white'
        )}
        aria-label='Only vacations'
        disabled={filter === 'vacations'}
        onClick={() =>
          router.push(
            generateUrl(pathname, {
              ...searchParams,
              date,
              filter: 'vacations',
            })
          )
        }
      >
        Vacations
      </button>
      <button
        className={cn(
          toggleGroupItemClasses,
          'bg-blue-100 hover:bg-blue-200 disabled:bg-blue-400 disabled:text-white'
        )}
        aria-label='Only business trips'
        disabled={filter === 'trips'}
        onClick={() =>
          router.push(
            generateUrl(pathname, { ...searchParams, date, filter: 'trips' })
          )
        }
      >
        Business trips
      </button>
      <button
        className={cn(
          toggleGroupItemClasses,
          'bg-teal-100 hover:bg-teal-200 disabled:bg-teal-400 disabled:text-white'
        )}
        aria-label='Only duties'
        disabled={filter === 'duty'}
        onClick={() =>
          router.push(
            generateUrl(pathname, { ...searchParams, date, filter: 'duty' })
          )
        }
      >
        Duty
      </button>
      <button
        className={cn(
          toggleGroupItemClasses,
          'bg-purple-100 hover:bg-purple-200 disabled:bg-purple-400 disabled:text-white'
        )}
        aria-label='Only OPA'
        disabled={filter === 'appointments'}
        onClick={() =>
          router.push(
            generateUrl(pathname, {
              ...searchParams,
              date,
              filter: 'appointments',
            })
          )
        }
      >
        OPA
      </button>
    </section>
  );
};

export default Filters;
