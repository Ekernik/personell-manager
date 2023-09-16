'use client';

import EventsContext from '@/components/context/eventsContext';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { FC, useContext } from 'react';
import { createDuty } from '@/helpers/duty';
import { getPrettyDate } from '@/lib/utils';
import { DoctorsContext } from '@/components/context';
import {
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

interface Props {
  prevDoctorID: string;
  nextDoctorID: string;
  date: string;
}

export const NewDuty: FC<Props> = ({ prevDoctorID, nextDoctorID, date }) => {
  const [events, setEvents] = useContext(EventsContext);
  const [doctors] = useContext(DoctorsContext);

  const prevDoctor = doctors.find((doc) => doc.doctor_id == prevDoctorID);
  const nextDoctor = doctors.find((doc) => doc.doctor_id == nextDoctorID);

  if (!prevDoctor || !nextDoctor) return null;

  const handleSubmit = async () => {
    const foundEvent = events.find((event: any) => event.date === date);
    await createDuty(date, nextDoctor, foundEvent, setEvents);
  };

  return (
    <SheetContent
      className='w-md'
      side='bottom'
    >
      <SheetHeader>
        <SheetTitle>Doctor on duty already set for this date!</SheetTitle>
        <SheetDescription>
          Are you sure you want to reassign duty to another doctor?
          {`${prevDoctor.username}`}
        </SheetDescription>
      </SheetHeader>
      <div className='flex flex-col gap-4'>
        <div className='flex flex-col gap-2'>
          <Label
            htmlFor='name'
            className=''
          >
            For {getPrettyDate(date)} Doctor on Duty is:
          </Label>
          <Input
            id='name'
            type='text'
            disabled
            value={`${prevDoctor.lastname} ${prevDoctor.firstname[0]}.${prevDoctor.middlename[0]}.`}
          />
        </div>
        <div className='flex flex-col gap-2'>
          <Label
            htmlFor='name'
            className=''
          >
            You are going to assign duty to:
          </Label>
          <Input
            id='name'
            type='text'
            disabled
            value={`${nextDoctor.lastname} ${nextDoctor.firstname[0]}.${nextDoctor.middlename[0]}.`}
          />
        </div>
      </div>
      <SheetFooter>
        <SheetTrigger className='h-10 py-2 px-4 inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background hover:bg-slate-100 hover:text-slate-900 focus:bg-slate-100'>
          Cancel
        </SheetTrigger>
        <SheetTrigger asChild>
          <Button
            type='submit'
            onClick={handleSubmit}
          >
            Reassign
          </Button>
        </SheetTrigger>
      </SheetFooter>
    </SheetContent>
  );
};
