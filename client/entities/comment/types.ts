export interface IComment {
  text: string;
  id: string;
  createdAt: Date;
  userId: string;
  user: {
    username: string;
    userAvatar: string;
  };
}

export type CommentQuery = {
  id: string;
};

export type CommentDataReq = {
  text: string;
  postId: string;
};
