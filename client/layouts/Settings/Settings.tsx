import React from "react";

import * as S from "./Settings.styled";
import ActiveLink from "components/ActiveLink";
import { ROUTES } from "@types";

type Props = {
  children: React.ReactNode;
};

const Settings = ({ children }: Props) => {
  return (
    <S.Root>
      <S.Navigation>
        <ActiveLink activeClassName="active" href={ROUTES.SETTINGS_PROFILE}>
          <S.Item>Редактировать профиль</S.Item>
        </ActiveLink>
        <ActiveLink activeClassName="active" href={ROUTES.SETTINGS_PASSWORD}>
          <S.Item>Сменить пароль</S.Item>
        </ActiveLink>
      </S.Navigation>
      {children}
    </S.Root>
  );
};

export default Settings;
