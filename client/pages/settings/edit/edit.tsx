import React from "react";

import * as S from "./Edit.styled";
import ImageWrapper from "components/ImageWrapper";
import { useUser } from "src/entities/user/selectors";
import Portal from "components/Portal";
import { useToggle } from "hooks/useToggle";
import { useClientRender } from "hooks/useClientRender";
import FormSettings from "components/FormSettings";
import WrapperModalChangeAvatar from "components/Modal/ModalChangeAvatar/WrapperModalChangeAvatar";

const Edit = () => {
  const isClient = useClientRender();
  const { avatarUrl, username, email, description, age } = useUser();
  const { handleOpen, value: open, handleClose } = useToggle(false);

  return (
    <S.Root>
      <S.Profile>
        <ImageWrapper
          source={avatarUrl || ""}
          width={38}
          margin="2px 32px 0 124px"
          isLoad
          height={38}
          borderRadius="50%"
          overflow="hidden"
        />
        <S.ProfileActions>
          <S.Name>{username}</S.Name>
          <S.Button onClick={handleOpen}>Изменить фото профиля</S.Button>
        </S.ProfileActions>
      </S.Profile>
      <FormSettings
        age={age || 0}
        username={username}
        description={description || ""}
        email={email}
      />
      {isClient && (
        <Portal id="modalChangeAvatar">
          <WrapperModalChangeAvatar
            onClose={handleClose}
            open={open}
            email={email}
          />
        </Portal>
      )}
    </S.Root>
  );
};

export default Edit;
