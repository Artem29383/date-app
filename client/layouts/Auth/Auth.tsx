import React from 'react';
import Asset from 'assets/backgrounds/background-main-auth.jpeg';

import * as S from './Auth.styled';

type Props = {
  children: React.ReactNode;
};

const Auth = ({ children }: Props) => {
  return (
    <S.Root>
      {children}
      <S.Img src={Asset.src} />
    </S.Root>
  );
};

export default Auth;
