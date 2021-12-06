export interface IPost {
  description: string;
  id: string;
  avatarUrl: string;
  disableComments: boolean;
}

export type PostData = {
  description: string;
  base64: string;
  disableComments: boolean;
};
