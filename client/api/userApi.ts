import { AxiosInstance, AxiosResponse } from "axios";
import { IUser, IUserUpdate } from "src/entities/user/types";
import { deployImageCloud } from "utils/deployImageClound";

export const UserApi = (instance: AxiosInstance) => {
  return {
    uploadPhoto: async ({
      file,
      email
    }: {
      file: File | "destroy";
      email: string;
    }): Promise<AxiosResponse<IUser> | { data: null }> => {
      try {
        if (file === "destroy") {
          return await instance.patch("/user/update", {
            avatarUrl: "",
            email
          });
        }
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "h8zima02");

        const avatarUrl = await deployImageCloud(formData);

        return await instance.patch("/user/update", {
          avatarUrl,
          email
        });
      } catch (e) {
        console.info(e);
      }
      return { data: null };
    },
    updateUser: async (data: IUserUpdate) => {
      return instance.patch("/user/update", data);
    },
    getUserById: async (id: string): Promise<IUser | null> => {
      try {
        const response = await instance.get(`/user?id=${id}`);
        return response.data;
      } catch (e) {
        return null;
      }
    }
  };
};
