import THeadItem from '@/components/ui/Table/THeadItem';
import { ViewFilterOptions } from '@/types/context';
import { useRouter } from 'next/navigation';
import React, { FC } from 'react';

interface Props {
  date: string;
  filter: ViewFilterOptions;
}

const DaysInMonth: FC<Props> = ({ date, filter }) => {
  const [year, month] = date.split('-');
  const router = useRouter();
  const getDayOfTheWeek = (day: string) => {
    const today = new Date(day);
    return today.getDay();
  };

  const handleInspectDay = (date: string) => {
    const url = new URLSearchParams({ date, filter }).toString();
    router.push(`/dashboard/day?${url}`);
  };

  const getDaysInMonth = () => {
    return new Date(Number(year), Number(month), 0).getDate();
  };

  let days: string[] = [];
  for (let i = 1, x = getDaysInMonth(); i <= x; i++) {
    const day = i.toString().padStart(2, '0');
    days.push(`${year}-${month}-${day}`);
  }

  return days.map((day, i) => {
    const weekDay = getDayOfTheWeek(day);

    return (
      <THeadItem
        key={day}
        className={`inline-flex px-0 flex-1 ${
          weekDay! >= 6 || weekDay == 0
            ? 'bg-red-50 border-red-200 text-red-900'
            : ''
        }`}
      >
        <span
          className='cursor-pointer flex justify-center items-center py-2 w-full h-full rounded hover:bg-teal-100 hover:text-teal-900'
          onClick={() => handleInspectDay(day)}
        >
          {i + 1}
        </span>
      </THeadItem>
    );
  });
};

export default DaysInMonth;
