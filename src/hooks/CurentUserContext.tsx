import React, {
  FC,
  useState,
  createContext,
  useEffect,
  useContext,
} from 'react';
import { CurrentUser } from '../components/Types';

type ContextType = {
  currentUser: CurrentUser;
  setCurrentUser: React.Dispatch<React.SetStateAction<CurrentUser>>;
};

const CurrrentUserContexta = createContext({} as ContextType);

export const useCurentUserContexta = () => useContext(CurrrentUserContexta);

export const CurrentUserProvidera: FC = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<CurrentUser>(() => {
    const usersJSON = localStorage.getItem('currentUser');

    return usersJSON ? (JSON.parse(usersJSON) as CurrentUser) : null;
  });
  const value = {
    currentUser,
    setCurrentUser,
  };

  useEffect(() => {
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <CurrrentUserContexta.Provider value={value}>
      {children}
    </CurrrentUserContexta.Provider>
  );
};

// eslint-disable-next-line
