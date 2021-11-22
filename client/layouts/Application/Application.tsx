import React from "react";

import * as S from "./Application.styled";
import Header from "components/Header";
import { useUser } from "src/entities/user/selectors";
import { useEvent } from "effector-react/ssr";
import { logout } from "pages/login/model/login";

type Props = {
  children: React.ReactNode;
};

const Application = ({ children }: Props) => {
  const user = useUser();
  const handleLogout = useEvent(logout);

  return (
    <S.Root>
      {user.id && <Header logout={handleLogout} />}
      <S.Wrapper>{children}</S.Wrapper>
    </S.Root>
  );
};

export default Application;
