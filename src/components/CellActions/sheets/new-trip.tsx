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
import { isFree } from '@/helpers/is-free';
import { createTrip } from '@/helpers/trip';
import { FC, useContext, useEffect, useRef, useState } from 'react';
import { DoctorsContext } from '@/components/context';
import { Checkbox } from '@/components/ui/checkbox';

interface Props {
  doctorID: string;
  date: string;
}

export const NewTrip: FC<Props> = ({ doctorID, date }) => {
  const day = new Date(date);
  const eventLengthRef = useRef<HTMLInputElement>(null);
  const isInPlanningRef = useRef<HTMLButtonElement>(null);
  const [events, setEvents] = useContext(EventsContext);
  const [doctors] = useContext(DoctorsContext);

  const doctor = doctors.find((doc) => doc.doctor_id === doctorID)!;

  const [errors, setErrors] = useState<number[]>([]);
  const [isIgnored, setIsIgnored] = useState(false);

  const cityRef = useRef<HTMLInputElement>(null);

  const handleSubmit = () => {
    const eventLength = Number(eventLengthRef.current!.value);

    createTrip(
      date,
      eventLength,
      isInPlanningRef.current?.ariaChecked === 'true',
      doctor,
      cityRef.current!.value,
      events,
      setEvents
    );
  };

  const handleCheckIfFree = () => {
    const eventLength = Number(eventLengthRef.current?.value);
    const badArr = [];
    for (let i = 0, currentDate = date; i < eventLength; i++) {
      !isFree(
        doctors,
        doctor,
        events.find((event: any) => event.date === currentDate)
      ) && badArr.push(new Date(currentDate).getDate());

      const newDate = new Date(currentDate);
      newDate.setDate(newDate.getDate() + 1);
      const nextDay = newDate.toISOString().split('T')[0];

      currentDate = nextDay;
    }
    setErrors(badArr);
  };

  const messageNotEnough = doctor?.is_surgeon
    ? 'operating surgeons'
    : doctor?.is_first_assistant
    ? 'first surgical assistants'
    : 'second surgical assistants';

  useEffect(() => {
    handleCheckIfFree();
  }, []);

  return (
    <SheetContent side='bottom'>
      <SheetHeader className='mb-4'>
        <SheetTitle>Fill out information about work trip</SheetTitle>
      </SheetHeader>
      {errors.length > 0 && (
        <div className='flex flex-col gap-2 min-h-20 mb-2'>
          <div className='bg-red-100 p-3 rounded flex justify-between items-center'>
            <div className='mb-4'>
              <Label className='text-red-600'>Warning!</Label>
              <p className='text-sm leading-none'>
                Less than 2 {messageNotEnough} during next calendar dates:{' '}
                {errors.map((errDay, i) =>
                  i === errors.length - 1 ? errDay : `${errDay}, `
                )}
              </p>
            </div>
            <div className='flex items-center space-x-2'>
              <Label
                htmlFor='ignore-error'
                className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
              >
                Ignore warning
              </Label>
              <Checkbox
                id='ignore-error'
                onClick={() => setIsIgnored((prev) => !prev)}
              />
            </div>
          </div>
        </div>
      )}
      <div className='flex justify-between gap-4'>
        <div className='flex grow flex-col gap-2'>
          <Label htmlFor='doctor'>Doctor going on the work trip</Label>
          <Input
            id='doctor'
            type='text'
            disabled
            defaultValue={`${doctor?.lastname} ${doctor?.firstname[0]}.${doctor?.middlename[0]}.`}
          />
        </div>
        <div className='flex grow flex-col gap-2'>
          <Label htmlFor='date'>Start date</Label>
          <Input
            id='date'
            type='text'
            disabled
            defaultValue={day.toLocaleDateString('ru', {
              day: '2-digit',
              month: 'long',
              year: 'numeric',
            })}
          />
        </div>
        <div className='flex grow flex-col gap-2'>
          <Label htmlFor='city'>City</Label>
          <Input
            ref={cityRef}
            id='city'
            type='text'
            placeholder='Krakov'
          />
        </div>
        <div className='flex grow flex-col gap-2'>
          <Label htmlFor='trip-length'>Work trip length in days</Label>
          <Input
            ref={eventLengthRef}
            id='trip-length'
            type='number'
            min={1}
            defaultValue={1}
            onChange={handleCheckIfFree}
          />
        </div>
      </div>
      <div className='flex items-center space-x-2 my-4'>
        <Label
          htmlFor='trip-planning'
          className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
        >
          Work trip is in planning stage
        </Label>
        <Checkbox
          ref={isInPlanningRef}
          id='trip-planning'
        />
      </div>
      <div className='flex justify-end gap-4'>
        <SheetClose className='h-10 py-2 px-4 inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background hover:bg-slate-100 hover:text-slate-900 focus:bg-slate-100'>
          Cancel
        </SheetClose>
        <SheetClose asChild>
          <Button
            type='submit'
            disabled={isIgnored ? false : errors.length > 0}
            onClick={handleSubmit}
          >
            Create work trip
          </Button>
        </SheetClose>
      </div>
    </SheetContent>
  );
};
