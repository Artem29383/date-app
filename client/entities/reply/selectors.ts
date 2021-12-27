import { StoreValue } from "effector";
import { useStore } from "effector-react/ssr";
import { $replays } from "src/entities/replay/store";

export const useReplays = (): StoreValue<typeof $replays> => useStore($replays);
