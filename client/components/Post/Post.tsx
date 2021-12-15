import React, { memo } from "react";

import * as S from "./Post.styled";
import { handleImageError } from "utils/imageError";

type Props = {
  id: string;
  url: string;
  onClick: (id: string) => void;
};

const Post = ({ id, url, onClick }: Props) => {
  const handleClick = () => {
    onClick(id);
  };

  return (
    <S.Root onClick={handleClick}>
      <S.Img src={url} onError={handleImageError} />
    </S.Root>
  );
};

export default memo(Post);
