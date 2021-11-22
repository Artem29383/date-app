import React, { memo } from "react";
import * as S from "./AreaPortal.styled";

type Props = {
  children: React.ReactNode;
  minHeightArea: number;
  left: number;
  top: number;
};

const AreaPortal = ({ children, minHeightArea, left, top }: Props) => (
  <S.Main minHeightArea={minHeightArea} left={left} top={top}>
    <S.TriangleFake />
    <S.Triangle />
    <S.Root>{children}</S.Root>
  </S.Main>
);

export default memo(AreaPortal);
