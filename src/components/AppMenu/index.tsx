'use client';

import React, { FC } from 'react';
import * as RadixDropdownMenu from '@radix-ui/react-dropdown-menu';
import { HamburgerMenuIcon } from '@radix-ui/react-icons';
import Menu from './Menu';

const App: FC = () => {
  return (
    <RadixDropdownMenu.Root>
      <RadixDropdownMenu.Trigger asChild>
        <button
          className='rounded-md w-[42px] h-[42px] inline-flex items-center justify-center text-slate-900 bg-white border border-slate-200 outline-none hover:border-slate-500 transition focus:ring-2 ring-offset-2'
          aria-label='App menu'
        >
          <HamburgerMenuIcon
            width={20}
            height={20}
          />
        </button>
      </RadixDropdownMenu.Trigger>

      <Menu />
    </RadixDropdownMenu.Root>
  );
};

export default App;
