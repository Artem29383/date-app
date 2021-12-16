import { StoreValue } from "effector";
import { useStore } from "effector-react/ssr";
import { $comments } from "src/entities/comment/store";

export const useComments = (): StoreValue<typeof $comments> =>
  useStore($comments);
