'use client';

import React, { FC } from 'react';
import AppMenu from '../AppMenu';
import ViewFilters from './ViewFilters';
import ZoomFilters from './ZoomFilters';
import DateControls from './DateControls';
import { usePathname, useSearchParams } from 'next/navigation';
import { ViewFilterOptions, ZoomFilterOptions } from '@/types/context';

const Header: FC = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const zoom = pathname.split('/')[2] as ZoomFilterOptions;
  const date =
    (searchParams.get('date') as ViewFilterOptions) ||
    new Date().toISOString().split('T')[0];

  return (
    <header className='flex justify-between'>
      <div className='flex gap-2'>
        <AppMenu />
        <ViewFilters
          pathname={pathname}
          // @ts-ignore #TODO: FIX THIS
          searchParams={searchParams}
        />
      </div>
      <div className='flex gap-8'>
        <DateControls
          zoom={zoom}
          date={date}
        />
        <ZoomFilters zoom={zoom} />
      </div>
    </header>
  );
};

export default Header;
