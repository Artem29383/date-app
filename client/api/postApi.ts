import { AxiosInstance, AxiosResponse } from "axios";
import { IPost, PostData, PostsQuery } from "src/entities/post/types";
import { dataUrlToFile } from "utils/base64ToFile";
import { v4 as uuid } from "uuid";
import { deployImageCloud } from "utils/deployImageClound";
import { IPostsState } from "src/entities/post/store";

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
    },

    removePost: async ({ id }: { id: string }): Promise<AxiosResponse> => {
      // eslint-disable-next-line @typescript-eslint/return-await
      return await instance.delete(`/post/${id}`);
    },

    getUserPosts: async (
      query: PostsQuery
    ): Promise<
      | AxiosResponse<IPostsState>
      | {
          data: {
            posts: [];
            counts: 0;
          };
        }
    > => {
      try {
        return await instance.get(`/post/publications?id=${query.id}`);
      } catch (e) {
        console.info(e);
      }

      return { data: { posts: [], counts: 0 } };
    },

    getUserBookmarks: async (
      query: PostsQuery
    ): Promise<
      | AxiosResponse<IPostsState>
      | {
          data: {
            posts: [];
            counts: 0;
          };
        }
    > => {
      try {
        return await instance.get(`/post/bookmarks?id=${query.id}`);
      } catch (e) {
        console.info(e);
      }

      return { data: { posts: [], counts: 0 } };
    },

    setLikePost: async (
      id: string
    ): Promise<AxiosResponse<IPost> | { data: null }> => {
      try {
        return await instance.post(`/post/${id}/favorite`);
      } catch (e) {
        console.info(e);
      }

      return { data: null };
    },

    setDisLikePost: async (
      id: string
    ): Promise<AxiosResponse<IPost> | { data: null }> => {
      try {
        return await instance.delete(`/post/${id}/favorite`);
      } catch (e) {
        console.info(e);
      }

      return { data: null };
    },

    setBookmarkPost: async (
      id: string
    ): Promise<AxiosResponse<IPost> | { data: null }> => {
      try {
        return await instance.post(`/post/${id}/bookmark`);
      } catch (e) {
        console.info(e);
      }

      return { data: null };
    },

    setBookmarkRemovePost: async (
      id: string
    ): Promise<AxiosResponse<IPost> | { data: null }> => {
      try {
        return await instance.delete(`/post/${id}/bookmark`);
      } catch (e) {
        console.info(e);
      }

      return { data: null };
    }
  };
};
