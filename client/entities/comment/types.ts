export interface IComment {
  text: string;
  id: string;
  userAvatar: string;
  createdAt: Date;
  userId: string;
  username: string;
}

export type CommentQuery = {
  id: string;
};

export type CommentDataReq = {
  text: string;
  postId: string;
  userId: string;
  username: string;
  userAvatar: string;
};
