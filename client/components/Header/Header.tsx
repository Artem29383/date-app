import React, { useCallback, useEffect, useState } from "react";
import { ClientVariables, ROUTES } from "@types";
import * as S from "./Header.styled";
import { icons } from "styles/icons";
import InstaInput from "components/InstaInput";
import Navigation from "components/Navigation";
import AreaPortal from "components/AreaPortal/AreaPortal";
import ImageWrapper from "components/ImageWrapper";
import debounce from "lodash.debounce";
import { fetchUsersBySearchAsync } from "src/entities/user/async";
import { useToggle } from "hooks/useToggle";
import { IUser } from "src/entities/user/types";
import Link from "next/link";

const IconInsta = icons.instagramLogo;

type Props = {
  logout: () => void;
};

const Header = ({ logout }: Props) => {
  const { handleOpen, value: open, handleClose, handleToggle } = useToggle(
    false
  );
  const [value, setValue] = useState("");
  const [users, setUsers] = useState<IUser[]>([]);

  const fetchData = useCallback(
    async (search: string) => {
      if (!open) return;

      const response = await fetchUsersBySearchAsync({
        username: search,
        limit: 20,
        offset: 20
      });
      setUsers(response.users);
    },
    [open]
  );

  const debounceLoadData = useCallback(debounce(fetchData, 1000), [open]);

  useEffect(() => {
    debounceLoadData(value);
  }, [debounceLoadData, value]);

  const handleChange = useCallback(
    (e: { target: { value: React.SetStateAction<string> } }) => {
      setValue(e.target.value);
    },
    []
  );

  const handleReset = () => {
    setValue("");
    setUsers([]);
  };

  return (
    <S.Root style={{ height: `${ClientVariables.HEADER_HEIGHT}px` }}>
      <S.InnerRoot>
        <IconInsta />
        <S.Search>
          <InstaInput
            handleClose={handleClose}
            handleOpen={handleOpen}
            onReset={handleReset}
            onChange={handleChange}
            valueCount={users.length}
            value={value}
          />
          {open && (
            <AreaPortal triangleCenter minHeightArea={128} left="50%" top={102}>
              <S.List>
                {users.map(user => (
                  <Link key={user.id} href={`${ROUTES.PROFILE}/${user.id}`}>
                    <a href={`${ROUTES.PROFILE}/${user.id}`}>
                      <S.UserItem onClick={handleReset}>
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
            </AreaPortal>
          )}
        </S.Search>
        <Navigation logout={logout} />
      </S.InnerRoot>
    </S.Root>
  );
};

export default Header;
