import Doctor from '@/types/doctor';
import { Dispatch, SetStateAction, createContext } from 'react';

const DoctorsContext = createContext<
  [Doctor[], Dispatch<SetStateAction<Doctor[]>> | null]
>([[], null]);

export default DoctorsContext;
