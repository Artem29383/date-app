import React from "react";

import * as S from "./Container.styled";

type Props = {
  children: React.ReactNode;
};

const Container = ({ children }: Props) => {
  return <S.Root>{children}</S.Root>;
};

export default Container;
