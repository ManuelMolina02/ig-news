import { useTheme } from "../../contexts/theme";
import { useState } from "react";

import { SettingsOption } from "./SettingsOption";
import { IoMdSettings } from "react-icons/io";

import styles from "./styles.module.scss";
import { useRouter } from "next/router";

export function SettignsButton() {

  const { pathname } = useRouter();

  const [showSettings, setShowSettings] = useState(false);
  const { theme, color, image, variablesTheme } = useTheme();
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

  function setImage(imageSelected: string) {
    if (image.name === imageSelected) {
      return;
    }

    variablesTheme.setImageSelected(imageSelected);
    localStorage.setItem('ignews-image', imageSelected)

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
            <h3 style={{ borderBottom: `${theme.color} 1px solid` }}>Settings</h3>

            <SettingsOption
              keyOption={theme.name}
              title={'theme'}
              options={['dark', 'light']}
              action={setTheme}
              useStyles={{ theme, color }}
            />

            <SettingsOption
              keyOption={color.name}
              title={'colors'}
              options={['analogous', 'complementary']}
              action={setColor}
              useStyles={{ theme, color }}
            />


            {
              pathname === '/' && (
                <SettingsOption
                  keyOption={image.name}
                  title={'girl coding'}
                  options={['girl-coding-1', 'girl-coding-2']}
                  action={setImage}
                  useStyles={{ theme, color }}
                />
              )

            }


          </div>
        </div>
      )}
    </>
  );
}
