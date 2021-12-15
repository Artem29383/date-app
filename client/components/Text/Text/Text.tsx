import React, { memo } from "react";
import * as S from "./Text.styled";

type Props = {
  children: React.ReactNode;
};

const Text = ({ children }: Props) => <S.Root>{children}</S.Root>;

export default memo(Text);
