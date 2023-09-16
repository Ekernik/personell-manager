import { Dispatch, SetStateAction } from 'react';
import Doctor from '@/types/doctor';

export const createTrip = (
  start_date: string,
  event_length: number,
  is_in_planning: boolean,
  doctor: Doctor,
  city: string,
  events: any[],
  setEvents: Dispatch<SetStateAction<any>> | null
) => {
  for (let i = 0, currentDate = start_date; i < event_length; i++) {
    let _date = new Date(currentDate);

    let newEvent: any = events.find((event: any) => event.date === currentDate);
    const isNewEvent = typeof newEvent === 'undefined';
    if (isNewEvent) newEvent = { date: currentDate, trips: {} };

    newEvent.trips =
      !isNewEvent && newEvent?.trips
        ? { ...newEvent.trips, [doctor.username]: { city, is_in_planning } }
        : { [doctor.username]: { city, is_in_planning } };

    const headers = {
      task: isNewEvent ? 'create_trip' : 'update_trip',
      data: encodeURIComponent(JSON.stringify(newEvent.trips)),
      datum: currentDate,
    };

    fetch('/api/events', {
      method: 'PUT',
      headers,
    }).then((res) => res.json());

    const newEvents = events.filter((event: any) => event.date !== currentDate);
    newEvents.push(newEvent);
    setEvents!((prev: any) => newEvents);

    if (!(i === event_length - 1)) {
      _date.setDate(_date.getDate() + 1);
      const nextDate = _date.toISOString().split('T')[0];

      currentDate = nextDate;
    }
  }
};

export const cancelTrip = async (
  date: string,
  doctor: Doctor,
  events: any[],
  setEvents: Dispatch<SetStateAction<any>> | null
) => {
  let currentDate = date;
  let duration: string[] = [];

  while (true) {
    let _date = new Date(currentDate);

    const foundEvent = events.find((event: any) => event.date === currentDate);

    if (!(foundEvent?.trips && foundEvent?.trips[doctor.username])) break;

    duration.push(currentDate);

    _date.setDate(_date.getDate() + 1);
    const nextDate = _date.toISOString().split('T')[0];

    currentDate = nextDate;
  }

  for (let i = 0; i < duration.length; i++) {
    const foundEvent = events.find((event: any) => event.date === duration[i]);

    delete foundEvent.trips[doctor.username];

    setEvents!((prev: any) => {
      const newEvents = prev.filter((event: any) => event.date !== duration[i]);

      newEvents.push(foundEvent);

      return newEvents;
    });

    const headers = {
      task: 'update_trip',
      data: encodeURIComponent(JSON.stringify(foundEvent.trips)),
      datum: duration[i],
    };

    fetch('/api/events', {
      method: 'PUT',
      headers,
    }).then((res) => res.json());
  }
};

export const approveTrip = async (
  date: string,
  doctor: Doctor,
  events: any[],
  setEvents: Dispatch<SetStateAction<any>> | null
) => {
  let currentDate = date;
  let duration: string[] = [];

  while (true) {
    let _date = new Date(currentDate);

    const foundEvent = events.find((event: any) => event.date === currentDate);

    if (!(foundEvent?.trips && foundEvent?.trips[doctor.username])) break;

    duration.push(currentDate);

    _date.setDate(_date.getDate() + 1);
    const nextDate = _date.toISOString().split('T')[0];

    currentDate = nextDate;
  }

  for (let i = 0; i < duration.length; i++) {
    const foundEvent = events.find((event: any) => event.date === duration[i]);

    foundEvent.trips[doctor.username].is_in_planning = false;

    setEvents!((prev: any) => {
      const newEvents = prev.filter((event: any) => event.date !== duration[i]);

      newEvents.push(foundEvent);

      return newEvents;
    });

    const headers = {
      task: 'update_trip',
      data: encodeURIComponent(JSON.stringify(foundEvent.trips)),
      datum: duration[i],
    };

    fetch('/api/events', {
      method: 'PUT',
      headers,
    }).then((res) => res.json());
  }
};

export const planTrip = async (
  date: string,
  doctor: Doctor,
  events: any[],
  setEvents: Dispatch<SetStateAction<any>> | null
) => {
  let currentDate = date;
  let duration: string[] = [];

  while (true) {
    let _date = new Date(currentDate);

    const foundEvent = events.find((event: any) => event.date === currentDate);

    if (!(foundEvent?.trips && foundEvent?.trips[doctor.username])) break;

    duration.push(currentDate);

    _date.setDate(_date.getDate() + 1);
    const nextDate = _date.toISOString().split('T')[0];

    currentDate = nextDate;
  }

  for (let i = 0; i < duration.length; i++) {
    const foundEvent = events.find((event: any) => event.date === duration[i]);

    foundEvent.trips[doctor.username].is_in_planning = true;

    setEvents!((prev: any) => {
      const newEvents = prev.filter((event: any) => event.date !== duration[i]);

      newEvents.push(foundEvent);

      return newEvents;
    });

    const headers = {
      task: 'update_trip',
      data: encodeURIComponent(JSON.stringify(foundEvent.trips)),
      datum: duration[i],
    };

    fetch('/api/events', {
      method: 'PUT',
      headers,
    }).then((res) => res.json());
  }
};
