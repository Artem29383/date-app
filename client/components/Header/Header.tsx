import React, { useState } from "react";
import { ClientVariables } from "@types";
import * as S from "./Header.styled";
import { icons } from "styles/icons";
import InstaInput from "components/InstaInput";
import Navigation from "components/Navigation";

const IconInsta = icons.instagramLogo;

type Props = {
  logout: () => void;
};

const Header = ({ logout }: Props) => {
  const [value, setValue] = useState("");

  const handleChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setValue(e.target.value);
  };

  const handleReset = () => {
    setValue("");
  };

  return (
    <S.Root style={{ height: `${ClientVariables.HEADER_HEIGHT}px` }}>
      <S.InnerRoot>
        <IconInsta />
        <InstaInput
          onReset={handleReset}
          onChange={handleChange}
          value={value}
        />
        <Navigation logout={logout} />
      </S.InnerRoot>
    </S.Root>
  );
};

export default Header;
