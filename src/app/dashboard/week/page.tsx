'use client';

import {
  NewDuty,
  NewTrip,
  RemoveTripSheet,
  NewVacation,
  RemoveVacationSheet,
  NewAppointment,
} from '@/components/CellActions/sheets';
import WeekTable from '@/components/TableViews/WeekTable';
import { Sheet } from '@/components/ui/sheet';
import { ViewFilterOptions } from '@/types/context';
import { DialogState } from '@/types/sheetState';
import { useSession } from 'next-auth/react';
import { redirect, useSearchParams } from 'next/navigation';
import { useState } from 'react';

export default function WeekViewPage() {
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

  return (
    <Sheet>
      <WeekTable
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
