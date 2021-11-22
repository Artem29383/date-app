import React from "react";
import Link from "next/link";
import { ROUTES } from "@types";

const Explore = () => {
  return (
    <div>
      <Link href={ROUTES.SETTINGS_PROFILE}>
        <a href={ROUTES.SETTINGS_PROFILE}>SETTINGS</a>
      </Link>
    </div>
  );
};

export default Explore;
