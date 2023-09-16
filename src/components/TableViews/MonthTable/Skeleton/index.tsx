import React, { FC } from 'react';
import Row from './Row';
import TableHead from './TableHead';

const MonthSkeleton: FC = () => {
  const rows = new Array(9).fill('');

  return (
    <section className='border rounded-lg border-slate-400 bg-white w-full'>
      <TableHead days={30} />
      {rows.map((_, i) => (
        <Row
          days={30}
          key={i}
        />
      ))}
    </section>
  );
};

export default MonthSkeleton;
