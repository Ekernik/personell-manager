import React, { FC } from 'react';
import { Label } from '@radix-ui/react-dropdown-menu';

const MenuLabel = React.forwardRef<
  React.ElementRef<typeof Label>,
  React.ComponentPropsWithoutRef<typeof Label> & {
    inset?: boolean;
  }
>(({ className, inset, ...props }, ref) => (
  <Label
    ref={ref}
    className={`p-3 text-sm font-semibold ${className}`}
    {...props}
  />
));
MenuLabel.displayName = Label.displayName;

export default MenuLabel;
