import React from "react";

import { Header, Messages, Users } from "../";

import s from "./s.module.scss";

const Chat = () => {
  return (
    <div className={s.chat}>
      <Header />
      <Users />
      <Messages />
    </div>
  );
};

export default Chat;