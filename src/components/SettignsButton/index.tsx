import { useTheme } from "../../contexts/theme";
import { useState } from "react";

import { SettingsOption } from "./SettingsOption";
import { IoMdSettings } from "react-icons/io";

import styles from "./styles.module.scss";
import { useRouter } from "next/router";

import { themes } from "../../styles/theme";

interface AvatarProps {
  aspectSelected: string;
  title: string;
}

export function SettignsButton() {

  const { pathname } = useRouter();

  const [showSettings, setShowSettings] = useState(false);
  const { theme, color, avatar, variablesTheme } = useTheme();
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
    let keyData = title.toLowerCase();

    variablesTheme.setAvatar({
      ...avatar,
      [keyData]: aspectSelected
    });

    localStorage.setItem(`ignews-${keyData}`, aspectSelected)
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
        <IoMdSettings color={theme.color} title="Settings" />
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
              maxHeight: pathname === '/' ? "514px" : "208px",
            }}
          >
            <h3 style={{ borderColor: theme.borderColor }}>Settings</h3>

            <SettingsOption
              keyOption={theme.name}
              title={'theme'}
              action={setTheme}
              useStyles={{ theme, color }}
              options={themes.theme.map(data => data.name)}
            />

            <SettingsOption
              keyOption={color.name}
              title={'colors'}
              action={setColor}
              useStyles={{ theme, color }}
              options={themes.colors.map(data => data.name)}
            />

            {
              pathname === '/' && (
                <>

                  <h3 style={{ borderBottom: `${theme.borderColor} 1px solid` }}>Avatar </h3>

                  <SettingsOption
                    keyOption={avatar.hair}
                    title={'Hair'}
                    avatarAction={setAspect}
                    useStyles={{ theme, color }}
                    options={themes.avatar[0].colors}
                  />

                  <SettingsOption
                    keyOption={avatar.glasses}
                    title={'Glasses'}
                    avatarAction={setAspect}
                    useStyles={{ theme, color }}
                    options={themes.avatar[1].colors}
                  />


                  <SettingsOption
                    keyOption={avatar.tshirt}
                    title={'TShirt'}
                    avatarAction={setAspect}
                    useStyles={{ theme, color }}
                    options={themes.avatar[2].colors}
                  />


                  <SettingsOption
                    keyOption={avatar.skin}
                    title={'Skin'}
                    avatarAction={setAspect}
                    useStyles={{ theme, color }}
                    options={themes.avatar[3].colors}
                  />
                </>
              )
            }

          </div>
        </div>
      )}
    </>
  )
}