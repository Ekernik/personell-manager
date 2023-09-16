import React, { forwardRef, ElementRef, ComponentPropsWithoutRef } from 'react';
import { Item } from '@radix-ui/react-dropdown-menu';

const MenuItem = forwardRef<
  ElementRef<typeof Item>,
  ComponentPropsWithoutRef<typeof Item> & {
    inset?: boolean;
  }
>(({ className, inset, ...props }, ref) => (
  <Item
    ref={ref}
    className={`relative flex cursor-default select-none items-center px-3 py-2 m-1 text-sm outline-none transition-colors focus:bg-slate-100 hover:cursor-pointer data-[disabled]:pointer-events-none rounded-md data-[disabled]:opacity-50 ${className}`}
    {...props}
  />
));

MenuItem.displayName = Item.displayName;

export default MenuItem;
