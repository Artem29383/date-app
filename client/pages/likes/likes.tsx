import React from "react";
import Link from "next/link";
import { ROUTES } from "@types";

const Likes = () => {
  return (
    <div>
      <Link href={ROUTES.SETTINGS}>
        <a href={ROUTES.SETTINGS}>SETTINGS</a>
      </Link>
    </div>
  );
};

export default Likes;
