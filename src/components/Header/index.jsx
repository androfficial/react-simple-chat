import React from 'react';
import AppContext from '../../context/context';

import Button from '@mui/material/Button';

import s from './s.module.scss';

const Header = () => {
  const { onLeave } = React.useContext(AppContext);

  return (
    <div className={s.header}>
      <div className={s.left}>
        <img src="images/smile.png" alt="Smile" />
        <h2 className={s.title}>ChaTiKo</h2>
      </div>
      <div className={s.right}>
        <Button onClick={onLeave} variant="contained" sx={{ textTransform: 'capitalize' }}>
          Leave Room
        </Button>
      </div>
    </div>
  );
};

export default Header;