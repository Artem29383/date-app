import React, { memo } from 'react';
import { Colors } from '@types';
import { PositionProps } from 'styled-system';
import * as S from './Loader.styled';

type Props = {
  color?: string;
  transform?: { x: string; y: string };
} & PositionProps;

const Loader = ({ color = Colors.white, transform, ...rest }: Props) => {
  return (
    <S.Root {...rest} color={color} className="triangle" transform={transform}>
      <svg viewBox="0 0 86 80">
        <polygon points="43 8 79 72 7 72" />
      </svg>
    </S.Root>
  );
};

export default memo(Loader);
