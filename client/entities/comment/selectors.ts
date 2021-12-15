import { StoreValue } from "effector";
import { useStore } from "effector-react/ssr";
import { $posts } from "src/entities/post/store";

export const usePosts = (): StoreValue<typeof $posts> => useStore($posts);
