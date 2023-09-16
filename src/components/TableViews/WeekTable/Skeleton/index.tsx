import React, { FC } from 'react';
import Row from './Row';
import TableHead from './TableHead';

const WeekSkeleton: FC = () => {
  const rows = new Array(9).fill('');

  return (
    <section className='border rounded-lg border-slate-400 bg-white w-full'>
      <TableHead days={7} />
      {rows.map((_, i) => (
        <Row
          days={7}
          key={i}
        />
      ))}
    </section>
  );
};

export default WeekSkeleton;
