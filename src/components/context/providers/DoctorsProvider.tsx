'use client';

import React, { FC, PropsWithChildren, useEffect, useState } from 'react';
import { DoctorsContext } from '..';
import { useSession } from 'next-auth/react';
import { User } from '@/types/user';

const DoctorsProvider: FC<PropsWithChildren> = ({ children }) => {
  const [doctors, setDoctors] = useState<any>([]);
  const { data: session } = useSession();

  const user = session?.user as User;

  const getAllDoctors = async () => {
    const res = await fetch('/api/doctors', {
      method: 'GET',
    });
    res.json().then((json) => setDoctors(json));
  };

  useEffect(() => {
    getAllDoctors();
  }, [user]);

  return (
    <DoctorsContext.Provider value={[doctors, setDoctors]}>
      {children}
    </DoctorsContext.Provider>
  );
};

export default DoctorsProvider;
