'use client';

import React, { FC, useContext, useEffect, useState } from 'react';
import Table from '@/ui/Table';
import TRow from '@/ui/Table/TRow';
import THeadItem from '@/ui/Table/THeadItem';
import { DoctorsContext } from '../../context';
import { ViewFilterOptions } from '@/types/context';
import { SetSheetState } from '@/types/sheetState';
import DoctorData from '../DoctorData';
import DaysInMonth from './DaysInMonth';
import Events from './Events';
import MonthSkeleton from './Skeleton';

interface Props {
  filter: ViewFilterOptions;
  date: string;
  setSheetState: SetSheetState;
}

const MonthTable: FC<Props> = ({ filter, date, setSheetState }) => {
  const [DOCTORS] = useContext(DoctorsContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 500);
  });

  if (loading) return <MonthSkeleton />;

  return (
    <Table className='max-w-full'>
      <thead className='table-header-group bg-white'>
        <TRow className='flex'>
          <THeadItem className='w-[310px] text-slate-900 px-4 flex items-center'>
            Doctor
          </THeadItem>
          <DaysInMonth
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
                doc_username={doctor.username}
                doctors={DOCTORS}
                filter={filter}
                setSheetState={setSheetState}
              />
            </TRow>
          );
        })}
      </tbody>
    </Table>
  );
};

export default MonthTable;
