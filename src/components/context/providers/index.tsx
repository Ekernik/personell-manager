'use client';

import { FC, PropsWithChildren } from 'react';
import EventsProvider from './EventsProvider';
import DoctorsProvider from './DoctorsProvider';

const Providers: FC<PropsWithChildren> = ({ children }) => {
  return (
    <DoctorsProvider>
      <EventsProvider>{children}</EventsProvider>
    </DoctorsProvider>
  );
};

export default Providers;
