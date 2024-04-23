import React from 'react';
import { Button } from './ui/button';

const MainNav = () => {
  return (
    /* 变体=幽灵:removes most of the Styles */
    <Button
      variant="ghost"
      className='font-bold hover:text-orange-500 hover:bg-white'
    >
      Log In
    </Button>
  );
};

export default MainNav;