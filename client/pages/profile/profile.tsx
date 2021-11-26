import React from "react";

import * as S from "./Profile.styled";
import ImageWrapper from "components/ImageWrapper";
import { useUser } from "src/entities/user/selectors";
import Button from "components/Button";
import { ROUTES } from "@types";
import { useToggle } from "hooks/useToggle";
import Portal from "components/Portal/Portal";
import WrapperModalChangeAvatar from "components/Modal/ModalChangeAvatar/WrapperModalChangeAvatar";
import { useClientRender } from "hooks/useClientRender";

const Profile = () => {
  const isClient = useClientRender();
  const { avatarUrl, username, description, email } = useUser();
  const { handleOpen, value: open, handleClose } = useToggle(false);

  return (
    <>
      <S.Root>
        <S.Header>
          <ImageWrapper
            onClick={handleOpen}
            flexShrink={0}
            margin="0 90px 0 30px"
            height={150}
            width={150}
            overflow="hidden"
            borderRadius="50%"
            source={avatarUrl || ""}
          />
          <S.Content>
            <S.Row>
              <S.Name>{username}</S.Name>
              <Button link={ROUTES.SETTINGS_PROFILE} typeButton="facebook">
                Редактировать профиль
              </Button>
            </S.Row>
            <S.Row>
              <S.Text>
                <S.Bold>5</S.Bold>
                публикаций
              </S.Text>
              <S.Text>
                <S.Bold>83</S.Bold>
                подписчиков
              </S.Text>
              <S.Text>
                <S.Bold>71</S.Bold>
                подписок
              </S.Text>
            </S.Row>
            <S.Row>
              <S.Bold>{description}</S.Bold>
            </S.Row>
          </S.Content>
        </S.Header>
      </S.Root>
      {isClient && (
        <Portal id="modalChangeAvatar">
          <WrapperModalChangeAvatar
            onClose={handleClose}
            open={open}
            email={email}
          />
        </Portal>
      )}
    </>
  );
};

export default Profile;
