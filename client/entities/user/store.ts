import { IUser } from "src/entities/user/types";
import { root } from "src/entities/root";
import { currentAsync, logout } from "pages/login/model/login";
import { GENDER } from "@types";
import { registerAsync } from "pages/register/model/register";
import { uploadImageAsync } from "src/entities/user/async";
import { createEvent } from "effector";

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
  .on(updateUser, (state, payload) => {
    return payload;
  });
