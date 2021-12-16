import React from "react";
import Modal from "components/Modal";

import * as S from "./ModalPost.styled";
import { handleImageError } from "utils/imageError";
import PostWall from "components/Post/PostWall";
import { IUser } from "src/entities/user/types";
import { IComment } from "src/entities/comment/types";

type Props = {
  onClose: () => void;
  open: boolean;
  url: string;
  user: Pick<IUser, "username" | "avatarUrl" | "id">;
  description: string;
  createdAt: Date;
  favoriteCount: number;
  disableComments: boolean;
  isFavorite: boolean;
  onLike: (id: string) => void;
  onDisLike: (id: string) => void;
  onAddComment: (postId: string, comment: string) => void;
  onRemoveComment: (commentId: string) => void;
  postId: string;
  myUserId: string;
  comments: IComment[];
};

const ModalPost = ({
  onClose,
  open,
  url,
  user,
  disableComments,
  description,
  favoriteCount,
  createdAt,
  isFavorite,
  onLike,
  onDisLike,
  onAddComment,
  postId,
  myUserId,
  comments,
  onRemoveComment
}: Props) => {
  return (
    <Modal isFullWidth maxWidth={1200} open={open} onClose={onClose}>
      <S.Root>
        <S.Image src={url} onError={handleImageError} />
        <PostWall
          postId={postId}
          onLike={onLike}
          myUserId={myUserId}
          onDisLike={onDisLike}
          onAddComment={onAddComment}
          createdAt={createdAt}
          favoriteCount={favoriteCount}
          disableComments={disableComments}
          description={description}
          avatarUrl={user.avatarUrl || ""}
          username={user.username}
          comments={comments}
          id={user.id}
          isFavorite={isFavorite}
          onRemoveComment={onRemoveComment}
        />
      </S.Root>
    </Modal>
  );
};

export default ModalPost;
