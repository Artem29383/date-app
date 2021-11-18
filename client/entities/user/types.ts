import { Roles } from "@types";

export interface IUser extends IUserPayload {
  accessToken: string;
  id: string;
  createdAt: string;
}

export interface IUserPayload {
  email: string;
  password: string;
  username: string;
  countries: string;
  avatarUrl?: string;
  role: Roles | null;
}
