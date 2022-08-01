/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { themes } from '../styles/theme';

//definindo uma interface para o contexto
interface DefineThemeProps {
  children: ReactNode
}

//criando um contexto
export const DefineThemeContext = createContext({} as any);

//criando um provider
export function DefineThemeProvider({ children }: DefineThemeProps) {

  //variaveis de itens selecionados
  const [themeSelected, setThemeSelected] = useState('dark');
  const [colorSelected, setColorSelected] = useState('analogous');

  const [hairSelected, setHairSelected] = useState('#DBAD38')
  const [glassesSelected, setGlassesSelected] = useState('#003A7D')
  const [tShirtSelected, setTShirtSelected] = useState('#EF5D5D')
  const [skinSelected, setSkinSelected] = useState('#8B5F46')

  useEffect(() => {
    let theme = localStorage.getItem('ignews-theme')
    let color = localStorage.getItem('ignews-color')

    let hair = localStorage.getItem('ignews-hair')

    let glasses = localStorage.getItem('ignews-glasses')
    let tShirt = localStorage.getItem('ignews-tShirt')
    let skin = localStorage.getItem('ignews-skin')


    setThemeSelected(theme === null ? 'dark' : theme)
    setColorSelected(color === null ? 'analogous' : color)

    setHairSelected(hair === null ? '#263238' : hair)
    setGlassesSelected(glasses === null ? '#003A7D' : glasses)
    setTShirtSelected(tShirt === null ? '#EF5D5D' : tShirt)
    setSkinSelected(skin === null ? '#8B5F46' : skin)


  }, [])

  function findItem(data: Array<any>, key: string) {
    return data.find(item => item.name === key)
  }


  function findAvatarItem(data: Array<any>, key: string, feature: string) {
    const selectedItem = data.find(item => item.name === feature)
    return selectedItem?.colors.find(item => item === key)
  }


  //variaveis armazenam os itens ativos
  const [theme, setTheme] = useState({})
  const [color, setColor] = useState({})

  //avatar
  const [hair, setHair] = useState({})
  const [glasses, setGlasses] = useState({})
  const [tShirt, setTShirt] = useState({})
  const [skin, setSkin] = useState({})

  //funções que definem o item ativo
  const newTheme = findItem(themes.theme, themeSelected)
  const newColors = findItem(themes.colors, colorSelected)

  //avatar
  const newHair = findAvatarItem(themes.avatar, hairSelected, 'Hair')
  const newGlasses = findAvatarItem(themes.avatar, glassesSelected, 'Glasses')
  const newTShirt = findAvatarItem(themes.avatar, tShirtSelected, 'TShirt')
  const newSkin = findAvatarItem(themes.avatar, skinSelected, 'Skin')

  useEffect(() => {
    setTheme(newTheme)
  }, [themeSelected])

  useEffect(() => {
    setColor(newColors)
  }, [colorSelected])

  useEffect(() => {
    setHair(newHair)
  }, [hairSelected])

  useEffect(() => {
    setGlasses(newGlasses)
  }, [glassesSelected])

  useEffect(() => {
    setTShirt(newTShirt)
  }, [tShirtSelected])

  useEffect(() => {
    setSkin(newSkin)
  }, [skinSelected])

  //preparando variaveis utilizadas
  const variablesTheme = {
    setThemeSelected,
    setColorSelected,
    setHairSelected,
    setGlassesSelected,
    setTShirtSelected,
    setSkinSelected,
  }

  return (
    <DefineThemeContext.Provider value={{ variablesTheme, theme, color, hair, glasses, tShirt, skin }
    }>
      {children}
    </DefineThemeContext.Provider >
  );
}

export function useTheme() {
  const context = useContext(DefineThemeContext);
  return context
}