import React, { FC, createContext, useContext, useReducer } from 'react';
import { CurrentUser } from '../components/Types';

type State = {
  currentUser: CurrentUser;
  isLogin: boolean;
  // darkMode: boolean;
};

type Action = {
  type: 'saveUser';
  setUser: CurrentUser;
  isLogin: boolean;
};
// | {
//     type: 'setDarkMode';
//   }
// | {
//     type: 'setLightMode';
//   };

type ContextType = {
  state: State;
  dispatch: React.Dispatch<Action>;
};

const LoginContext = createContext({} as ContextType);

export const useLoginContext = () => useContext(LoginContext);

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'saveUser': {
      localStorage.setItem('currentUser', JSON.stringify(action.setUser));
      localStorage.setItem('isLogin', JSON.stringify(action.isLogin));

      return {
        ...state,
        currentUser: action.setUser,
        isLogin: action.isLogin,
      };
    }

    // case 'setDarkMode':
    //   localStorage.setItem('darkMode', 'on');

    //   return {
    //     ...state,
    //     darkMode: true,
    //   };
    // case 'setLightMode':
    //   localStorage.setItem('darkMode', 'off');

    //   return {
    //     ...state,
    //     darkMode: false,
    //   };

    default:
      return state;
  }
};

const usersJSON = localStorage.getItem('currentUser');
const initCurrentUser = usersJSON
  ? (JSON.parse(usersJSON) as CurrentUser)
  : null;

const initialState = {
  currentUser: initCurrentUser,
  isLogin: localStorage.getItem('isLogin') === 'true',
  // darkMode: localStorage.getItem('darkMode') === 'on',
};

export const LoginProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const value = { state, dispatch };

  return (
    <LoginContext.Provider value={value}>{children}</LoginContext.Provider>
  );
};

// eslint-disable-next-line
