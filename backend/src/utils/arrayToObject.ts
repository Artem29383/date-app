export const arrayToObject = <T extends { id: string }>(array: T[]) =>
  array.reduce(
    (acc, elem) => ({
      ...acc,
      [elem.id]: elem,
    }),
    {},
  );
