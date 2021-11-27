import React, { FC, createContext, useContext, useReducer } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ThemeProvider, Theme, createTheme } from '@mui/material/styles';
import { CurrentUser } from '../components/Types';

type State = {
  currentUser: CurrentUser;
  isLogin: boolean;
  theme: Theme;
  drawerIsOpen: boolean;
};

type Action =
  | {
      type: 'saveUser';
      setUser: CurrentUser;
      isLogin: boolean;
    }
  | {
      type: 'OpenDrawer';
    }
  | {
      type: 'closeDrawer';
    }
  | {
      type: 'setDarkMode';
    }
  | {
      type: 'setLightMode';
    };

const themeDark = createTheme({
  palette: {
    mode: 'dark',
  },
});

const themeLight = createTheme({
  palette: {
    mode: 'light',
  },
});

type ContextType = {
  state: State;
  dispatch: React.Dispatch<Action>;
};

const AppContext = createContext({} as ContextType);

export const useAppContext = () => useContext(AppContext);

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
    case 'OpenDrawer':
      return {
        ...state,
        drawerIsOpen: true,
      };
    case 'closeDrawer':
      return {
        ...state,
        drawerIsOpen: false,
      };
    case 'setDarkMode':
      localStorage.setItem('darkMode', JSON.stringify('dark'));

      return {
        ...state,
        theme: themeDark,
      };
    case 'setLightMode':
      localStorage.setItem('darkMode', JSON.stringify('light'));

      return {
        ...state,
        theme: themeLight,
      };

    default:
      return state;
  }
};

const usersJSON = localStorage.getItem('currentUser');
const initCurrentUser = usersJSON
  ? (JSON.parse(usersJSON) as CurrentUser)
  : null;

const initialState: State = {
  currentUser: initCurrentUser,
  isLogin: localStorage.getItem('isLogin') === 'true',
  drawerIsOpen: false,
  theme: localStorage.getItem('darkMode') === 'light' ? themeLight : themeDark,
};

// ----------React Queryの設定----------------------
const queryClient = new QueryClient();

export const AppProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const value = { state, dispatch };

  return (
    <QueryClientProvider client={queryClient}>
      <AppContext.Provider value={value}>
        <ThemeProvider theme={state.theme}>{children}</ThemeProvider>
      </AppContext.Provider>
    </QueryClientProvider>
  );
};

// eslint-disable-next-line
