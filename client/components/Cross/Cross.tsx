import React from "react";
import * as S from "./Cross.styled";

type Props = {
  onClick: () => void;
};

const Cross = ({ onClick }: Props) => {
  return (
    <S.Root onClick={onClick}>
      <S.Line rotate={135} />
      <S.Line rotate={-135} />
    </S.Root>
  );
};

export default Cross;
