/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { themes } from '../styles/theme';

//definindo uma interface para o contexto
interface DefineThemeProps {
  children: ReactNode
}

interface themeProps {
  bg: bgProps,
  color: colorProps,
}

type bgProps = {
  name: string,
  defaultColor: string,
  primary: string,
  secondary: string,
  tertiary: string,

  contrastColor: string,
  contrastLight: string,
  contrastDark: string,
}

type colorProps = {
  name: string,
  match: string[],
  primary: string,
  secondary: string,
  tertiary: string,

  contrastColor: string,
  contrastLight: string,
  contrastDark: string,
}

//criando um contexto
export const DefineThemeContext = createContext({} as any);

//criando um provider
export function DefineThemeProvider({ children }: DefineThemeProps) {

  //tema definido
  const [themeSelected, setThemeSelected] = useState('dark');

  const [colorSelected, setColorSelected] = useState('analogous');

  const [theme, setTheme] = useState({})

  const [color, setColor] = useState({})

  //função que define o tema
  const newTheme = themes.theme.find((item) => item.name === themeSelected);

  //função que define o tema
  const newColors = themes.colors.find((item) => item.name === colorSelected);

  useEffect(() => {
    setTheme(newTheme)
  }, [themeSelected])

  useEffect(() => {
    setColor(newColors)
  }, [colorSelected])

  //preparando constantes para envio
  const variablesTheme = {
    setThemeSelected,
    setColorSelected,
  }

  return (
    <DefineThemeContext.Provider value={{ variablesTheme, theme, color }
    }>
      {children}
    </DefineThemeContext.Provider >
  );
}

export function useTheme() {
  const context = useContext(DefineThemeContext);
  return context
}