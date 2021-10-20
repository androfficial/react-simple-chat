import React from "react";

import s from "./s.module.scss";

const User = ({ name }) => {
  return (
    <li className={s.users_item}>
      <p className={s.users__name}>{name}</p>
    </li>
  );
};

export default User;