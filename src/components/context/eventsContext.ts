import { Dispatch, SetStateAction, createContext } from 'react';

const EventsContext = createContext<
  [any, Dispatch<SetStateAction<any>> | null]
>([null, null]);

export default EventsContext;
