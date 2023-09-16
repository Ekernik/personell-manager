import React, { FC, HTMLAttributes } from 'react';

const TRow: FC<HTMLAttributes<HTMLTableRowElement>> = ({
  children,
  className,
}) => {
  return (
    <tr className={`m-0 p-0 even:bg-slate-100 ${className}`}>
      {children}
    </tr>
  );
};

export default TRow;
