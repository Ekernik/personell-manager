import React, { FC, PropsWithChildren, useContext, useState } from 'react';
import Doctor from '@/types/doctor';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/DropdownMenu';
import { ZoomFilterOptions } from '@/types/context';
import { SheetTrigger } from '../ui/sheet';
import { SetSheetState } from '@/types/sheetState';
import { cn } from '@/lib/utils';
import { approveTrip, planTrip } from '@/helpers/trip';
import { EventsContext } from '../context';

interface Props extends PropsWithChildren {
  date: string;
  doctor: Doctor;
  zoom: ZoomFilterOptions;
  setSheetState: SetSheetState;
  dangerZone: any;
  isPlanningStage: boolean;
}

const itemStyle =
  'group data-[disabled]:text-slate-300 relative flex select-none items-center px-3 py-2 m-1 text-sm outline-none transition-colors hover:cursor-pointer data-[disabled]:pointer-events-none rounded-md data-[disabled]:opacity-50 leading-none';

const busyItemStyle =
  'bg-red-100 text-red-400 focus:bg-red-200 focus:text-red-600 data-[state=open]:bg-red-200 data-[highlighted]:data-[state=open]:bg-red-100';

const dangerStyle =
  'bg-red-600 text-red-50 focus:bg-red-600 focus:text-red-50 hover:bg-red-700 hover:text-red-100 rounded-none';

const isInPlanninStageStyle =
  'bg-orange-200 text-orange-600 focus:bg-orange-200 focus:text-orange-600 hover:bg-orange-300 hover:text-orange-700 rounded-none';

const TripContextMenu: FC<Props> = ({
  date,
  doctor,
  zoom,
  setSheetState,
  dangerZone,
  isPlanningStage,
}) => {
  const [events, setEvents] = useContext(EventsContext);
  const label = new Date(date).toLocaleDateString('en-US', {
    day: '2-digit',
    month: 'short',
  });

  const openTripCancelationSheet = () => {
    setSheetState({
      dialog: 'trip-remove',
      eventDate: date,
      prevDoctorID: '',
      selectedDoctorID: doctor.doctor_id,
    });
  };

  const handleAppointmentSheet = async () => {
    setSheetState({
      dialog: 'appointment',
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

  const handleApproveTrip = () => {
    approveTrip(date, doctor, events, setEvents);
  };

  const handlePlanTrip = () => {
    planTrip(date, doctor, events, setEvents);
  };

  const isDanger = dangerZone.isOnAppointment || dangerZone.isOnVacation;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn(
          'w-full h-full flex justify-center items-center rounded select-none text-center outline-none hover:bg-teal-100 hover:text-teal-900 focus:bg-teal-50 focus:text-teal-900',
          isDanger && dangerStyle,
          isPlanningStage && isInPlanninStageStyle
        )}
      >
        {zoom === 'week' && 'Business trip'}
        {zoom === 'month' && 'B'}
      </DropdownMenuTrigger>
      <DropdownMenuContent className='min-w-[220px] bg-white rounded-md overflow-hidden p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)]'>
        <DropdownMenuLabel className={cn(isPlanningStage && 'text-orange-600')}>
          {label}, business trip
        </DropdownMenuLabel>
        <DropdownMenuLabel
          className={cn('text-xs', isPlanningStage && 'text-orange-600')}
        >
          {isPlanningStage ? 'At the planning stage' : 'Business trip approved'}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {isPlanningStage ? (
          <DropdownMenuItem
            className={itemStyle}
            onClick={handleApproveTrip}
          >
            Approve business trip
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem
            className={itemStyle}
            onClick={handlePlanTrip}
          >
            Move to the planning stage
          </DropdownMenuItem>
        )}
        <SheetTrigger asChild>
          <DropdownMenuItem
            className={itemStyle}
            onClick={openTripCancelationSheet}
          >
            Cancel business trip
          </DropdownMenuItem>
        </SheetTrigger>
        <DropdownMenuSeparator />
        <DropdownMenuLabel className='text-xs text-red-500'>
          Layering events for a given doctor
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {!dangerZone.isOnAppointment && (
          <DropdownMenuItem
            className={cn(itemStyle, busyItemStyle)}
            onClick={handleAppointmentSheet}
          >
            <SheetTrigger>Schedule outpatient appointment</SheetTrigger>
          </DropdownMenuItem>
        )}
        {!dangerZone.isOnVacation && (
          <DropdownMenuItem
            className={cn(itemStyle, busyItemStyle)}
            onClick={handleVacationSheet}
          >
            <SheetTrigger>Send on vacation</SheetTrigger>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default TripContextMenu;
