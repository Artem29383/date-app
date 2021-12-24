import { AxiosInstance, AxiosResponse } from "axios";
import { ISearchUserDto, IUser, IUserUpdate } from "src/entities/user/types";
import { deployImageCloud } from "utils/deployImageClound";
import { IPost } from "src/entities/post/types";
import { IMeta } from "src/entities/root";
import { configureParamsToQuery } from "utils/configureParamsToQuery";

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
    },

    getSearchUsers: async (
      searchUserDto: ISearchUserDto
    ): Promise<{ users: IUser[]; counts: number }> => {
      const { offset, limit, username } = searchUserDto;
      try {
        const response = await instance.get(
          `/user/all${configureParamsToQuery([
            { limit },
            { search: username }
          ])}`
        );
        return response.data;
      } catch (e) {
        return {
          users: [],
          counts: 0
        };
      }
    },

    followUser: async (userFollowingId: string) => {
      try {
        const response = await instance.post(`/user/follow`, {
          userFollowingId
        });
        return response.data;
      } catch (e) {
        console.info(e);
      }
      return null;
    },

    unfollowUser: async (userFollowingId: string) => {
      try {
        const response = await instance.post(`/user/unfollow`, {
          userFollowingId
        });
        return response.data;
      } catch (e) {
        console.info(e);
      }
      return null;
    },

    getFollowers: async (id: string) => {
      try {
        const response = await instance.get(`/user/followers?id=${id}`);
        return response.data;
      } catch (e) {
        console.info(e);
      }
      return { followers: [] };
    },

    getSubs: async (id: string) => {
      try {
        const response = await instance.get(`/user/subs?id=${id}`);
        return response.data;
      } catch (e) {
        console.info(e);
      }
      return { followers: [] };
    },

    getFeeds: async (
      page?: number,
      limit?: number
    ): Promise<{ items: IPost[]; meta: IMeta }> => {
      try {
        const response = await instance.get(
          `/user/feeds${configureParamsToQuery([{ page }])}`
        );
        return response.data;
      } catch (e) {
        console.info(e);
      }
      return {
        items: [],
        meta: {
          totalItems: 0,
          itemCount: 0,
          itemsPerPage: 10,
          totalPages: 1,
          currentPage: 1
        }
      };
    }
  };
};
