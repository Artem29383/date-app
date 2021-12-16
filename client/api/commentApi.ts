import { AxiosInstance, AxiosResponse } from "axios";
import {
  CommentDataReq,
  CommentQuery,
  IComment
} from "src/entities/comment/types";

export const CommentApi = (instance: AxiosInstance) => {
  return {
    getPostComments: async (
      query: CommentQuery
    ): Promise<
      | AxiosResponse<IComment[]>
      | {
          data: IComment[];
        }
    > => {
      try {
        return await instance.get(`/comment?postId=${query.id}`);
      } catch (e) {
        console.info(e);
      }

      return {
        data: []
      };
    },

    addCommentToPost: async (
      data: CommentDataReq
    ): Promise<AxiosResponse<IComment>> => {
      const comment = await instance.post(`/comment`, data);
      return comment;
    },

    removeCommentFromPost: async (data: {
      commentId: string;
    }): Promise<AxiosResponse> => {
      const response = await instance.delete(`/comment/${data.commentId}`, {
        data
      });
      return response;
    }
  };
};
