import { IUser, IUserPayload } from "src/entities/user/types";
import { AxiosInstance, AxiosResponse } from "axios";
import { FormTypeLogin } from "pages/login/model/types";

export const AuthApi = (instance: AxiosInstance) => {
  return {
    getCurrentUser: async (): Promise<IUser | null> => {
      try {
        const response = await instance.get("/auth/current");
        return response.data;
      } catch (e) {
        return null;
      }
    },
    signIn: (data: FormTypeLogin): Promise<AxiosResponse<IUser>> => {
      return instance.post("/auth/login", data);
    },
    signUp: (data: IUserPayload): Promise<AxiosResponse<IUser>> => {
      return instance.post("/auth/register", data);
    }
  };
};
