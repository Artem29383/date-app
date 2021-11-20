import React, { useState } from "react";
import * as S from "./InstaInput.styled";
import { icons } from "styles/icons";
import { Colors } from "@types";
import Cross from "components/Cross";

const Icon = icons.search;

type Props = {
  value: string;
  onChange: (e: any) => void;
  onReset: () => void;
};

const InstaInput = ({ value = "", onChange, onReset }: Props) => {
  const [focus, setFocus] = useState(false);

  const handleFocus = () => {
    setFocus(!focus);
  };

  return (
    <S.Root>
      {!focus && !value && (
        <S.Pos left="12px">
          <Icon width={11} height={11} fill={Colors.instaPlaceholder} />
        </S.Pos>
      )}
      <S.Input
        onChange={onChange}
        isFocus={Boolean(value) || focus}
        value={value}
        onFocus={handleFocus}
        onBlur={handleFocus}
        placeholder="Поиск"
      />
      {(focus || value) && (
        <S.Pos right="12px">
          <Cross onClick={onReset} />
        </S.Pos>
      )}
    </S.Root>
  );
};

export default InstaInput;
