'use client';

import React, { FC, PropsWithChildren, useEffect, useState } from 'react';
import EventsContext from '../eventsContext';
import { useSession } from 'next-auth/react';
import { User } from '@/types/user';

const EventsProvider: FC<PropsWithChildren> = ({ children }) => {
  const [events, setEvents] = useState<any>([]);
  const { data: session } = useSession();
  const user = session?.user as User;

  const getAllEvents = async () => {
    // Try fetching data
    try {
      const response = await fetch('/api/events', {
        method: 'GET',
        headers: {
          task: 'get_all',
        },
      });
      const responseData = await response.json();
      const { status, data } = responseData;

      // If server responded with status (OK)
      if (status === 200) {
        const temp: any[] = [];

        // Push each event to our temp array
        data.forEach((event: any, i: number) => {
          temp.push({
            ...event,
            vacation: JSON.parse(event.vacation),
            appointments: JSON.parse(event.appointments),
            trips: JSON.parse(event.trips),
          });

          // If we reached last event then update our Event State
          if (i == data.length - 1) {
            setEvents(temp);
          }
        });
      }

      // Catch error if something went wrong during fetch
    } catch (err) {
      console.log('ERROR fetching data: ', err);
    }
  };

  useEffect(() => {
    // Fetch all events and update Events State every time user changes (Logges in)
    getAllEvents();

    // Start polling every 5 seconds
    const interval = setInterval(() => getAllEvents(), 5000);

    // Clean up the interval on component unmount
    return () => {
      clearInterval(interval);
    };
  }, [user]);

  return (
    <EventsContext.Provider value={[events, setEvents]}>
      {children}
    </EventsContext.Provider>
  );
};

export default EventsProvider;
