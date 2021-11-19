import React from "react";

import * as S from "./Application.styled";

type Props = {
  children: React.ReactNode;
  role: string;
};

const Application = ({ children, role }: Props) => {
  return (
    <S.Root>
      {/* <Sidebar role={role} /> */}
      <S.Wrapper>{children}</S.Wrapper>
    </S.Root>
  );
};

export default Application;
