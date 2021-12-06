import React, { memo, useCallback } from "react";

import * as S from "./SubmitPost.styled";
import ImageWrapper from "components/ImageWrapper";
import { useUser } from "src/entities/user/selectors";
import Accordion from "components/Accordion";
import Toggle from "components/Toggle";

type Props = {
  base64: string;
  contentHeight: number;
  description: string;
  setDescription: (p: string) => void;
  disableComments: boolean;
  setDisableComments: (p: boolean) => void;
};

const SubmitPost = ({
  base64,
  contentHeight,
  description = "",
  disableComments,
  setDisableComments,
  setDescription
}: Props) => {
  const { username, avatarUrl } = useUser();

  const handleChange = useCallback(
    (e: { target: { value: string } }) => {
      setDescription(e.target.value.substr(0, 2200));
    },
    [setDescription]
  );

  return (
    <S.Root>
      <img
        src={base64}
        style={{
          width: `${contentHeight}px`,
          margin: "0 auto 0 0",
          height: `${contentHeight}px`
        }}
        alt=""
      />
      <S.Area>
        <S.UserHeader>
          <ImageWrapper
            marginRight={12}
            width={28}
            height={28}
            borderRadius="50%"
            overflow="hidden"
            source={avatarUrl || ""}
          />
          <S.UserName>{username}</S.UserName>
        </S.UserHeader>
        <S.PostField
          value={description}
          onChange={handleChange}
          placeholder="Придумайте подпись..."
        />
        <S.PostFieldRow>
          <S.MaxSymbols>{description.length}/2200</S.MaxSymbols>
        </S.PostFieldRow>
        <S.Menu>
          <Accordion label="Расширенные возможности">
            <S.Row>
              <S.Label>Выключить комментарии</S.Label>
              <Toggle
                toggle={setDisableComments}
                value={disableComments}
                width={44}
              />
            </S.Row>
          </Accordion>
        </S.Menu>
      </S.Area>
    </S.Root>
  );
};

export default memo(SubmitPost);
