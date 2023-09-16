'use client';

import React, { useContext } from 'react';
import OnDuty from './OnDuty';
import OnVacation from './OnVacation';
import OnTrip from './OnTrip';
import OnAppointment from './OnAppointment';
import OnJob from './OnJob';
import { DoctorsContext, EventsContext } from '@/components/context';

interface Props {
  date: string;
}

const DayTable = ({ date }: Props) => {
  const selectedDate = new Date(date).toLocaleDateString('en-US', {
    dateStyle: 'full',
  });
  const [events] = useContext(EventsContext);
  const [doctors] = useContext(DoctorsContext);

  const dayEvents = events.find((event: any) => event.date === date);

  const doctorOnDuty = doctors.find(
    (doctor) => doctor.username === dayEvents?.duty
  );
  const doctorsOnVacation = doctors.filter((doctor) =>
    dayEvents?.vacation?.includes(doctor.username)
  );
  const doctorsOnTrip = doctors.filter((doctor) =>
    dayEvents?.trips?.hasOwnProperty(doctor.username)
  );
  const doctorsOnAppointments = doctors.filter((doctor) =>
    dayEvents?.appointments?.hasOwnProperty(doctor.username)
  );
  const doctorsOnJob = doctors.filter(
    (doc) =>
      doc.doctor_id !== doctorOnDuty?.username &&
      !dayEvents?.vacation?.includes(doc.username) &&
      !dayEvents?.trips?.hasOwnProperty(doc.username) &&
      !dayEvents?.appointments?.hasOwnProperty(doc.username)
  );

  return (
    <section className='p-8 border border-slate-200 rounded-md'>
      <h1 className='text-3xl font-bold text-center'>{selectedDate}</h1>
      <div className='flex justify-between gap-8 my-9'>
        <OnJob doctors={doctorsOnJob} />
        <div className='min-w-max flex-1 flex flex-col gap-9'>
          <OnDuty doctor={doctorOnDuty} />
          <OnAppointment
            doctors={doctorsOnAppointments}
            appointments={dayEvents?.appointments}
          />
        </div>
        <div className='min-w-max flex-1 flex flex-col gap-9'>
          <OnVacation doctors={doctorsOnVacation} />
          <OnTrip
            doctors={doctorsOnTrip}
            trips={dayEvents?.trips}
          />
        </div>
      </div>
    </section>
  );
};

export default DayTable;
