import { createContext, useState } from "react";

export const AppContext = createContext(undefined);

export const AppProvider = ({ children }) => {
  function useLoggedIn() {
    const [loggedIn, setLoggedIn] = useState(false);
    const get = () => {
      return loggedIn;
    };

    return { get, setLoggedIn };
  }
  function useLoggedInUsers() {
    const [loggedInUser, setLoggedInUser] = useState();
    const get = () => {
      return loggedInUser;
    };

    return { get, setLoggedInUser };
  }

  const loginState = useLoggedIn();
  const currloggedInUser = useLoggedInUsers();
};

return (
  <AppContext.Provider value={(loginState, currloggedInUser)}>
    {children}
  </AppContext.Provider>
);
