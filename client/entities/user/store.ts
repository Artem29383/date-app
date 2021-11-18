import { createEvent } from "effector";
import React from "react";
import { IUser } from "src/entities/user/types";
import { root } from "src/entities/root";

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

export const logout = createEvent<React.MouseEvent>();

export const updateUser = createEvent<IUser | null>();

export const $user = root
  .createStore<IUser>(UserInitialState)
  .reset(logout)
  .on(updateUser, (state, user) => ({ ...state, ...user }));
