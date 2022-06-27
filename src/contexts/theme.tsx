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
  const [imageSelected, setImageSelected] = useState('girl-coding-1')

  useEffect(() => {
    let theme = localStorage.getItem('ignews-theme')
    let color = localStorage.getItem('ignews-color')
    let image = localStorage.getItem('ignews-image')


    setThemeSelected(theme === null ? 'dark' : theme)
    setColorSelected(color === null ? 'analogous' : color)
    setImageSelected(image === null ? 'girl-coding-1' : image)

    document.body.style.setProperty('--bg-default', theme === 'dark' ? '#121214' : '#e5e5e5')

  }, [])

  function findItem(data: Array<any>, key: string) {
    return data.find(item => item.name === key)
  }



  //variaveis armazenam os itens ativos
  const [theme, setTheme] = useState({})
  const [color, setColor] = useState({})
  const [image, setImage] = useState({})

  //funções que definem o item ativo
  const newTheme = findItem(themes.theme, themeSelected)
  const newColors = findItem(themes.colors, colorSelected)
  const newImage = findItem(themes.images, imageSelected)

  useEffect(() => {
    setTheme(newTheme)
  }, [themeSelected])

  useEffect(() => {
    setColor(newColors)
  }, [colorSelected])


  useEffect(() => {
    const selectedImageType = findItem(newImage.styles, colorSelected)
    setImage({
      ...selectedImageType,
      name: newImage.name
    })
  }, [imageSelected, colorSelected])

  //preparando variaveis utilizadas
  const variablesTheme = {
    setThemeSelected,
    setColorSelected,
    setImageSelected
  }

  return (
    <DefineThemeContext.Provider value={{ variablesTheme, theme, color, image }
    }>
      {children}
    </DefineThemeContext.Provider >
  );
}

export function useTheme() {
  const context = useContext(DefineThemeContext);
  return context
}