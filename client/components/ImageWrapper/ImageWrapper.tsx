import React, { memo, useRef, useState } from "react";
import classnames from "classnames";

import {
  BorderRadiusProps,
  FlexBasisProps,
  MaxHeightProps,
  OverflowProps
} from "styled-system";

import { handleImageError } from "utils/imageError";
import { useIntersection } from "hooks/useIntersection";
import * as S from "./ImageWrapper.styled";

type Props = {
  source: string;
} & FlexBasisProps &
  BorderRadiusProps &
  OverflowProps &
  MaxHeightProps;

const ImageWrapper = ({ source, ...rest }: Props) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef();
  useIntersection(imgRef, () => {
    setIsInView(true);
  });

  const handleOnLoad = () => {
    setIsLoaded(true);
  };

  return (
    // @ts-ignore
    <S.WrapperImage ref={imgRef} {...rest}>
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
