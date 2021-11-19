import { fork, Scope, serialize, ValueMap } from "effector";
import { useMemo } from "react";

let scope: Scope;

function initializeScope(initialData: ValueMap | undefined) {
  // eslint-disable-next-line @typescript-eslint/naming-convention,no-underscore-dangle
  const _scope =
    scope ??
    fork({
      values: {
        ...(scope ? serialize(scope) : {}),
        ...initialData
      }
    });

  // For SSG and SSR always create a new scope
  if (typeof window === "undefined") return _scope;
  // Create the scope once in the client
  if (!scope) scope = _scope;

  return _scope;
}

export function useScope(initialState: ValueMap | undefined) {
  return useMemo(() => initializeScope(initialState), [initialState]);
}
