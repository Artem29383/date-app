import { IReply } from "src/entities/reply/types";

export interface IComment {
  text: string;
  id: string;
  createdAt: Date;
  userId: string;
  user: {
    username: string;
    avatarUrl: string;
  };
  replays: IReply[];
}

export type CommentQuery = {
  id: string;
};

export type CommentDataReq = {
  text: string;
  postId: string;
};
