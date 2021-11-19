import { StoreValue } from "effector";
import { useStore } from "effector-react/ssr";
import { $user } from "src/entities/user/store";
import { currentAsync } from "pages/login/model/login";

export const useUser = (): StoreValue<typeof $user> => useStore($user);

export const useUserPending = (): boolean => useStore(currentAsync.pending);
