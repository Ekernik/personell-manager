import { Dispatch, SetStateAction } from 'react';

export type DialogState =
  | 'duty'
  | 'appointment'
  | 'trip'
  | 'trip-remove'
  | 'vacation'
  | 'vacation-remove';

export type SetSheetState = Dispatch<
  SetStateAction<{
    dialog: DialogState;
    eventDate: string;
    prevDoctorID: string;
    selectedDoctorID: string;
  }>
>;
