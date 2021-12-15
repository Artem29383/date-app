import { AxiosInstance, AxiosResponse } from "axios";
import { CommentQuery, IComment } from "src/entities/comment/types";

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
    }
  };
};
