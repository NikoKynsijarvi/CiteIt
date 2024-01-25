"use client";

import { configureStore } from "@reduxjs/toolkit";
import chatReducer from "./reducers/chatsReducer";

const store = configureStore({
  reducer: {
    chats: chatReducer,
  },
});

export default store;
