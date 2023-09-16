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
  filter: ViewFilterOptions;
  doctors: Doctor[];
  doc_username: string;
  setSheetState: SetSheetState;
}

const Events: FC<Props> = ({
  date,
  filter,
  doctors,
  doc_username,
  setSheetState,
}) => {
  const [year, month, day] = date.split('-');
  const { data: session } = useSession();
  const user = session?.user as User;

  const isAdmin = ['admin', 'master'].includes(user?.role);
  const zoom = usePathname().split('/')[2] as ZoomFilterOptions;
  const [_events] = useContext(EventsContext);

  let dates: string[] = [];
  for (let i = 1; i <= 7; i++) {
    const date = new Date(Number(year), Number(month) - 1, Number(day) + i);
    dates.push(date.toISOString().split('T')[0]);
  }

  const foundDoctor = doctors.find((doc) => doc.username === doc_username)!;

  return dates.map((date, i) => {
    const events: any | undefined = _events.find(
      (event: any) => event.date === date
    );

    const isOnDuty = events?.duty === doc_username;
    const isOnVacation = events?.vacation?.includes(doc_username);
    const isOnAppointment = events?.appointments?.hasOwnProperty(doc_username);
    const isOnTrip = events?.trips?.hasOwnProperty(doc_username);
    const tripIsInPlanning =
      isOnTrip && events.trips[doc_username].is_in_planning;
    const dangerZone = { isOnDuty, isOnVacation, isOnAppointment, isOnTrip };

    return (
      <TData
        key={date}
        className={`flex px-0 py-0 flex-1 justify-center items-center ${
          i >= 5 && 'bg-red-50 border-red-200 text-red-900'
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
            'Дежурство'
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
            'Отпуск'
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
            'Амб. приём'
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
            'Командировка'
          ))}

        {!isOnDuty &&
          !isOnVacation &&
          !isOnTrip &&
          !isOnAppointment &&
          (isAdmin ? (
            <EmptyContextMenu
              date={date}
              doctor={foundDoctor}
              setSheetState={setSheetState}
            />
          ) : (
            <div></div>
          ))}
      </TData>
    );
  });
};

export default Events;
