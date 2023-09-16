import { DoctorsContext, EventsContext } from '@/components/context';
import { Button } from '@/components/ui/Button';
import {
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetTrigger,
} from '@/components/ui/sheet';
import { cancelTrip } from '@/helpers/trip';
import { getPrettyDate } from '@/lib/utils';
import React, { FC, useContext } from 'react';

interface Props {
  doctorID: string;
  date: string;
}

export const RemoveTripSheet: FC<Props> = ({ doctorID, date }) => {
  const [events, setEvents] = useContext(EventsContext);
  const [doctors] = useContext(DoctorsContext);
  const doctor = doctors.find((doc) => doc.doctor_id == doctorID)!;
  const handleTripCancelation = () =>
    cancelTrip(date, doctor, events, setEvents);

  return (
    <SheetContent side={'bottom'}>
      <SheetHeader>
        <SheetTitle>You are about to cancel whole business trip!</SheetTitle>
        <SheetDescription>
          {doctor?.lastname} {doctor?.firstname} {doctor?.middlename} will end
          this business trip, starting from {getPrettyDate(date)} and till the end.
        </SheetDescription>
      </SheetHeader>
      <SheetFooter>
        <SheetTrigger className='h-10 py-2 px-4 inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background hover:bg-slate-100 hover:text-slate-900 focus:bg-slate-100'>
          Cancel
        </SheetTrigger>
        <SheetTrigger asChild>
          <Button onClick={handleTripCancelation}>End business trip</Button>
        </SheetTrigger>
      </SheetFooter>
    </SheetContent>
  );
};
