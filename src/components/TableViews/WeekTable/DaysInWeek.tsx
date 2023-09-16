import THeadItem from '@/components/ui/Table/THeadItem';
import { ViewFilterOptions } from '@/types/context';
import { useRouter } from 'next/navigation';
import React, { FC } from 'react';

interface Props {
  date: string;
  filter: ViewFilterOptions;
}

const DaysInWeek: FC<Props> = ({ date, filter }) => {
  const [year, month, day] = date.split('-');
  const router = useRouter();

  const getDayOfTheWeek = (day: string) => {
    const today = new Date(day);
    return today;
  };

  const handleInspectDay = (date: string) => {
    const url = new URLSearchParams({ date, filter }).toString();
    router.push(`/dashboard/day?${url}`);
  };

  let days: string[] = [];
  for (let i = 1; i <= 7; i++) {
    const [newYear, newMonth, newDay] = new Date(
      Number(year),
      Number(month) - 1,
      Number(day) + i
    )
      .toISOString()
      .split('T')[0]
      .split('-');

    days.push(`${newYear}-${newMonth}-${newDay}`);
  }

  return days.map((day, i) => {
    const weekDay = getDayOfTheWeek(day);

    return (
      <THeadItem
        key={i}
        className={`inline-flex p-0 flex-1 ${
          i >= 5 ? 'bg-red-50 border-red-200 text-red-900' : ''
        }`}
      >
        <span
          className='cursor-pointer flex justify-center items-center py-2 w-full h-full rounded hover:bg-teal-200 hover:text-teal-900'
          onClick={() => handleInspectDay(day)}
        >
          {weekDay.toLocaleDateString('en-US', {
            day: '2-digit',
            weekday: 'short',
          })}
        </span>
      </THeadItem>
    );
  });
};

export default DaysInWeek;
