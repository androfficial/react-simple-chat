import React from "react";
import AppContext from "../../context/context";
import SimpleBar from "simplebar-react";

import { PostingForm, Message } from "../";

import "simplebar/dist/simplebar.min.css";
import s from "./s.module.scss";

const Messages = () => {
  const { messages, userName } = React.useContext(AppContext);

  const scrollableNodeRef = React.createRef(null);

  React.useEffect(() => {
    const currentScrollEl = scrollableNodeRef.current;
    const getElHeight = currentScrollEl.scrollHeight;

    currentScrollEl.scroll(0, getElHeight);
  }, [messages]);

  return (
    <div className={s.messages}>
      <div className={s.content}>
        <SimpleBar
          // forceVisible="y"
          // autoHide={false}
          scrollableNodeProps={{
            ref: scrollableNodeRef
          }}
          style={{
            flex: "1 1 auto",
            height: "100%",
            overflowY: "auto",
          }}
        >
          <ul className={s.messages_list}>
            {messages.map((obj, index) => (
              <Message
                key={`${obj.userName}_${index}`}
                myName={userName}
                {...obj}
              />
            ))}
          </ul>
        </SimpleBar>
        <PostingForm />
      </div>
    </div>
  );
};

export default Messages;