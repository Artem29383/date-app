import React, { useEffect } from "react";
import Link from "next/link";
import { ROUTES } from "@types";
import { useUser } from "src/entities/user/selectors";
import { updateUser } from "src/entities/user/store";
import { IUser } from "src/entities/user/types";
import { useEvent } from "effector-react/ssr";

const Dashboard = ({ data }: { data: IUser }) => {
  const updateUserFC = useEvent(updateUser);
  const user = useUser();

  useEffect(() => {
    updateUserFC(data);
  }, [data, updateUserFC]);

  return (
    <div>
      <div>USERNAME: {user.username}</div>
      <Link href={ROUTES.SETTINGS}>
        <a href={ROUTES.SETTINGS}>SETTINGS</a>
      </Link>
    </div>
  );
};

export default Dashboard;
