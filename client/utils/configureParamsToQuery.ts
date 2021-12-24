export const configureParamsToQuery = (params: any): string => {
  return params.reduce((acc: string, param: any, index: number) => {
    const key = Object.keys(param);
    if (!index) {
      // @ts-ignore
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions,no-return-assign,no-param-reassign
      return (acc += `?${key}=${param[key]}`);
    }
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions,no-return-assign,no-param-reassign
    return (acc += `&${key}=${param[key]}`);
  }, "");
};
