import React from "react";

import { Messages, Users } from "../";

import s from "./s.module.scss";

const Chat = () => {
  return (
    <div className={s.chat}>
      <Users />
      <Messages />
    </div>
  );
};

export default Chat;