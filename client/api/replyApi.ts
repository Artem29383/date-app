import { AxiosInstance, AxiosResponse } from "axios";
import { IReply, ReplyQuery } from "src/entities/reply/types";

export const ReplyApi = (instance: AxiosInstance) => {
  return {
    getCommentReplies: async (
      query: ReplyQuery
    ): Promise<
      | AxiosResponse<IReply[]>
      | {
          data: IReply[];
        }
    > => {
      try {
        return await instance.get(`/reply?commentId=${query.commentId}`);
      } catch (e) {
        console.info(e);
      }

      return {
        data: []
      };
    },

    addReplyToComment: async (
      data: ReplyQuery
    ): Promise<AxiosResponse<IReply>> => {
      const reply = await instance.post(`/reply/add`, data);
      return reply;
    },

    removeReplyFromComment: async (data: {
      replyId: string;
      commentId: string;
    }): Promise<AxiosResponse> => {
      const response = await instance.delete(`/reply/remove`, {
        data
      });
      return response;
    }
  };
};
