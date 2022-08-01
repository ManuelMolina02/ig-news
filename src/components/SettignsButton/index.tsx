import { useTheme } from "../../contexts/theme";
import { useState } from "react";

import { SettingsOption } from "./SettingsOption";
import { IoMdSettings } from "react-icons/io";

import styles from "./styles.module.scss";
import { useRouter } from "next/router";

interface AvatarProps {
  aspectSelected: string;
  title: string;
}

export function SettignsButton() {

  const { pathname } = useRouter();

  const [showSettings, setShowSettings] = useState(false);
  const { theme, color, hair, glasses, tShirt, skin, variablesTheme } = useTheme();
  const [animation, setAnimation] = useState(styles.settingsContainer);

  function setTheme(themeSelected: string) {
    if (theme.name === themeSelected) {
      return;
    }

    variablesTheme.setThemeSelected(themeSelected);
    localStorage.setItem('ignews-theme', themeSelected)
  }

  function setColor(colorSelected: string) {
    if (color.name === colorSelected) {
      return;
    }

    variablesTheme.setColorSelected(colorSelected);
    localStorage.setItem('ignews-color', colorSelected)
  }

  function setAspect({ aspectSelected, title }: AvatarProps) {

    switch (title) {
      case 'Hair':
        variablesTheme.setHairSelected(aspectSelected);
        localStorage.setItem('ignews-hair', aspectSelected)
        break;
      case 'Glasses':
        variablesTheme.setGlassesSelected(aspectSelected);
        localStorage.setItem('ignews-glasses', aspectSelected)
        break;
      case 'TShirt':
        variablesTheme.setTShirtSelected(aspectSelected);
        localStorage.setItem('ignews-tShirt', aspectSelected)
        break;
      case 'Skin':
        variablesTheme.setSkinSelected(aspectSelected);
        localStorage.setItem('ignews-skin', aspectSelected)
        break;
      default:
        break;
    }
  }


  return (
    <>
      <button
        type="button"
        className={styles.settingButton}
        style={{ backgroundColor: theme.bgSecondary }}

        onClick={() => {
          setAnimation(styles.expandAnimation)
          setShowSettings(true)
        }}
      >
        <IoMdSettings color={theme.color} />
      </button>


      {showSettings && (
        <div className={styles.settingsContainer}>
          <div
            className={styles.settingsOverlay}
            onClick={() => {
              setAnimation(styles.reduceAnimation)
              setTimeout(() => {
                setShowSettings(false)
              }, 1000);
            }}
          ></div>
          <div
            className={`${animation} ${styles.settingsContent} `}
            style={{
              backgroundColor: theme.bgSecondary,
              color: theme.color,
              maxHeight: pathname === '/' ? "520px" : "382px",
            }}
          >
            <h3 style={{ borderBottom: `${theme.borderColor} 1px solid` }}>Settings</h3>

            <SettingsOption
              keyOption={theme.name}
              title={'theme'}
              action={setTheme}
              useStyles={{ theme, color }}
              options={['dark', 'light']}
            />

            <SettingsOption
              keyOption={color.name}
              title={'colors'}
              action={setColor}
              useStyles={{ theme, color }}
              options={['analogous', 'complementary']}
            />


            {
              pathname === '/' && (
                <>

                  <h3 style={{ borderBottom: `${theme.borderColor} 1px solid` }}>Avatar </h3>

                  <SettingsOption
                    keyOption={hair}
                    title={'Hair'}
                    avatarAction={setAspect}
                    useStyles={{ theme, color }}
                    options={["#263238", "#DBAD38", "#740700"]}
                  />

                  <SettingsOption
                    keyOption={glasses}
                    title={'Glasses'}
                    avatarAction={setAspect}
                    useStyles={{ theme, color }}
                    options={["#1C1C1C", "#003A7D", "#8B4300", "#980049", "#49002C"]}
                  />


                  <SettingsOption
                    keyOption={tShirt}
                    title={'TShirt'}
                    avatarAction={setAspect}
                    useStyles={{ theme, color }}
                    options={["#EF5D5D", "#AA0052", "#00AA81"]}
                  />


                  <SettingsOption
                    keyOption={skin}
                    title={'Skin'}
                    avatarAction={setAspect}
                    useStyles={{ theme, color }}
                    options={["#684938", "#8B5F46", "#D68B61", "#FFA07A"]}
                  />


                </>
              )

            }


          </div>
        </div>
      )}
    </>
  );
}
