import React from "react";
import Link from "next/link";
import { ROUTES } from "@types";
import { useUser, useUserPending } from "src/entities/user/selectors";
import Feeds from "components/Feeds";

const Dashboard = () => {
  const userPending = useUserPending();
  const user = useUser();

  return (
    <div>
      <div>USERNAME: {userPending ? "" : user.username}</div>
      <Link href={ROUTES.SETTINGS_PROFILE}>
        <a href={ROUTES.SETTINGS_PROFILE}>SETTINGS</a>
      </Link>
      <Feeds />
    </div>
  );
};

export default Dashboard;
