import React, { useState } from "react";

import * as S from "./Accordion.styled";
import { icons } from "styles/icons";
import { useToggle } from "hooks/useToggle";

type Props = {
  children: React.ReactNode;
  label: string;
};

const Icon = icons.accordionArrow;

const Accordion = ({ children, label }: Props) => {
  const { value: show, handleToggle } = useToggle(false);

  return (
    <S.Root active={show}>
      <S.Row active={show} onClick={handleToggle}>
        <S.Label active={show}>{label}</S.Label>
        <Icon style={{ transform: show ? "rotate(0)" : "rotate(180deg)" }} />
      </S.Row>
      {show && <S.Children>{children}</S.Children>}
    </S.Root>
  );
};

export default Accordion;
