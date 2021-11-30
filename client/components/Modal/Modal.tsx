import React, { memo } from "react";

import {
  BackgroundProps,
  BorderRadiusProps,
  HeightProps,
  MaxWidthProps,
  PaddingProps
} from "styled-system";

import * as S from "./Modal.styled";

type Props = {
  children: React.ReactNode;
  open: boolean;
  onClose: () => void;
  bgcColor?: string;
  isFullWidth?: boolean;
} & MaxWidthProps &
  HeightProps &
  BackgroundProps &
  PaddingProps &
  BorderRadiusProps;

const variants = {
  open: {
    scale: 1,
    transition: { duration: 0.1 }
  },
  closed: {
    scale: 0.5
  }
};

const variantsRoot = {
  open: {
    opacity: 1,
    display: "flex"
  },
  closed: {
    opacity: 0,
    transitionEnd: {
      display: "none"
    }
  }
};

const variantsBackground = {
  open: {
    opacity: 1
  },
  closed: {
    opacity: 0
  }
};

const Modal = ({
  children,
  open,
  onClose,
  bgcColor = "rgba(0, 0, 0, 0.2)",
  isFullWidth = true,
  ...rest
}: Props) => (
  <S.Root variants={variantsRoot} animate={open ? "open" : "closed"}>
    <S.Background
      bgcColor={bgcColor}
      onClick={onClose}
      variants={variantsBackground}
      animate={open ? "open" : "closed"}
    />
    <S.Content
      isFullWidth={isFullWidth}
      {...rest}
      variants={variants}
      animate={open ? "open" : "closed"}
    >
      {children}
    </S.Content>
  </S.Root>
);

export default memo(Modal);
