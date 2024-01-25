const initialState = {
  chats: [],
  currentChat: null,
};

const chatsReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case "INIT_USER_CHATS":
      return (state = { ...state, chats: action.data });
    case "ADD_NEW_CHAT":
      return (state = { ...state, chats: state.chats.concat(action.data) });
    case "SELECTED_CHAT":
      console.log(action.data);
      //localStorage.setItem("currentChat", JSON.stringify(action.data));
      return (state = { ...state, currentChat: action.data });
    case "NULL_CURRENT":
      return (state = { ...state, currentChat: null });
    default:
      return state;
  }
};

export const setUsersChats = (data: any) => {
  return {
    type: "INIT_USER_CHATS",
    data,
  };
};

export const addNewChat = (data: any) => {
  return {
    type: "ADD_NEW_CHAT",
    data,
  };
};

export const selectChat = (data: any) => {
  return {
    type: "SELECTED_CHAT",
    data,
  };
};
export const nullCurrentChat = (data: any) => {
  return {
    type: "NULL_CURRENT",
    data,
  };
};
export default chatsReducer;
