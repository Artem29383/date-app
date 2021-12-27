export interface IReply {
  text: string;
  id: string;
  createdAt: Date;
  userId: string;
  userReplayId: string;
  user: {
    username: string;
    avatarUrl: string;
  };
}

export interface ReplyQuery {
  text?: string;
  replyUserId?: string;
  replyUsername?: string;
  commentId: string;
}
