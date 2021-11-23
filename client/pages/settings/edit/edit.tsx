import React, { useCallback, useEffect } from "react";

import * as S from "./Edit.styled";
import ImageWrapper from "components/ImageWrapper";
import { useUser } from "src/entities/user/selectors";
import Portal from "components/Portal";
import Modal from "components/Modal";
import { useToggle } from "hooks/useToggle";
import FileInput from "components/FileInput";
import { useClientRender } from "hooks/useClientRender";
import { useFileWork } from "hooks/useFileWork";
import { uploadImageAsync } from "src/entities/user/async";
import { updateUser } from "src/entities/user/store";
import { useEvent } from "effector-react";

const Edit = () => {
  const isClient = useClientRender();
  const { changeHandle, objectFile, setObjectFile } = useFileWork("image");
  const { avatarUrl, username, email } = useUser();
  const { handleOpen, value: open, handleClose } = useToggle(false);

  const updateUserEvent = useEvent(updateUser);

  const handleUploadImage = useCallback(
    (file: File | "destroy") => {
      if (!file) return;
      uploadImageAsync({ file, email }).then(resp => {
        if (resp) {
          updateUserEvent(resp);
          setObjectFile(null);
          handleClose();
        }
      });
    },
    [email, handleClose, setObjectFile, updateUserEvent]
  );

  useEffect(() => {
    if (objectFile) {
      handleUploadImage(objectFile);
    }
  }, [email, handleUploadImage, objectFile, updateUserEvent]);

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
              <S.ButtonModal
                onClick={() => {
                  handleUploadImage("destroy");
                  handleClose();
                }}
                color="#ed4956"
                fw="700"
              >
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
