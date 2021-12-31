import { BadgeType } from "src/entities/user/types";

export const checkNotify = (badge: BadgeType) => {
  return badge.comments || badge.like || badge.subs;
};
