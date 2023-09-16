import React, { FC, PropsWithChildren, useContext } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/DropdownMenu';
import { ZoomFilterOptions } from '@/types/context';
import { removeDuty } from '@/helpers/duty';
import { EventsContext } from '../context';

interface Props extends PropsWithChildren {
  date: string;
  zoom: ZoomFilterOptions;
  events: any;
}

const itemStyle =
  'group data-[disabled]:text-slate-300 relative flex select-none items-center px-3 py-2 m-1 text-sm outline-none transition-colors focus:bg-slate-100 hover:cursor-pointer data-[disabled]:pointer-events-none rounded-md data-[disabled]:opacity-50 leading-none data-[state=open]:bg-slate-200 data-[highlighted]:data-[state=open]:bg-slate-100';

const DropdownDutyMenu: FC<Props> = ({ date, zoom, events }) => {
  const [_, setEvents] = useContext(EventsContext);
  const label = new Date(date).toLocaleDateString('en-US', {
    day: '2-digit',
    month: 'short',
  });

  const handleRemove = () => {
    removeDuty(date, events, setEvents);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className='w-full h-full flex justify-center items-center rounded select-none text-center outline-none hover:bg-teal-100 hover:text-teal-900 focus:bg-teal-50 focus:text-teal-900'>
        {zoom === 'week' && 'Duty'}
        {zoom === 'month' && 'D'}
      </DropdownMenuTrigger>
      <DropdownMenuContent className='min-w-[220px] bg-white rounded-md overflow-hidden p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)]'>
        <DropdownMenuLabel>{label}, duty</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className={itemStyle}
          onClick={handleRemove}
        >
          Cancel duty
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropdownDutyMenu;
