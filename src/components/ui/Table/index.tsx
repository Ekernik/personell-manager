import React, { FC, HTMLAttributes } from 'react';

const Table: FC<HTMLAttributes<HTMLDivElement>> = ({ children }) => {
  return (
    <div className='w-full overflow-y-auto rounded-lg border border-slate-400'>
      <table className='w-full table-auto rounded-lg'>{children}</table>
    </div>
  );
};

export default Table;
