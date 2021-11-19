import React from "react";
import { IUser } from "src/entities/user/types";
import { root } from "src/entities/root";
import { currentAsync } from "pages/login/model/login";

export const UserInitialState = {
  email: "",
  accessToken: "",
  countries: "",
  createdAt: "",
  id: "",
  password: "",
  role: null,
  username: ""
};

export const logout = root.createEvent<React.MouseEvent>();

export const updateUser = root.createEvent<IUser | null>();

export const $user = root
  .createStore<IUser>(UserInitialState)
  .reset(logout)
  .on(currentAsync.doneData, (state, user) => ({ ...state, ...user }));
