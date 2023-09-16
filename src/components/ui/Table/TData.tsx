import React, { FC, HTMLAttributes } from 'react';

const TData: FC<HTMLAttributes<HTMLTableCellElement>> = ({
  children,
  className,
}) => {
  return (
    <td
      className={`border font-semibold text-left [&[align=center]]:text-center [&[align=right]]:text-right ${className}`}
    >
      {children}
    </td>
  );
};

export default TData;
