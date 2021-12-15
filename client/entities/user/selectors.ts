import { StoreValue } from "effector";
import { useStore } from "effector-react/ssr";
import { $currentUser, $user } from "src/entities/user/store";
import { currentAsync } from "pages/login/model/login";

export const useUser = (): StoreValue<typeof $user> => useStore($user);

export const useUserById = (): StoreValue<typeof $currentUser> =>
  useStore($currentUser);

export const useUserPending = (): boolean => useStore(currentAsync.pending);
