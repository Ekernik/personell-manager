import { DoctorsContext, EventsContext } from '@/components/context';
import { Button } from '@/components/ui/Button';
import {
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose,
} from '@/components/ui/sheet';
import { removeVacation } from '@/helpers/vacation';
import { getPrettyDate } from '@/lib/utils';
import React, { FC, useContext } from 'react';

interface Props {
  doctorID: string;
  date: string;
}

export const RemoveVacationSheet: FC<Props> = ({ doctorID, date }) => {
  const [events, setEvents] = useContext(EventsContext);
  const [doctors] = useContext(DoctorsContext);
  const doctor = doctors.find((doc) => doc.doctor_id == doctorID)!;

  const handleVacationCancelation = () =>
    removeVacation(date, doctor, events, setEvents);

  return (
    <SheetContent side={'bottom'}>
      <SheetHeader>
        <SheetTitle>You are about to end doctor's vacation!</SheetTitle>
        <SheetDescription>
          Starting from {getPrettyDate(date)}, {doctor?.lastname}{' '}
          {doctor?.firstname} {doctor?.middlename} will take up his duties.
        </SheetDescription>
      </SheetHeader>
      <SheetFooter>
        <SheetClose className='h-10 py-2 px-4 inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background hover:bg-slate-100 hover:text-slate-900 focus:bg-slate-100'>
          Cancel
        </SheetClose>
        <SheetClose asChild>
          <Button onClick={handleVacationCancelation}>End vacation</Button>
        </SheetClose>
      </SheetFooter>
    </SheetContent>
  );
};
