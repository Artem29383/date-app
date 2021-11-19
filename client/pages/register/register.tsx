import React from "react";
import { Colors, ROUTES } from "@types";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import * as yup from "yup";
import { useTranslate } from "src/locales/library/useTranslate";
import { icons } from "styles/icons";
import Logo from "backgrounds/background-main-auth.jpeg";

import H1 from "components/Text/H1";
import Button from "components/Button";
import Input from "components/Input";
import CountrySelect from "components/CountrySelect";
import ImageWrapper from "components/ImageWrapper";
import Auth from "layouts/Auth";
import { NextPage } from "next";
import Tab from "components/Tabs/Tab";
import * as S from "./register.styled";
import { FormType } from "pages/register/model/types";
import { registerAsync } from "pages/register/model/register";

const Unlocker = icons.unlocker;

const schema = yup.object().shape({
  email: yup
    .string()
    .required()
    .email(),
  password: yup
    .string()
    .min(6, "Password less than 6 symbols")
    .required(),
  confirm: yup
    .string()
    .required("Confirm Password is required")
    .oneOf([yup.ref("password"), null], "Passwords does not match"),
  username: yup.string().required(),
  countries: yup.string().required()
});

const Register: NextPage = () => {
  const { t } = useTranslate("common");
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onSubmit"
  });

  const onSubmit = async (data: FormType) => {
    await registerAsync(data);
  };

  return (
    <Auth>
      <S.Root>
        <Tab
          link={ROUTES.LOGIN}
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
            <Unlocker fill={Colors.blue} width={100} height={100} />
            <S.Text>
              <H1 color={Colors.black}>{t("welcome")}</H1>
              <H1 color={Colors.black}>{t("signUp")}</H1>
            </S.Text>
          </S.Title>
          <S.RootForm autoComplete="false" onSubmit={handleSubmit(onSubmit)}>
            <Input
              isError={errors.email}
              register={register("email")}
              label="Email"
              type="email"
              mb={5}
            />
            <Input
              isError={errors.password}
              register={register("password")}
              label="Password"
              type="password"
              mb={5}
            />
            <Input
              isError={errors.confirm}
              register={register("confirm")}
              label="Confirm"
              type="password"
              mb={5}
            />
            <Input
              isError={errors.username}
              register={register("username")}
              label="Username"
              mb={5}
            />
            <CountrySelect
              onCallback={setValue as <T, R>(p1?: T, p2?: R) => void}
              isError={errors.countries}
              register={register("countries")}
              maxWidth={200}
            />
            <Button
              width={144}
              height={44}
              disabled={false}
              borderRadius={3}
              marginTop={20}
              onClick={handleSubmit(onSubmit)}
            >
              {t("registration")}
            </Button>
          </S.RootForm>
        </S.Form>
        <ImageWrapper source={Logo.src} flexBasis="50%" />
      </S.Root>
    </Auth>
  );
};

export default Register;
