'use client';

import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import s from './BottomNav.module.css';

export default function BottomNav() {
  const router = useRouter();
  const [value, setValue] = useState('Recents');

  return (
    <div className={s.bottomNav}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
          router.push(newValue);
        }}
      >
        <BottomNavigationAction label="Home" icon={<HomeIcon />} value="/" />
        <BottomNavigationAction
          label="Recipes"
          icon={<LocalDiningIcon />}
          value="/recipes"
        />
        <BottomNavigationAction
          label="Account"
          icon={<PersonIcon />}
          value="/account"
        />
      </BottomNavigation>
    </div>
  );
}
