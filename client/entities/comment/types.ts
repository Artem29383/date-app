export interface IComment {
  text: string;
  id: string;
  userAvatar: string;
  createdAt: Date;
}

export type CommentQuery = {
  id: string;
};
