'use client';

import EventsContext from '@/components/context/eventsContext';
import { Button } from '@/components/ui/Button';
import {
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from '@/components/ui/sheet';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { createAppointment } from '@/helpers/appointment';
import { FC, useContext, useRef } from 'react';
import { DoctorsContext } from '@/components/context';

interface Props {
  doctorID: string;
  date: string;
}

export const NewAppointment: FC<Props> = ({ doctorID, date }) => {
  const day = new Date(date);
  const [doctors] = useContext(DoctorsContext);
  const [events, setEvents] = useContext(EventsContext);
  const doctor = doctors.find((doc) => doc.doctor_id === doctorID)!;

  const cityRef = useRef<HTMLInputElement>(null);
  const startTimeRef = useRef<HTMLInputElement>(null);
  const endTimeRef = useRef<HTMLInputElement>(null);

  const handleSubmit = () => {
    const foundEvent = events.find((event: any) => event.date === date) || {
      date,
    };

    const time = {
      start: startTimeRef.current!.value,
      end: endTimeRef.current!.value,
    };

    createAppointment(
      date,
      doctor,
      time,
      cityRef.current!.value,
      foundEvent,
      setEvents
    );
  };

  return (
    <SheetContent side='bottom'>
      <SheetHeader className='mb-4'>
        <SheetTitle>
          Fill out information about outpatient appointment
        </SheetTitle>
      </SheetHeader>
      <div className='flex flex-col gap-4 mb-4'>
        <div className='flex gap-4 justify-between'>
          <div className='flex grow flex-col gap-2'>
            <Label
              htmlFor='name'
              className=''
            >
              Receptionist:
            </Label>
            <Input
              id='name'
              type='text'
              disabled
              defaultValue={`${doctor.lastname} ${doctor.firstname[0]}.${doctor.middlename[0]}.`}
            />
          </div>
          <div className='flex grow flex-col gap-2'>
            <Label
              htmlFor='name'
              className=''
            >
              Date:
            </Label>
            <Input
              id='date'
              type='text'
              disabled
              defaultValue={day.toLocaleDateString('en-US')}
            />
          </div>
          <div className='flex grow flex-col gap-2'>
            <Label htmlFor='name'>Start time:</Label>
            <Input
              ref={startTimeRef}
              id='name'
              type='time'
              defaultValue='12:00'
              className='text-center'
              required
            />
          </div>
          <div className='flex grow flex-col gap-2'>
            <Label htmlFor='name'>End time:</Label>
            <Input
              ref={endTimeRef}
              id='name'
              type='time'
              defaultValue='13:30'
              className='text-center'
              required
            />
          </div>
        </div>
        <div className='flex flex-col gap-2'>
          <Label>Venue of the reception:</Label>
          <Input
            ref={cityRef}
            id='name'
            type='text'
            placeholder='Office №013/2'
            required
          />
        </div>
      </div>
      <SheetClose className='h-10 py-2 px-4 inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background hover:bg-slate-100 hover:text-slate-900 focus:bg-slate-100'>
        Cancel
      </SheetClose>
      <SheetClose asChild>
        <Button
          type='submit'
          onClick={handleSubmit}
        >
          Create outpatient appointment
        </Button>
      </SheetClose>
    </SheetContent>
  );
};
