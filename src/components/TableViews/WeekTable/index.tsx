'use client';

import React, { useContext, useEffect, useState } from 'react';
import Table from '@/ui/Table';
import TRow from '@/ui/Table/TRow';
import THeadItem from '@/ui/Table/THeadItem';
import { DoctorsContext } from '../../context';
import { ViewFilterOptions } from '@/types/context';
import { SetSheetState } from '@/types/sheetState';
import DoctorData from '../DoctorData';
import DaysInWeek from './DaysInWeek';
import Events from './Events';
import WeekSkeleton from './Skeleton';

interface Props {
  filter: ViewFilterOptions;
  date: string;
  setSheetState: SetSheetState;
}

const WeekTable = ({ filter, date, setSheetState }: Props) => {
  const [DOCTORS] = useContext(DoctorsContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 500);
  });

  if (loading) return <WeekSkeleton />;

  return (
    <Table className='max-w-full'>
      <thead className='table-header-group bg-white'>
        <TRow className='flex'>
          <THeadItem className='w-[310px] text-slate-900 px-4 flex items-center'>
            Doctor
          </THeadItem>
          <DaysInWeek
            date={date}
            filter={filter}
          />
        </TRow>
      </thead>
      <tbody className='bg-white'>
        {DOCTORS.map((doctor) => {
          if (!doctor) return null;

          return (
            <TRow
              key={doctor.doctor_id}
              className='flex'
            >
              <DoctorData doctor={doctor} />
              <Events
                date={date}
                filter={filter}
                doctors={DOCTORS}
                doc_username={doctor.username}
                setSheetState={setSheetState}
              />
            </TRow>
          );
        })}
      </tbody>
    </Table>
  );
};

export default WeekTable;
