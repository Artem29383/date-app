import { IUser } from "src/entities/user/types";
import { root } from "src/entities/root";
import {
  currentAsync,
  getUserByIdAsync,
  logout
} from "pages/login/model/login";
import { GENDER } from "@types";
import { registerAsync } from "pages/register/model/register";
import { createEvent } from "effector";
import { updateUserAsync } from "src/entities/user/async";

export const UserInitialState = {
  email: "",
  accessToken: "",
  countries: "",
  createdAt: "",
  id: "",
  password: "",
  age: 0,
  username: "",
  description: "",
  gender: GENDER.male
};

export const updateUser = createEvent<IUser>();

export const $user = root
  .createStore<IUser>(UserInitialState)
  .reset(logout)
  .on(registerAsync.doneData, (state, payload) => ({
    ...state,
    ...payload
  }))
  .on(currentAsync.doneData, (state, user) => ({ ...state, ...user }))
  .on(updateUser, (state, payload) => payload)
  .on(updateUserAsync.doneData, (state, user) => ({ ...state, ...user }));

export const $currentUser = root
  .createStore<IUser>(UserInitialState)
  .reset(logout)
  .on(getUserByIdAsync.doneData, (state, user) => ({ ...state, ...user }));
