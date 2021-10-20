import React from "react";

import s from "./s.module.scss";

const Message = ({ text, userName, myName }) => {
  return (
    <li className={s.messages__item}>
      <span className={s.author}>{userName === myName ? "Me" : userName}</span>
      <p className={s.message}>{text}</p>
    </li>
  );
};

export default Message;