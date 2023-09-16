import { Dispatch, SetStateAction } from 'react';
import Doctor from '@/types/doctor';

export const createVacation = (
  start_date: string,
  event_length: number,
  doctor: Doctor,
  events: any[],
  setEvents: Dispatch<SetStateAction<any>> | null
) => {
  for (let i = 0, currentDate = start_date; i < event_length; i++) {
    let _date = new Date(currentDate);

    let newEvent: any = events.find((event: any) => event.date === currentDate);
    const isNewEvent = typeof newEvent === 'undefined';
    if (isNewEvent) newEvent = { date: currentDate, vacation: [] };

    newEvent.vacation =
      !isNewEvent && newEvent?.vacation
        ? [...newEvent?.vacation, doctor.username]
        : [doctor.username];

    const headers = {
      task: isNewEvent ? 'create_vacation' : 'update_vacation',
      data: encodeURIComponent(JSON.stringify(newEvent.vacation)),
      datum: currentDate,
    };

    fetch('/api/events', {
      method: 'PUT',
      headers,
    }).then((res) => res.json());

    const newEvents = events.filter((event: any) => event.date !== currentDate);
    newEvents.push(newEvent);
    setEvents!(newEvents);

    if (!(i === event_length - 1)) {
      _date.setDate(_date.getDate() + 1);
      const nextDate = _date.toISOString().split('T')[0];

      currentDate = nextDate;
    }
  }
};

export const removeVacation = (
  start_date: string,
  doctor: Doctor,
  events: any[],
  setEvents: Dispatch<SetStateAction<any>> | null
) => {
  let currentDate = start_date;
  let duration: string[] = [];

  while (true) {
    let _date = new Date(currentDate);

    const foundEvent = events.find((event: any) => event.date === currentDate);

    if (!foundEvent?.vacation?.includes(doctor.username)) break;

    duration.push(currentDate);

    _date.setDate(_date.getDate() + 1);
    const nextDate = _date.toISOString().split('T')[0];

    currentDate = nextDate;
  }

  for (let i = 0; i < duration.length; i++) {
    const foundEvent = events.find((event: any) => event.date === duration[i]);

    const filteredEvent = foundEvent.vacation.filter(
      (doc: string) => doc !== doctor.username
    );

    setEvents!((prev: any) => {
      const newEvents = prev.filter((event: any) => event.date !== duration[i]);

      newEvents.push({ ...foundEvent, vacation: filteredEvent });

      return newEvents;
    });

    const headers = {
      task: 'update_vacation',
      data: encodeURIComponent(JSON.stringify(filteredEvent)),
      datum: duration[i],
    };

    fetch('/api/events', {
      method: 'PUT',
      headers,
    }).then((res) => res.json());
  }
};
