import { StoreValue } from "effector";
import { useStore } from "effector-react/ssr";
import { $user } from "src/entities/user/store";

export const useUser = (): StoreValue<typeof $user> => useStore($user);
