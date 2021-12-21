import React, { memo } from "react";

import * as S from "./Post.styled";
import { handleImageError } from "utils/imageError";
import { icons } from "styles/icons";
import { Colors } from "@types";

const CommentIcon = icons.comment;

type Props = {
  id: string;
  url: string;
  onClick: (id: string) => void;
  commentCount: number;
};

const Post = ({ id, url, onClick, commentCount }: Props) => {
  const handleClick = () => {
    onClick(id);
  };

  return (
    <S.Root onClick={handleClick}>
      <S.Background>
        <CommentIcon
          width={16}
          marginRight={5}
          height={16}
          fill={Colors.white}
        />
        <S.Text>{commentCount}</S.Text>
      </S.Background>
      <S.Img src={url} onError={handleImageError} />
    </S.Root>
  );
};

export default memo(Post);
