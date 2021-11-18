import React, { memo } from 'react';
import Link from "next/link";

import {
  BorderRadiusProps,
  HeightProps,
  MarginProps,
  WidthProps,
} from 'styled-system';
import * as S from './Button.styled';

type Props = {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  typeButton?: 'classic' | 'ghost' | 'google';
  link?: string;
  pick?: boolean;
} & MarginProps &
  BorderRadiusProps &
  WidthProps &
  HeightProps;

const ClassicButton = ({ children, ...props }: Props) => (
  <S.Root {...props}>{children}</S.Root>
);

const GhostButton = ({ children, link, ...props }: Props) => (
  <S.RootGhost {...props}>
    {link ? (
      <Link href={link}>
        <S.Link>
          <S.GhostText>{children}</S.GhostText>
        </S.Link>
      </Link>
    ) : (
      <S.GhostText>{children}</S.GhostText>
    )}
    <S.GhostBack />
  </S.RootGhost>
);

const GoogleButton = ({ children, ...props }: Props) => (
  <S.GoogleRoot {...props}>{children}</S.GoogleRoot>
);

const buttons: { [key: string]: React.FC<Props> } = {
  classic: ClassicButton,
  ghost: GhostButton,
  google: GoogleButton,
};

const Button = ({
  children,
  disabled = false,
  typeButton = 'classic',
  pick = false,
  ...rest
}: Props) => {
  const Component = buttons[typeButton];
  return (
    <Component pick={pick} disabled={disabled} {...rest}>
      {children}
    </Component>
  );
};

export default memo(Button);
