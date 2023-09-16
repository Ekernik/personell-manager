import Doctor from '@/types/doctor';
import { Dispatch, SetStateAction } from 'react';

export const createAppointment = (
  date: string,
  doctor: Doctor,
  time: { start: string; end: string },
  location: string,
  events: any,
  setEvents: Dispatch<SetStateAction<any>> | null
) => {
  const _date = date;

  const isNewEvent = Object.keys(events).length === 1;

  setEvents!((prev: any) => {
    const newEvents = prev.filter((event: any) => event.date !== _date);
    const newEvent = {
      ...events,
      appointments: {
        ...events.appointments,
        [doctor.username]: {
          time,
          location,
        },
      },
    };
    newEvents.push(newEvent);

    const headers = {
      task: isNewEvent ? 'create_appointment' : 'update_appointment',
      data: encodeURIComponent(JSON.stringify(newEvent.appointments)),
      datum: _date,
    };

    fetch('/api/events', {
      method: 'PUT',
      headers,
    }).then((res) => res.json());

    return newEvents;
  });
};

export const removeAppointment = (
  date: string,
  doctor: Doctor,
  events: any,
  setEvents: Dispatch<SetStateAction<any>> | null
) => {
  const _date = date;

  const event = events.find((e: any) => e.date === date);

  setEvents!((prev: any[]) => {
    const newEvent = { ...event };
    delete newEvent.appointments[doctor.username];

    const newEvents = [
      ...prev.filter((event: any) => event.date !== _date),
      { ...newEvent },
    ];

    const headers = {
      task: 'update_appointment',
      data: encodeURIComponent(JSON.stringify(newEvent.appointments)),
      datum: _date,
    };

    fetch('/api/events', {
      method: 'PUT',
      headers,
    }).then((res) => res.json());

    return newEvents;
  });
};
