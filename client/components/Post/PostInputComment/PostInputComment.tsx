import React, { memo } from "react";
import * as S from "components/Post/PostWall/PostWall.styled";
import Button from "components/Button/Button";

type Props = {
  comment: string;
  $postInput: React.RefObject<HTMLInputElement>;
  onChange: (e: { target: { value: React.SetStateAction<string> } }) => void;
  onAdd: () => void;
};

const PostInputComment = ({ comment, $postInput, onChange, onAdd }: Props) => {
  return (
    <S.CommentRowInput>
      <S.Input
        ref={$postInput}
        placeholder="Добавьте комментарий..."
        value={comment}
        onChange={onChange}
      />
      <Button onClick={onAdd} disabled={!comment.trim()} typeButton="facebook">
        Опубликовать
      </Button>
    </S.CommentRowInput>
  );
};

export default memo(PostInputComment);
