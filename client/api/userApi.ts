import { AxiosInstance, AxiosResponse } from "axios";
import { IUser, IUserUpdate } from "src/entities/user/types";

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

        const res = await fetch(
          `https://api.cloudinary.com/v1_1/dadjiatxx/image/upload`,
          {
            method: "POST",
            body: formData
          }
        );
        const data = await res.json();

        return await instance.patch("/user/update", {
          avatarUrl: data.url,
          email
        });
      } catch (e) {
        console.info(e);
      }
      return { data: null };
    },
    updateUser: async (data: IUserUpdate) => {
      return instance.patch("/user/update", data);
    }
  };
};
