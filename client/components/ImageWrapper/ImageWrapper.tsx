import React, { memo, useRef, useState } from "react";
import classnames from "classnames";

import {
  BorderRadiusProps,
  FlexBasisProps,
  FlexShrinkProps,
  HeightProps,
  MarginProps,
  MaxHeightProps,
  MaxWidthProps,
  OverflowProps,
  WidthProps
} from "styled-system";

import { handleImageError } from "utils/imageError";
import { useIntersection } from "hooks/useIntersection";
import * as S from "./ImageWrapper.styled";

type Props = {
  source: string;
  isLoad?: boolean;
  onClick?: () => void;
  onDBClick?: () => void;
} & FlexBasisProps &
  BorderRadiusProps &
  OverflowProps &
  MaxHeightProps &
  MaxWidthProps &
  HeightProps &
  WidthProps &
  MarginProps &
  FlexShrinkProps;

const ImageWrapper = ({
  source,
  onClick,
  onDBClick,
  isLoad = false,
  ...rest
}: Props) => {
  const [isLoaded, setIsLoaded] = useState(isLoad);
  const [isInView, setIsInView] = useState(isLoad);
  const imgRef = useRef();
  useIntersection(imgRef, () => {
    setIsInView(true);
  });

  const handleOnLoad = () => {
    setIsLoaded(true);
  };

  if (isLoad)
    return (
      <S.WrapperImage
        onDoubleClick={onDBClick}
        onClick={onClick}
        // @ts-ignore
        ref={imgRef}
        {...rest}
      >
        <S.ImageStatic src={source} alt={source} onError={handleImageError} />
      </S.WrapperImage>
    );
  return (
    <S.WrapperImage
      onDoubleClick={onDBClick}
      onClick={onClick}
      // @ts-ignore
      ref={imgRef}
      {...rest}
    >
      {isInView && (
        <S.Image
          className={classnames("image", {
            isLoaded
          })}
          onLoad={handleOnLoad}
          src={source}
          alt={source}
          onError={handleImageError}
        />
      )}
    </S.WrapperImage>
  );
};

export default memo(ImageWrapper);
