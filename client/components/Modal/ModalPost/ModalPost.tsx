import React from "react";
import Modal from "components/Modal";

import * as S from "./ModalPost.styled";
import { handleImageError } from "utils/imageError";
import PostWall from "components/Post/PostWall";
import { IUser } from "src/entities/user/types";

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
  postId: string;
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
  postId
}: Props) => {
  return (
    <Modal isFullWidth maxWidth={1200} open={open} onClose={onClose}>
      <S.Root>
        <S.Image src={url} onError={handleImageError} />
        <PostWall
          postId={postId}
          onLike={onLike}
          onDisLike={onDisLike}
          createdAt={createdAt}
          favoriteCount={favoriteCount}
          disableComments={disableComments}
          description={description}
          avatarUrl={user.avatarUrl || ""}
          username={user.username}
          id={user.id}
          isFavorite={isFavorite}
        />
      </S.Root>
    </Modal>
  );
};

export default ModalPost;
