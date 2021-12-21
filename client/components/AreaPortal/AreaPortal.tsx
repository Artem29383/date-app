import React, { memo } from "react";
import * as S from "./AreaPortal.styled";

type Props = {
  children: React.ReactNode;
  minHeightArea: number;
  left: number | string;
  top: number | string;
  triangleCenter?: boolean;
};

const AreaPortal = ({
  children,
  minHeightArea,
  left,
  top,
  triangleCenter = false
}: Props) => (
  <S.Main minHeightArea={minHeightArea} left={left} top={top}>
    <S.TriangleFake />
    <S.Triangle triangleCenter={triangleCenter} />
    <S.Root>{children}</S.Root>
  </S.Main>
);

export default memo(AreaPortal);
