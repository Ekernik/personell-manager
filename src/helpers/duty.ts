import Doctor from '@/types/doctor';
import { Dispatch, SetStateAction } from 'react';

export const createDuty = async (
  date: string,
  doctor: Doctor,
  events: any,
  setEvents: Dispatch<SetStateAction<any>> | null
) => {
  const _date = date;

  const isNewEvent = events ? Object.keys(events).length === 1 : true;

  setEvents!((prev: any) => {
    const newEvents = prev.filter((_events: any) => _events.date !== _date);
    const newEvent = { ...events, duty: doctor.username };
    newEvents.push(newEvent);

    return newEvents;
  });

  const headers = {
    task: isNewEvent ? 'create_duty' : 'update_duty',
    data: doctor.username,
    datum: _date,
  };

  await fetch('/api/events', {
    method: 'PUT',
    headers,
  }).then((res) => res.json());
};

export const removeDuty = async (
  date: string,
  event: any,
  setEvents: Dispatch<SetStateAction<any>> | null
) => {
  const _date = date;

  setEvents!((prev: any[]) => {
    const newEvents = [
      ...prev.filter((event: any) => event.date !== _date),
      { ...event, duty: null },
    ];

    return newEvents;
  });

  const headers = {
    task: 'update_duty',
    data: '',
    datum: _date,
  };

  await fetch('/api/events', {
    method: 'PUT',
    headers,
  }).then((res) => res.json());
};
