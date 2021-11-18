import React from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";

import { Colors, ROUTES } from "@types";

import Button from "components/Button";
import Tab from "components/Tabs/Tab";
import H1 from "components/Text/H1";
import Input from "components/Input";
import ImageWrapper from "components/ImageWrapper";

import Logo from "assets/backgrounds/background-main-auth.jpeg";

import { icons } from "styles/icons";

import * as S from "./login.styled";
import { useTranslate } from "src/locales/library/useTranslate";
import Auth from "layouts/Auth";
import { FormTypeLogin } from "pages/login/model/types";
import { loginAsync } from "pages/login/model/login";

const Finger = icons.fingerPrint;

const schema = yup.object().shape({
  email: yup
    .string()
    .required()
    .email(),
  password: yup
    .string()
    .min(6, "Password less than 6 symbols")
    .required()
});

const Login = () => {
  const { t } = useTranslate("common");

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onSubmit"
  });
  const onSubmit = async (data: FormTypeLogin) => {
    await loginAsync(data);
  };

  return (
    <Auth>
      <S.Root>
        <Tab
          link={ROUTES.REGISTRATION}
          width={75}
          height={75}
          Icon={icons.signUp}
          color={Colors.white}
          position="absolute"
          top={0}
          right="125px"
          svgF={Colors.gray}
          svgH={35}
          svgW={35}
        />
        <Tab
          link={ROUTES.ROOT}
          width={75}
          height={75}
          Icon={icons.home}
          color={Colors.white}
          position="absolute"
          top={0}
          right="50px"
          svgF={Colors.gray}
          svgH={45}
          svgW={45}
        />
        <S.Form>
          <S.Title>
            <Finger fill={Colors.blue} width={100} height={100} />
            <S.Text>
              <H1 color={Colors.black}>{t("welcome")}</H1>
              <H1 color={Colors.black}>{t("signIn")}</H1>
            </S.Text>
          </S.Title>
          <S.RootForm onSubmit={handleSubmit(onSubmit)}>
            <Input
              isError={errors.email || ""}
              register={register("email")}
              borderRadius="5px 5px 0 0"
              label="Email"
              mb={5}
            />
            <Input
              isError={errors.password || ""}
              register={register("password")}
              borderRadius="0 0 5px 5px"
              label="Password"
              type="password"
            />
            <Button
              width={144}
              height={44}
              borderRadius={3}
              marginTop={20}
              disabled={false}
              onClick={handleSubmit(onSubmit)}
            >
              {t("login")}
            </Button>
          </S.RootForm>
        </S.Form>
        <ImageWrapper source={Logo.src} flexBasis="50%" />
      </S.Root>
    </Auth>
  );
};

export default Login;
