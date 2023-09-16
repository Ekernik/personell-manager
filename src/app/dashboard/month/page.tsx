'use client';

import {
  NewDuty,
  NewTrip,
  NewVacation,
  NewAppointment,
  RemoveTripSheet,
  RemoveVacationSheet,
} from '@/components/CellActions/sheets';
import MonthTable from '@/components/TableViews/MonthTable';
import { Sheet } from '@/components/ui/sheet';
import { Skeleton } from '@/components/ui/skeleton';
import { ViewFilterOptions } from '@/types/context';
import { DialogState } from '@/types/sheetState';
import { useSession } from 'next-auth/react';
import { redirect, useSearchParams } from 'next/navigation';
import { useState } from 'react';

export default function MonthView() {
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/login');
    },
  });

  const searchParams = useSearchParams();
  const todayDate = new Date().toISOString().split('T')[0];
  const filter: ViewFilterOptions =
    (searchParams?.get('filter') as ViewFilterOptions) || 'all';
  const date: string = (searchParams?.get('date') as string) || todayDate;
  new Date().toISOString().split('T')[0];

  const [sheetState, setSheetState] = useState({
    dialog: 'trip' as DialogState,
    eventDate: todayDate,
    prevDoctorID: '',
    selectedDoctorID: '1',
  });

  if (status === 'loading') {
    return (
      <section className='border rounded-lg border-slate-400 bg-white w-full'>
        <div className='px-4 py-2 w-full border border-slate-200'>
          <Skeleton className='h-5 w-8' />
        </div>
        <div className='flex w-full items-center'>
          <div className='px-4 py-2 w-[310px] flex border border-slate-200'>
            <Skeleton className='h-5 w-[130px] mr-10 border border-slate-100' />
            <Skeleton className='h-5 w-5 border mx-1 border-slate-100 rounded-full' />
            <Skeleton className='h-5 w-5 border mx-1 border-slate-100 rounded-full' />
            <Skeleton className='h-5 w-5 border mx-1 border-slate-100 rounded-full' />
          </div>
        </div>
      </section>
    );
  }

  return (
    <Sheet>
      <MonthTable
        filter={filter}
        date={date}
        setSheetState={setSheetState}
      />

      {sheetState.dialog === 'duty' && (
        <NewDuty
          prevDoctorID={sheetState.prevDoctorID}
          nextDoctorID={sheetState.selectedDoctorID}
          date={sheetState.eventDate}
        />
      )}

      {sheetState.dialog === 'trip' && (
        <NewTrip
          doctorID={sheetState.selectedDoctorID}
          date={sheetState.eventDate}
        />
      )}

      {sheetState.dialog === 'trip-remove' && (
        <RemoveTripSheet
          doctorID={sheetState.selectedDoctorID}
          date={sheetState.eventDate}
        />
      )}

      {sheetState.dialog === 'vacation' && (
        <NewVacation
          doctorID={sheetState.selectedDoctorID}
          date={sheetState.eventDate}
        />
      )}

      {sheetState.dialog === 'vacation-remove' && (
        <RemoveVacationSheet
          doctorID={sheetState.selectedDoctorID}
          date={sheetState.eventDate}
        />
      )}

      {sheetState.dialog === 'appointment' && (
        <NewAppointment
          doctorID={sheetState.selectedDoctorID}
          date={sheetState.eventDate}
        />
      )}
    </Sheet>
  );
}
