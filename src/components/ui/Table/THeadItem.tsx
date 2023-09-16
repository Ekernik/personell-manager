import React, { FC, HTMLAttributes } from 'react';

const THeadItem: FC<HTMLAttributes<HTMLTableCellElement>> = ({
  children,
  className,
}) => {
  return (
    <th
      className={`border text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right min-w-[17px] ${className}`}
    >
      {children}
    </th>
  );
};

export default THeadItem;
