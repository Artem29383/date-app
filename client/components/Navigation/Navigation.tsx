import React from "react";
import { icons } from "styles/icons";
import * as S from "./Navigation.styled";
import { ROUTES } from "@types";
import ActiveLink from "components/ActiveLink";

const Profile = icons.profile;
const ProfileFill = icons.profileFill;
const NewPublic = icons.newPublication;
const NewPublicFIll = icons.newPublicationFill;
const Direct = icons.direct;
const DirectFill = icons.directFill;
const Explore = icons.explore;
const ExploreFill = icons.exploreFill;
const Heart = icons.heart;
const HeartFill = icons.heartFill;

const Navigation = () => {
  return (
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
        marginLeft={23}
        href={ROUTES.PUBLICATION}
        IconActive={NewPublicFIll}
        IconDefault={NewPublic}
      />
      <ActiveLink
        marginLeft={23}
        href={ROUTES.EXPLORE}
        IconActive={ExploreFill}
        IconDefault={Explore}
      />
      <ActiveLink
        marginLeft={23}
        href={ROUTES.LIKES}
        IconActive={HeartFill}
        IconDefault={Heart}
      />
    </S.Root>
  );
};

export default Navigation;
