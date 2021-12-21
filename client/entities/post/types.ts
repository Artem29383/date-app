export interface IPost {
  description: string;
  id: string;
  avatarUrl: string;
  disableComments: boolean;
  createdAt: Date;
  favoritesCount: number;
  isFavorite: boolean;
  commentCount: number;
  isBookmark: boolean;
}

export type PostData = {
  description: string;
  base64: string;
  disableComments: boolean;
};

export type PostsQuery = {
  id: string;
  limit?: number;
  offset?: number;
};
