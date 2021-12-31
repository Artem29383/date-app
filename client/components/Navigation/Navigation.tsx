import React, { useState } from "react";
import { icons } from "styles/icons";
import * as S from "./Navigation.styled";
import { Colors, ROUTES } from "@types";
import ActiveLink from "components/ActiveLink";
import ImageWrapper from "components/ImageWrapper/ImageWrapper";
import { useUser } from "src/entities/user/selectors";
import AreaPortal from "components/AreaPortal";
import Link from "next/link";
import useClickAway from "hooks/useClickAway";
import Portal from "components/Portal/Portal";
import Modal from "components/Modal";
import { useClientRender } from "hooks/useClientRender";
import { useToggle } from "hooks/useToggle";
import ModalUploadPost from "components/Modal/ModalUploadPost";
import { LikeNotify, Triangle } from "./Navigation.styled";
import { checkNotify } from "utils/checkNotify";

const Profile = icons.profile;
const ProfileFill = icons.profileFill;
const NewPublic = icons.newPublication;
const Direct = icons.direct;
const DirectFill = icons.directFill;
const Explore = icons.explore;
const ExploreFill = icons.exploreFill;
const Heart = icons.heart;
const HeartFill = icons.heartFill;
const Comment = icons.comment;
const User = icons.user;

type Props = {
  logout: () => void;
};

const Navigation = ({ logout }: Props) => {
  const { value: showLike, handleToggle } = useToggle(false);
  const { toggle, ref, active } = useClickAway();
  const { avatarUrl, id, badge } = useUser();
  const isNotify = checkNotify(badge);
  const isClient = useClientRender();
  const { handleOpen, value: open, handleClose } = useToggle(false);

  return (
    <>
      <S.Root>
        <ActiveLink
          href={ROUTES.DASHBOARD}
          IconActive={ProfileFill}
          IconDefault={Profile}
        />
        <ActiveLink
          marginLeft={23}
          href={ROUTES.DIRECT}
          IconActive={DirectFill}
          IconDefault={Direct}
        />
        <ActiveLink
          IconDefault={NewPublic}
          marginLeft={23}
          onClick={handleOpen}
        />
        <ActiveLink
          marginLeft={23}
          href={ROUTES.EXPLORE}
          IconActive={ExploreFill}
          IconDefault={Explore}
        />
        <S.LikeNotify onClick={handleToggle} marginLeft={23} marginRight={23}>
          {showLike ? <HeartFill /> : <Heart />}
          {isNotify && <S.Dot />}
          {isNotify && (
            <S.Notify>
              <S.Triangle />
              <S.ListNotify>
                {badge.like && (
                  <S.NotifyItem>
                    {badge.like} <HeartFill fill={Colors.white} />
                  </S.NotifyItem>
                )}
                {badge.comments && (
                  <S.NotifyItem>
                    {badge.comments} <Comment fill={Colors.white} />
                  </S.NotifyItem>
                )}
                {badge.subs && (
                  <S.NotifyItem>
                    {badge.subs} <User fill={Colors.white} />
                  </S.NotifyItem>
                )}
              </S.ListNotify>
            </S.Notify>
          )}
        </S.LikeNotify>
        <S.RootAvatar ref={ref} open={active} onClick={toggle}>
          <ImageWrapper
            overflow="hidden"
            maxWidth="19px"
            width="19px"
            height="19px"
            borderRadius="50%"
            maxHeight="19px"
            source={avatarUrl || ""}
          />
          {active && (
            <AreaPortal minHeightArea={128} left={-76} top={102}>
              <S.List>
                <S.Item>
                  <Link href={`${ROUTES.PROFILE}/${id}`}>
                    <a href={`${ROUTES.PROFILE}/${id}`}>Профиль</a>
                  </Link>
                </S.Item>
                <S.Item>
                  <Link href={ROUTES.LIKES}>
                    <a href={ROUTES.LIKES}>Сохранённое</a>
                  </Link>
                </S.Item>
                <S.Item>
                  <Link href={ROUTES.SETTINGS_PROFILE}>
                    <a href={ROUTES.SETTINGS_PROFILE}>Настройки</a>
                  </Link>
                </S.Item>
                <S.Item onClick={logout}>Выйти</S.Item>
              </S.List>
            </AreaPortal>
          )}
        </S.RootAvatar>
      </S.Root>
      {isClient && (
        <Portal id="modalUploadPost">
          <ModalUploadPost open={open} handleClose={handleClose} />
        </Portal>
      )}
    </>
  );
};

export default Navigation;
