import React, { FC } from 'react';
import Table from '@/ui/Table';
import TData from '@/ui/Table/TData';
import THeadItem from '@/ui/Table/THeadItem';
import TRow from '@/ui/Table/TRow';
import Doctor from '@/types/doctor';
import Image from 'next/image';
import { OS_on, OS_off, A1_on, A1_off, A2_on, A2_off } from '@/components/svg';

interface Props {
  doctors: Doctor[];
  appointments: any;
}

const OnAppointment: FC<Props> = ({ doctors, appointments }) => {
  return (
    <Table className='m-0'>
      <thead className='table-header-group bg-white'>
        <TRow>
          <THeadItem className='w-[310px] text-slate-900 px-4 py-2'>
            Conduct outpatient appointments
          </THeadItem>
        </TRow>
      </thead>
      <tbody className='bg-white'>
        {doctors.length < 1 ? (
          <TRow>
            <TData className='gap-8 w-[310px] px-4 py-1.5 text-slate-600'>
              <span>No OPA</span>
            </TData>
          </TRow>
        ) : (
          doctors.map((doctor) => (
            <TRow key={doctor.doctor_id}>
              <TData className='flex justify-between gap-8 px-4 py-1.5 text-slate-700'>
                <div className='flex flex-col'>
                  <span>
                    {doctor.lastname} {doctor.firstname[0]}.
                    {doctor.middlename[0]}.
                  </span>
                  <span className='text-xs text-slate-500'>
                    {appointments[doctor.username].location}
                  </span>
                  <span className='text-xs text-slate-500'>{`${
                    appointments[doctor.username].time.start
                  } - ${appointments[doctor.username].time.end}`}</span>
                </div>
                <span className='flex gap-4 justify-between items-center'>
                  {
                    <Image
                      src={doctor.is_surgeon ? OS_on : OS_off}
                      alt={'Operating surgeon'}
                      className='w-5.5 h-5.5'
                    />
                  }
                  {
                    <Image
                      src={doctor.is_first_assistant ? A1_on : A1_off}
                      alt={'1st surgical assistant'}
                      className='w-5 h-5'
                    />
                  }
                  {
                    <Image
                      src={doctor.is_second_assistant ? A2_on : A2_off}
                      alt={'2nd surgical assistant'}
                      className='w-5 h-5'
                    />
                  }
                </span>
              </TData>
            </TRow>
          ))
        )}
      </tbody>
    </Table>
  );
};

export default OnAppointment;
