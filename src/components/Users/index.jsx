import React from 'react';
import AppContext from '../../context/context';
import SimpleBar from 'simplebar-react';

import ForumIcon from '@mui/icons-material/Forum';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';

import { User } from '../';

import 'simplebar/dist/simplebar.min.css';
import s from './s.module.scss';

const Users = () => {
  const { users, roomId } = React.useContext(AppContext);

  return (
    <div className={s.users}>
      <div className={s.body}>
        <div className={s.current_room_shell}>
          <ForumIcon style={{ color: 'white' }} fontSize="small"></ForumIcon>
          <span className={s.current_room}>Room: {roomId}</span>
        </div>
        <div className={s.total_users_online_shell}>
          <PeopleAltIcon style={{ color: 'white' }} fontSize="small"></PeopleAltIcon>
          <span className={s.total_users_online}>Online ({users.length}):</span>
        </div>
        <div className={s.users_list_shell}>
          <SimpleBar
            style={{
              height: '100%',
              overflowY: 'auto',
            }}>
            <ul className={s.users_list}>
              {users.map((name, index) => (
                <User name={name} key={`${name}_${index}`} />
              ))}
            </ul>
          </SimpleBar>
        </div>
      </div>
    </div>
  );
};

export default Users;