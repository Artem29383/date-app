import React, { createContext } from 'react';

interface Props<T> {
  children: React.ReactNode;
  locales: { common: T }
}

export const Context = createContext({});

const TranslateProvider = ({ children, locales }: Props<object>) => (
  <Context.Provider value={locales}>
    {children}
  </Context.Provider>
)

export default TranslateProvider;
