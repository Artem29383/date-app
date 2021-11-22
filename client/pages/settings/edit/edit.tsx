import React from "react";

import * as S from "./Edit.styled";
import ImageWrapper from "components/ImageWrapper";
import { useUser } from "src/entities/user/selectors";

const Edit = () => {
  const { avatarUrl, username } = useUser();
  return (
    <S.Root>
      <S.Profile>
        <ImageWrapper
          source={avatarUrl || ""}
          width={38}
          height={38}
          borderRadius="50%"
          overflow="hidden"
          margin="2px 32px 0 124px"
        />
        <S.ProfileActions>
          <S.Name>{username}</S.Name>
          <S.Button>Изменить фото профиля</S.Button>
        </S.ProfileActions>
      </S.Profile>
    </S.Root>
  );
};

export default Edit;
