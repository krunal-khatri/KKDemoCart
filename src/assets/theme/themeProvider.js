/**
 * @format
 */
import React, {useContext, useState} from 'react';

import {THEMES} from './themes';

const ThemeContext = React.createContext({
  theme: THEMES.light,
});

export const ThemeContextProvider = ({children}) => {
  const [theme, setTheme] = useState('LIGHT');

  return (
    <ThemeContext.Provider value={{theme, setTheme}}>
      {theme ? children : null}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);

export const withTheme = Component =>
  React.forwardRef((props, ref) => {
    const {theme, setTheme} = useContext(ThemeContext);

    return (
      <Component
        {...props}
        ref={ref}
        theme={theme}
        setTheme={newTheme => setTheme(newTheme)}
      />
    );
  });
