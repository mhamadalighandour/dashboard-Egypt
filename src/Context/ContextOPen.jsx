import React, { createContext, useContext, useState } from "react";

const ContextOpen = createContext({});

const ContextProvider = ({ children }) => {
  const [openMenu, setOpenMenu] = useState(false);

  const changeMenu = () => {
    setOpenMenu(!openMenu);
  };
  return (
    <ContextOpen.Provider value={{ openMenu, changeMenu }}>
      {children}
    </ContextOpen.Provider>
  );
};

export default ContextProvider;

export const useContextHook = () => {
  return useContext(ContextOpen);
};
