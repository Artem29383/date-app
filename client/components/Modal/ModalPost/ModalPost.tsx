import React from "react";
import Modal from "components/Modal";

import * as S from "./ModalPost.styled";
import { IUser } from "src/entities/user/types";
import { IComment } from "src/entities/comment/types";
import FeedPost from "components/Feeds/FeedPost";

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
  myUserId: string;
  comments: IComment[];
  onMark: (id: string) => void;
  onUnMark: (id: string) => void;
  isMark: boolean;
  onRemovePost: (p: string) => void;
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
  postId,
  myUserId,
  comments,
  onMark,
  onUnMark,
  isMark,
  onRemovePost
}: Props) => {
  return (
    <Modal isFullWidth maxWidth={1200} open={open} onClose={onClose}>
      <S.Root>
        <FeedPost
          isProfilePost
          userAvatar={user.avatarUrl || ""}
          username={user.username}
          userId={user.id}
          image={url}
          favoriteCount={favoriteCount}
          isFavorite={isFavorite}
          isMark={isMark}
          comments={comments}
          disableComments={disableComments}
          myUserId={myUserId}
          postId={postId}
          onRemovePost={onRemovePost}
          onDislikePost={onDisLike}
          onLikePost={onLike}
          onMark={onMark}
          onUnMark={onUnMark}
        />
      </S.Root>
    </Modal>
  );
};

export default ModalPost;
