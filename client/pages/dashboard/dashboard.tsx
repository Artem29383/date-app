import React from "react";
import Link from "next/link";
import { ROUTES } from "@types";
import { useUser, useUserPending } from "src/entities/user/selectors";

const Dashboard = () => {
  const userPending = useUserPending();
  const user = useUser();

  return (
    <div>
      <div>USERNAME: {userPending ? "" : user.username}</div>
      <Link href={ROUTES.SETTINGS}>
        <a href={ROUTES.SETTINGS}>SETTINGS</a>
      </Link>
    </div>
  );
};

export default Dashboard;
