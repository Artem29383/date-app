import React from "react";

import * as S from "./Edit.styled";
import ImageWrapper from "components/ImageWrapper";
import { useUser } from "src/entities/user/selectors";
import Portal from "components/Portal";
import Modal from "components/Modal";
import { useToggle } from "hooks/useToggle";
import FileInput from "components/FileInput";
import { useClientRender } from "hooks/useClientRender";

const Edit = () => {
  const isClient = useClientRender();
  const { avatarUrl, username } = useUser();
  const { handleOpen, value: open, handleClose } = useToggle(false);

  const changeHandle = () => {};

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
          <S.Button onClick={handleOpen}>Изменить фото профиля</S.Button>
        </S.ProfileActions>
      </S.Profile>
      {isClient && (
        <Portal id="modalChangeAvatar">
          <Modal
            borderRadius={12}
            maxWidth={400}
            open={open}
            onClose={handleClose}
          >
            <S.Content>
              <S.Title>Изменить фото профиля</S.Title>
              <S.ButtonModal color="#0095f6" fw="700">
                <FileInput onChange={changeHandle} />
                Загрузить фото
              </S.ButtonModal>
              <S.ButtonModal color="#ed4956" fw="700">
                Удалить текущее фото
              </S.ButtonModal>
              <S.ButtonModal onClick={handleClose} color="#000" fw="400">
                Отмена
              </S.ButtonModal>
            </S.Content>
          </Modal>
        </Portal>
      )}
    </S.Root>
  );
};

export default Edit;
