import React, { memo } from 'react';

import { ColorProps, MarginProps, PositionProps } from 'styled-system';
import * as S from './H1.styled';

type Props = {
  children: React.ReactNode;
} & ColorProps &
  MarginProps &
  PositionProps;

const H1 = ({ children, ...rest }: Props) => {
  // @ts-ignore
  return <S.Root {...rest}>{children}</S.Root>;
};

export default memo(H1);
