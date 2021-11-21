import React, { useState } from "react";
import { ClientVariables } from "@types";
import * as S from "./Header.styled";
import { icons } from "styles/icons";
import InstaInput from "components/InstaInput";
import Navigation from "components/Navigation";
import ImageWrapper from "components/ImageWrapper";
import { useUser } from "src/entities/user/selectors";

const IconInsta = icons.instagramLogo;

const Header = () => {
  const [value, setValue] = useState("");

  const handleChange = e => {
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
        <Navigation />
      </S.InnerRoot>
    </S.Root>
  );
};

export default Header;
