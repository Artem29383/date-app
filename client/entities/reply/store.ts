import { root } from "src/entities/root";
import { logout } from "pages/login/model/login";
import { IReplay } from "src/entities/replay/types";

export type IReplayState = IReplay[];

export const ReplaysInitialState: IReplayState = [];

export const $replays = root
  .createStore<IReplayState>(ReplaysInitialState)
  .reset(logout);
