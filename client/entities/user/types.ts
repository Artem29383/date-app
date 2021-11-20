import { GENDER } from "@types";

export interface IUser extends IUserPayload {
  accessToken: string;
  id: string;
  createdAt: string;
  description?: string;
  age?: number;
}

export interface IUserPayload {
  email: string;
  password: string;
  username: string;
  countries: string;
  avatarUrl?: string;
  gender: GENDER;
}
