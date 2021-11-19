import React, { memo, useLayoutEffect, useRef, useState } from "react";
import * as S from "./Tab.styled";

type Props = {
  title: string;
  callback: () => void;
  active: boolean;
};

const Tab = ({ callback, title, active }: Props) => {
  const [tabWidth, setTabWidth] = useState(0);
  const $tabTitle = useRef(null);

  useLayoutEffect(() => {
    if ($tabTitle.current) {
      // @ts-ignore
      setTabWidth($tabTitle.current.getBoundingClientRect().width);
    }
  }, [$tabTitle]);

  return (
    <S.Tab style={{ width: `${tabWidth * 1.5}px` }} onClick={callback}>
      <S.TitleTab ref={$tabTitle}>{title}</S.TitleTab>
      <S.BottomBorder active={active} />
    </S.Tab>
  );
};

export default memo(Tab);
