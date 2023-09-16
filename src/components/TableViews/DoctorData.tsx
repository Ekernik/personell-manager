import React, { FC } from 'react';
import { OS_on, OS_off, A1_on, A1_off, A2_on, A2_off } from '@/components/svg/';
import Doctor from '@/types/doctor';
import TData from '../ui/Table/TData';
import Image from 'next/image';

interface Props {
  doctor: Doctor;
}

const DoctorData: FC<Props> = ({ doctor }) => {
  return (
    <TData className='flex justify-between items-center gap-8 w-[310px] px-4 py-1.5 text-slate-700'>
      <span>
        {doctor.lastname} {doctor.firstname[0]}.{doctor.middlename[0]}.
      </span>
      <span className='flex gap-4 justify-between items-center'>
        <Image
          src={doctor.is_surgeon === 1 ? OS_on : OS_off}
          alt={'Operating surgeon'}
          className='w-5.5 h-5.5'
        />

        <Image
          src={doctor.is_first_assistant === 1 ? A1_on : A1_off}
          alt={'1st surgical assistant'}
          className='w-5 h-5'
        />

        <Image
          src={doctor.is_second_assistant === 1 ? A2_on : A2_off}
          alt={'2nd surgical assistant'}
          className='w-5 h-5'
        />
      </span>
    </TData>
  );
};

export default DoctorData;
