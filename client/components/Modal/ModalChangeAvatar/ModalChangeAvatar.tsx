import React, { memo } from "react";
import * as S from "pages/settings/edit/Edit.styled";
import FileInput from "components/FileInput";
import Modal from "components/Modal/Modal";

type Props = {
  open: boolean;
  onClose: () => void;
  onChangePhoto: (e: any, fileList: Array<string> | null) => void;
  onUploadImage: (file: File | "destroy") => void;
};

const ModalChangeAvatar = ({
  open,
  onClose,
  onChangePhoto,
  onUploadImage
}: Props) => {
  return (
    <Modal borderRadius={12} maxWidth={400} open={open} onClose={onClose}>
      <S.Content>
        <S.Title>Изменить фото профиля</S.Title>
        <S.ButtonModal color="#0095f6" fw="700">
          <FileInput onChange={onChangePhoto} />
          Загрузить фото
        </S.ButtonModal>
        <S.ButtonModal
          onClick={() => {
            onUploadImage("destroy");
            onClose();
          }}
          color="#ed4956"
          fw="700"
        >
          Удалить текущее фото
        </S.ButtonModal>
        <S.ButtonModal onClick={onClose} color="#000" fw="400">
          Отмена
        </S.ButtonModal>
      </S.Content>
    </Modal>
  );
};

export default memo(ModalChangeAvatar);
