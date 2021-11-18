import React from "react";
import { ROUTES } from "@types";
import Link from "next/link";

const Settings = () => {
  return (
    <div>
      <Link href={ROUTES.DASHBOARD}>
        <a href={ROUTES.DASHBOARD}>DASHBOARD</a>
      </Link>
    </div>
  );
};

export default Settings;
