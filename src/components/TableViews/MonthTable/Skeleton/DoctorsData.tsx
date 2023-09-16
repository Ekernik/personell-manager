import { Skeleton } from '@/components/ui/skeleton';
import React, { FC } from 'react';

const DoctorsData: FC = () => {
  return (
    <div className='px-4 py-2 w-[288px] flex justify-between border border-slate-200 '>
      <Skeleton className='h-5 w-[130px] mr-10 border border-slate-100' />
      <Skeleton className='h-5 w-5 border mx-1 border-slate-100 rounded-full' />
      <Skeleton className='h-5 w-5 border mx-1 border-slate-100 rounded-full' />
      <Skeleton className='h-5 w-5 border mx-1 border-slate-100 rounded-full' />
    </div>
  );
};

export default DoctorsData;
