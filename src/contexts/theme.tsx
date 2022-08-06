/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { themes } from '../styles/theme';

interface DefineThemeProps {
  children: ReactNode
}

export const DefineThemeContext = createContext({} as any);

export function DefineThemeProvider({ children }: DefineThemeProps) {
  function findItem(data: Array<any>, key: string) {
    return data.find(item => item.name === key)
  }

  function findAvatarItem(data: Array<any>, key: string, feature: string) {
    const selectedItem = data.find(item => item.name === feature)
    return selectedItem?.colors.find(item => item === key)
  }


  const [themeSelected, setThemeSelected] = useState('dark');
  const [colorSelected, setColorSelected] = useState('analogous');

  const [avatarSelected, setAvatarSelected] = useState({
    hair: '#DBAD38',
    glasses: '#003A7D',
    tshirt: '#EF5D5D',
    skin: '#8B5F46',
  });

  useEffect(() => {
    let theme = localStorage.getItem('ignews-theme')
    let color = localStorage.getItem('ignews-color')

    let hairLocal = localStorage.getItem('ignews-hair')
    let glassesLocal = localStorage.getItem('ignews-glasses')
    let tshirtLocal = localStorage.getItem('ignews-tshirt')
    let skinLocal = localStorage.getItem('ignews-skin')

    setThemeSelected(!theme ? 'dark' : theme)
    setColorSelected(!color ? 'analogous' : color)

    const aspectAvatar = {
      hair: !hairLocal ? '#DBAD38' : hairLocal,
      glasses: !glassesLocal ? '#003A7D' : glassesLocal,
      tshirt: !tshirtLocal ? '#EF5D5D' : tshirtLocal,
      skin: !skinLocal ? '#8B5F46' : skinLocal,
    }

    setAvatarSelected(aspectAvatar)
  }, [])

  const [theme, setTheme] = useState({})
  const [color, setColor] = useState({})
  const [avatar, setAvatar] = useState({})

  const newTheme = findItem(themes.theme, themeSelected)
  const newColors = findItem(themes.colors, colorSelected)

  const newHair = findAvatarItem(themes.avatar, avatarSelected.hair, 'Hair')
  const newGlasses = findAvatarItem(themes.avatar, avatarSelected.glasses, 'Glasses')
  const newTShirt = findAvatarItem(themes.avatar, avatarSelected.tshirt, 'TShirt')
  const newSkin = findAvatarItem(themes.avatar, avatarSelected.skin, 'Skin')

  useEffect(() => {
    setTheme(newTheme)
  }, [themeSelected])

  useEffect(() => {
    setColor(newColors)
  }, [colorSelected])

  useEffect(() => {
    setAvatar({
      hair: newHair,
      glasses: newGlasses,
      tshirt: newTShirt,
      skin: newSkin,
    })
  }, [
    avatarSelected
  ])

  const variablesTheme = {
    setThemeSelected,
    setColorSelected,
    setAvatar,
  }

  return (
    <DefineThemeContext.Provider value={{ variablesTheme, theme, color, avatar }}>
      {children}
    </DefineThemeContext.Provider >
  );
}

export function useTheme() {
  const context = useContext(DefineThemeContext);
  return context
}