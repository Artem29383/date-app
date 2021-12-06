import React, { memo } from "react";

import * as S from "./Toggle.styled";

type Props = {
  width: number;
  value: boolean;
  toggle: (p: boolean) => void;
};

const Toggle = ({ width, value, toggle }: Props) => {
  const handleToggle = () => {
    toggle(!value);
  };

  return (
    <S.Root widthElement={width} onClick={handleToggle} active={value}>
      <S.Dot active={value} />
    </S.Root>
  );
};

export default memo(Toggle);
