'use client';

import React, { FC } from 'react';
import { Portal, Content } from '@radix-ui/react-dropdown-menu';
import MenuLabel from '@/components/ui/Menu/Label';
import { Separator } from '@/components/ui/Separator';
import MenuItem from '@/components/ui/Menu/Item';
import { ExitIcon } from '@radix-ui/react-icons';
import { User } from '@/types/user';
import { signOut, useSession } from 'next-auth/react';

const Menu: FC = () => {
  const { data: session } = useSession();
  const user = session?.user as User;

  const isAdmin = ['admin', 'master'].includes(user?.role);
  const isMaster = user?.role === 'master';

  const handleLogout = () => signOut();

  const handleDownload = async () => {
    const response = await fetch('/api/download');

    if (!response.ok) {
      console.error('Fetch error');
      return;
    }

    const blob = await response.blob();
    const url = URL.createObjectURL(blob);

    const downloadLink = document.createElement('a');
    downloadLink.href = url;
    downloadLink.download = 'database.db';
    downloadLink.click();

    // Clean up the temporary URL
    URL.revokeObjectURL(url);
  };

  return (
    <Portal>
      <Content
        className='w-[224px] ml-8 bg-white rounded-md shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade'
        sideOffset={5}
      >
        <MenuLabel className='flex justify-between'>
          <span>{user?.username}</span>
          <span className='text-slate-400'>{isAdmin ? 'Admin' : 'Guest'}</span>
        </MenuLabel>
        <Separator />
        <MenuItem disabled={true}>Settings</MenuItem>
        {isMaster && (
          <MenuItem onClick={handleDownload}>Export database</MenuItem>
        )}
        <Separator />
        <MenuItem onClick={handleLogout}>
          <ExitIcon className='mr-2 h-4 w-4' />
          <span>Logout</span>
        </MenuItem>
        <Separator />
        <MenuItem disabled>Version 1.0.0</MenuItem>
      </Content>
    </Portal>
  );
};

export default Menu;
