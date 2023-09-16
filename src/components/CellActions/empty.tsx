import React, { FC, PropsWithChildren, useContext } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/DropdownMenu';
import { createDuty } from '@/helpers/duty';
import EventsContext from '@/components/context/eventsContext';
import { isFree } from '@/helpers/is-free';
import Doctor from '@/types/doctor';
import { DoctorsContext } from '@/components/context';
import { SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { SetSheetState } from '@/types/sheetState';

interface Props extends PropsWithChildren {
  date: string;
  doctor: Doctor;
  setSheetState: SetSheetState;
}

const itemStyle =
  'group data-[disabled]:text-slate-300 relative flex select-none items-center px-3 py-2 m-1 text-sm outline-none transition-colors hover:cursor-pointer data-[disabled]:pointer-events-none rounded-md data-[disabled]:opacity-50 leading-none';

const availableItemStyle =
  'focus:bg-slate-100 data-[state=open]:bg-slate-200 data-[highlighted]:data-[state=open]:bg-slate-100';

const busyItemStyle =
  'bg-red-100 text-red-400 focus:bg-red-200 focus:text-red-600 data-[state=open]:bg-red-200 data-[highlighted]:data-[state=open]:bg-red-100';

const SomeContextMenu: FC<Props> = ({ date, doctor, setSheetState }) => {
  const [events, setEvents] = useContext(EventsContext);
  const [doctors] = useContext(DoctorsContext);

  const isBusy = !isFree(
    doctors,
    doctor,
    events.find((event: any) => event.date === date)
  );

  const label = new Date(date).toLocaleDateString('en-US', {
    day: '2-digit',
    month: 'short',
  });

  const messageNotEnough = doctor.is_surgeon
    ? 'operating surgeons'
    : doctor.is_first_assistant
    ? 'first surgical assistants'
    : 'second surgical assistants';

  const existentEvent = events.find((e: any) => e.date === date);

  const handleDutySheet = async () => {
    if (existentEvent?.duty) {
      const prevDoctorID = doctors.find(
        (doc: Doctor) => doc.username === existentEvent.duty
      )?.doctor_id!;

      setSheetState({
        dialog: 'duty',
        eventDate: date,
        prevDoctorID: prevDoctorID,
        selectedDoctorID: doctor.doctor_id,
      });
    } else {
      createDuty(date, doctor, existentEvent || { date }, setEvents);
    }
  };

  const handleAppointmentSheet = async () => {
    setSheetState({
      dialog: 'appointment',
      eventDate: date,
      prevDoctorID: '',
      selectedDoctorID: doctor.doctor_id,
    });
  };

  const handleTripSheet = async () => {
    setSheetState({
      dialog: 'trip',
      eventDate: date,
      prevDoctorID: '',
      selectedDoctorID: doctor.doctor_id,
    });
  };

  const handleVacationSheet = () => {
    setSheetState({
      dialog: 'vacation',
      eventDate: date,
      prevDoctorID: '',
      selectedDoctorID: doctor.doctor_id,
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className='w-full h-full flex justify-center items-center rounded select-none text-center outline-none hover:border-4 hover:border-teal-100 focus-visible:bg-teal-50' />
      <DropdownMenuContent className='min-w-[220px] bg-white rounded-md overflow-hidden p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)]'>
        <DropdownMenuLabel>
          {label}, {doctor.lastname}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {existentEvent?.duty ? (
          <SheetTrigger asChild>
            <DropdownMenuItem
              className={itemStyle}
              onClick={handleDutySheet}
            >
              Appoint on duty
            </DropdownMenuItem>
          </SheetTrigger>
        ) : (
          <DropdownMenuItem
            className={itemStyle}
            onClick={handleDutySheet}
          >
            Appoint on duty
          </DropdownMenuItem>
        )}
        {isBusy && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuLabel className='text-xs text-red-500'>
              Less than 2 {messageNotEnough}!
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
          </>
        )}
        <SheetTrigger asChild>
          <DropdownMenuItem
            className={cn(
              itemStyle,
              isBusy ? busyItemStyle : availableItemStyle
            )}
            onClick={handleAppointmentSheet}
          >
            Schedule an outpatient appointment 
          </DropdownMenuItem>
        </SheetTrigger>
        <SheetTrigger asChild>
          <DropdownMenuItem
            className={cn(
              itemStyle,
              isBusy ? busyItemStyle : availableItemStyle
            )}
            onClick={handleTripSheet}
          >
            Send on business trip
          </DropdownMenuItem>
        </SheetTrigger>
        <SheetTrigger asChild>
          <DropdownMenuItem
            className={cn(
              itemStyle,
              isBusy ? busyItemStyle : availableItemStyle
            )}
            onClick={handleVacationSheet}
          >
            Send on vacation
          </DropdownMenuItem>
        </SheetTrigger>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SomeContextMenu;
