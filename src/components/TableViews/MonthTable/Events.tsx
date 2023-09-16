import {
  AppointmentContextMenu,
  DutyContextMenu,
  EmptyContextMenu,
  TripContextMenu,
  VacationContextMenu,
} from '@/components/CellActions';
import { EventsContext } from '@/components/context';
import TData from '@/components/ui/Table/TData';
import { ViewFilterOptions, ZoomFilterOptions } from '@/types/context';
import Doctor from '@/types/doctor';
import { SetSheetState } from '@/types/sheetState';
import { User } from '@/types/user';
import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import React, { FC, useContext } from 'react';

interface Props {
  date: string;
  doc_username: string;
  doctors: Doctor[];
  filter: ViewFilterOptions;
  setSheetState: SetSheetState;
}

const Events: FC<Props> = ({
  date,
  doc_username,
  doctors,
  filter,
  setSheetState,
}) => {
  let dates: string[] = [];
  const [year, month] = date.split('-');
  const [_events] = useContext(EventsContext);
  const { data: session } = useSession();
  const user = session?.user as User;
  const isAdmin = ['admin', 'master'].includes(user?.role);
  const zoom = usePathname().split('/')[2] as ZoomFilterOptions;

  const getDaysInMonth = () => {
    return new Date(Number(year), Number(month), 0).getDate();
  };

  const _date = new Date(date);
  for (let i = 0, x = getDaysInMonth(); i < x; i++) {
    _date.setDate(i + 1);
    dates.push(_date.toISOString().split('T')[0]);
  }

  const getDayOfTheWeek = (day: string) => {
    const today = new Date(day);
    return today.getDay();
  };

  const foundDoctor = doctors.find((doc) => doc.username === doc_username)!;

  return dates.map((date) => {
    const weekDay = getDayOfTheWeek(date);

    const events: any | undefined = _events?.find(
      (event: any) => event.date === date
    );

    const isOnDuty = events?.duty === doc_username;
    const isOnVacation = events?.vacation?.includes(doc_username);
    const isOnAppointment = events?.appointments?.hasOwnProperty(doc_username);
    const isOnTrip = events?.trips?.hasOwnProperty(doc_username);
    const tripIsInPlanning =
      isOnTrip && events.trips[doc_username].is_in_planning;
    const dangerZone = {
      isOnDuty,
      isOnVacation,
      isOnAppointment,
      isOnTrip,
    };

    return (
      <TData
        key={date}
        className={`flex px-0 py-0 flex-1 justify-center items-center ${
          (weekDay >= 6 || weekDay == 0) &&
          'bg-red-50 border-red-200 text-red-900'
        }`}
      >
        {isOnDuty &&
          ['all', 'duty'].includes(filter) &&
          (isAdmin ? (
            <DutyContextMenu
              date={date}
              zoom={zoom}
              events={events}
            />
          ) : (
            'Д'
          ))}

        {isOnVacation &&
          ['all', 'vacations'].includes(filter) &&
          (isAdmin ? (
            <VacationContextMenu
              date={date}
              doctor={foundDoctor}
              zoom={zoom}
              setSheetState={setSheetState}
              dangerZone={dangerZone}
            />
          ) : (
            'О'
          ))}

        {isOnAppointment &&
          ['all', 'appointments'].includes(filter) &&
          (isAdmin ? (
            <AppointmentContextMenu
              date={date}
              doctor={foundDoctor}
              zoom={zoom}
              setSheetState={setSheetState}
              dangerZone={dangerZone}
            />
          ) : (
            'А'
          ))}

        {isOnTrip &&
          ['all', 'trips'].includes(filter) &&
          (isAdmin ? (
            <TripContextMenu
              date={date}
              doctor={foundDoctor}
              zoom={zoom}
              setSheetState={setSheetState}
              dangerZone={dangerZone}
              isPlanningStage={tripIsInPlanning}
            />
          ) : (
            'К'
          ))}

        {!isOnDuty &&
          !isOnVacation &&
          !isOnAppointment &&
          !isOnTrip &&
          (isAdmin ? (
            <EmptyContextMenu
              date={date}
              doctor={foundDoctor}
              setSheetState={setSheetState}
            />
          ) : (
            <div />
          ))}
      </TData>
    );
  });
};

export default Events;
