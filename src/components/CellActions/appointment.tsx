import React, { FC, PropsWithChildren, useContext } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/DropdownMenu';
import { ZoomFilterOptions } from '@/types/context';
import { removeAppointment } from '@/helpers/appointment';
import { EventsContext } from '../context';
import { SheetTrigger } from '../ui/sheet';
import { cn } from '@/lib/utils';
import { SetSheetState } from '@/types/sheetState';

interface Props extends PropsWithChildren {
  date: string;
  doctor: any;
  zoom: ZoomFilterOptions;
  setSheetState: SetSheetState;
  dangerZone: any;
}

const itemStyle =
  'group data-[disabled]:text-slate-300 relative flex select-none items-center px-3 py-2 m-1 text-sm outline-none transition-colors hover:cursor-pointer data-[disabled]:pointer-events-none rounded-md data-[disabled]:opacity-50 leading-none';

const busyItemStyle =
  'bg-red-100 text-red-400 focus:bg-red-200 focus:text-red-600 data-[state=open]:bg-red-200 data-[highlighted]:data-[state=open]:bg-red-100';

const dangerStyle =
  'bg-red-600 text-red-50 focus:bg-red-600 focus:text-red-50 hover:bg-red-700 hover:text-red-100 rounded-none';

const AppointmentContextMenu: FC<Props> = ({
  date,
  doctor,
  zoom,
  setSheetState,
  dangerZone,
}) => {
  const [events, setEvents] = useContext(EventsContext);

  const label = new Date(date).toLocaleDateString('en-US', {
    day: '2-digit',
    month: 'short',
  });

  const handleAppointmentCancelation = () => {
    removeAppointment(date, doctor, events, setEvents);
  };

  const handleTripSheet = async () => {
    setSheetState({
      dialog: 'trip',
      eventDate: date,
      prevDoctorID: '',
      selectedDoctorID: doctor.doctor_id,
    });
  };

  const handleVacationSheet = async () => {
    setSheetState({
      dialog: 'vacation',
      eventDate: date,
      prevDoctorID: '',
      selectedDoctorID: doctor.doctor_id,
    });
  };

  const isDanger = dangerZone.isOnTrip || dangerZone.isOnVacation;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn(
          'w-full h-full flex justify-center items-center rounded select-none text-center outline-none hover:bg-teal-100 hover:text-teal-900 focus:bg-teal-50 focus:text-teal-900',
          isDanger && dangerStyle
        )}
      >
        {zoom === 'week' && 'OPA'}
        {zoom === 'month' && 'O'}
      </DropdownMenuTrigger>
      <DropdownMenuContent className='min-w-[220px] bg-white rounded-md overflow-hidden p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)]'>
        <DropdownMenuLabel>
          {label}, Outpatient Appointment (OPA)
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className={itemStyle}
          onClick={handleAppointmentCancelation}
        >
          Cancel OPA
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuLabel className='text-xs text-red-500'>
          Layering events for a given doctor
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {!dangerZone.isOnVacation && (
          <DropdownMenuItem
            className={cn(itemStyle, busyItemStyle)}
            onClick={handleVacationSheet}
          >
            <SheetTrigger>Send on vacation</SheetTrigger>
          </DropdownMenuItem>
        )}
        {!dangerZone.isOnTrip && (
          <DropdownMenuItem
            className={cn(itemStyle, busyItemStyle)}
            onClick={handleTripSheet}
          >
            <SheetTrigger>Send on business trip</SheetTrigger>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AppointmentContextMenu;
