import React from "react";
import AppContext from "./context/context";

import socket, { Types } from "./socket/socket";
import { chatAPI } from "./api/api";

import chat, {
  joined,
  setData,
  setUsers,
  setMessage,
} from "./state/reducers/chat";

import { JoinForm, Chat } from "./components";

import s from "./App.module.scss";

const App = () => {
  const [state, dispatch] = React.useReducer(chat, {
    isLoading: false,
    joined: false,
    roomId: null,
    userName: null,
    users: [],
    messages: [],
  });

  const addMessage = (message) => {
    dispatch(setMessage(message));
  };

  React.useEffect(() => {
    socket.on(Types.SET_USERS, (users) => {
      dispatch(setUsers(users));
    });
    socket.on(Types.NEW_MESSAGE, addMessage);
  }, []);

  const onLogin = async (obj) => {
    dispatch(joined(obj));
    socket.emit(Types.ROOM_JOIN, obj);
    const { data } = await chatAPI.getRoomData(obj.roomId);
    dispatch(setData(data));
  };

  return (
    <AppContext.Provider
      value={{
        users: state.users,
        roomId: state.roomId,
        userName: state.userName,
        messages: state.messages,
        onAddMessage: addMessage,
      }}
    >
      <div className={s.lite_chat_shell}>
        {!state.joined ? <JoinForm dispatch={dispatch} isLoading={state.isLoading} onLogin={onLogin} /> : <Chat />}
      </div>
    </AppContext.Provider>
  );
};

export default App;