export const Types = {
  JOINED: "CHAT@JOINED",
  SET_LOADING: "CHAT@SET_LOADING",
  SET_USERS: "CHAT@SET_USERS",
  SET_DATA: "CHAT@SET_DATA",
  NEW_MESSAGE: "CHAT@NEW_MESSAGE",
};

export default (state, action) => {
  switch (action.type) {
    case Types.JOINED:
      return {
        ...state,
        roomId: action.payload.roomId,
        userName: action.payload.userName,
      };
    case Types.SET_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    case Types.SET_USERS:
      return {
        ...state,
        users: action.payload,
      };
    case Types.SET_DATA:
      return {
        ...state,
        users: action.payload.users,
        messages: action.payload.messages,
        isLoading: false,
        joined: true,
      };
    case Types.NEW_MESSAGE:
      return {
        ...state,
        messages: [...state.messages, action.payload],
      };
    default:
      return state;
  }
};

export const joined = (payload) => ({
  type: Types.JOINED,
  payload,
});

export const setLoading = (payload) => ({
  type: Types.SET_LOADING,
  payload,
});

export const setData = (payload) => ({
  type: Types.SET_DATA,
  payload,
});

export const setUsers = (payload) => ({
  type: Types.SET_USERS,
  payload,
});

export const setMessage = (payload) => ({
  type: Types.NEW_MESSAGE,
  payload,
});