import React from "react";

import * as S from "./Application.styled";
import Header from "components/Header";
import { useUser } from "src/entities/user/selectors";

type Props = {
  children: React.ReactNode;
};

const Application = ({ children }: Props) => {
  const user = useUser();

  return (
    <S.Root>
      {user.id && <Header />}
      <S.Wrapper>{children}</S.Wrapper>
    </S.Root>
  );
};

export default Application;
