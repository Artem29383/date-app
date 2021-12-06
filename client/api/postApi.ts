import { AxiosInstance, AxiosResponse } from "axios";
import { IPost, PostData } from "src/entities/post/types";
import { dataUrlToFile } from "utils/base64ToFile";
import { v4 as uuid } from "uuid";
import { deployImageCloud } from "utils/deployImageClound";

export const PostApi = (instance: AxiosInstance) => {
  return {
    createPost: async ({
      description,
      base64,
      disableComments
    }: PostData): Promise<AxiosResponse<IPost> | { data: null }> => {
      try {
        const file = await dataUrlToFile(base64, uuid());
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "h8zima02");

        const url = await deployImageCloud(formData);

        return await instance.post("/post/create", {
          description,
          avatarUrl: url,
          disableComments
        });
      } catch (e) {
        console.info(e);
      }
      return { data: null };
    }
  };
};
