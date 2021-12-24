import React from "react";

import * as S from "./FormSettings.styled";
import TextField from "components/TextField";
import Button from "components/Button";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import { IUserUpdate } from "src/entities/user/types";
import { updateUserAsync } from "src/entities/user/async";
import { updateUser } from "src/entities/user/store";
import { useEvent } from "effector-react";

const schema = yup.object().shape({
  username: yup
    .string()
    .required()
    .min(3)
    .max(16),
  age: yup.string().optional(),
  description: yup
    .string()
    .max(255)
    .optional()
});

type Props = {
  age: number;
  description: string;
  username: string;
  email: string;
};

const FormSettings = ({ age, description, email, username }: Props) => {
  const updateUserEvent = useEvent(updateUser);
  const { register, handleSubmit } = useForm({
    resolver: yupResolver(schema),
    mode: "onSubmit",
    defaultValues: {
      username,
      age: age || "",
      description,
      email
    }
  });
  const onSubmit = async (data: IUserUpdate) => {
    const response = await updateUserAsync(data);
    if (response) {
      updateUserEvent(response);
    }
  };

  return (
    <S.Root onSubmit={handleSubmit(onSubmit)}>
      <S.Row flex="center">
        <S.Label>Эл. адрес</S.Label>
        <S.Wrapper>
          <TextField
            disabled
            required
            register={{
              ...register("email"),
              onChange: () => {},
              name: "ss"
            }}
            placeholder="Эл. адрес"
          />
        </S.Wrapper>
      </S.Row>
      <S.Row flex="center">
        <S.Label>Имя пользователя</S.Label>
        <S.Wrapper>
          <TextField
            required
            register={register("username")}
            placeholder="Имя пользователя"
          />
        </S.Wrapper>
      </S.Row>
      <S.Row flex="center">
        <S.Label>Возраст</S.Label>
        <S.Wrapper>
          <TextField
            type="number"
            register={register("age")}
            placeholder="Возраст"
          />
        </S.Wrapper>
      </S.Row>
      <S.Row flex="flex-start">
        <S.Label>О себе</S.Label>
        <S.Wrapper>
          <TextField
            register={register("description")}
            isArea
            placeholder="О себе"
          />
        </S.Wrapper>
      </S.Row>
      <S.Row flex="center">
        <S.Label />
        <S.Wrapper>
          <Button onClick={handleSubmit(onSubmit)} typeButton="facebook">
            Отправить
          </Button>
        </S.Wrapper>
      </S.Row>
    </S.Root>
  );
};

export default FormSettings;
