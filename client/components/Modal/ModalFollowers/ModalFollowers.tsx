import React, { useEffect, useState } from "react";
import Modal from "components/Modal";
import * as S from "./ModalFollowers.styled";
import Link from "next/link";
import { ROUTES } from "@types";
import ImageWrapper from "components/ImageWrapper/ImageWrapper";
import { IUser } from "src/entities/user/types";
import { getFollowersAsync, getSubsAsync } from "src/entities/user/async";

type Props = {
  open: boolean;
  onClose: () => void;
  label: string;
  request: "followers" | "sub";
  userId: string;
};

const ModalFollowers = ({ open, onClose, label, request, userId }: Props) => {
  const [users, setUsers] = useState<IUser[]>([]);

  useEffect(() => {
    if (request === "followers" && open) {
      (async () => {
        const response = await getFollowersAsync({ id: userId });
        setUsers(response.followers);
      })();
    }
    if (request === "sub" && open) {
      (async () => {
        const response = await getSubsAsync({ id: userId });
        setUsers(response.followers);
      })();
    }
  }, [open, request, userId]);

  useEffect(() => {
    return () => {
      setUsers([]);
    };
  }, []);

  return (
    <Modal
      borderRadius={20}
      isFullWidth
      maxWidth={400}
      open={open}
      onClose={onClose}
    >
      <S.Root>
        <S.Label>{label}</S.Label>
        <S.List>
          {users.map((user: IUser) => (
            <Link key={user.id} href={`${ROUTES.PROFILE}/${user.id}`}>
              <a href={`${ROUTES.PROFILE}/${user.id}`}>
                <S.UserItem onClick={onClose}>
                  <ImageWrapper
                    borderRadius="50%"
                    overflow="hidden"
                    source={user.avatarUrl || ""}
                    width={44}
                    height={44}
                    mr={15}
                  />
                  <S.Username>{user.username}</S.Username>
                </S.UserItem>
              </a>
            </Link>
          ))}
        </S.List>
      </S.Root>
    </Modal>
  );
};

export default ModalFollowers;
