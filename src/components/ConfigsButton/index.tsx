import styles from "./styles.module.scss";
import { IoMdSettings } from "react-icons/io";
import { useState } from "react";
import { useTheme } from "../../contexts/theme";

export function ConfigsButton() {
  const [showSettings, setShowSettings] = useState(false);
  const [styleColor, setStyleColor] = useState("");

  const { theme, color, image, variablesTheme } = useTheme();

  function setTheme(themeSelected: string) {
    if (theme.name === themeSelected) {
      return;
    }

    variablesTheme.setThemeSelected(themeSelected);
  }

  function setColor(colorSelected: string) {
    if (color.name === colorSelected) {
      return;
    }

    variablesTheme.setColorSelected(colorSelected);
    setStyleColor(colorSelected === "analogous" ? "#c40d6f" : "#eba417");
  }

  function setImage(imageSelected: string) {
    if (image.name === imageSelected) {
      return;
    }

    variablesTheme.setImageSelected(imageSelected);
  }

  return (
    <>
      <button
        type="button"
        className={styles.settingButton}
        style={{ backgroundColor: theme.bgSecondary }}
        onClick={() => setShowSettings(true)}
      >
        <IoMdSettings color="#a3afa8" />
      </button>

      {showSettings && (
        <div className={styles.settingsContainer}>
          <div
            className={styles.settingsOverlay}
            onClick={() => setShowSettings(false)}
          ></div>
          <div
            className={styles.settingsContent}
            style={{ backgroundColor: theme.bgPrimary, color: theme.color }}
          >
            <h3>Settings</h3>
            <br />
            <div>
              <strong>themes</strong>
              <button
                style={{
                  backgroundColor: theme.bgSecondary,
                  color: theme.color,
                  borderColor:
                    theme.name === "dark" ? styleColor : "transparent",
                }}
                className={styles.settingOptions}
                onClick={() => setTheme("dark")}
              >
                dark
              </button>
              <button
                style={{
                  backgroundColor: theme.bgSecondary,
                  color: theme.color,
                  borderColor:
                    theme.name === "light" ? styleColor : "transparent",
                }}
                className={styles.settingOptions}
                onClick={() => setTheme("light")}
              >
                light
              </button>
            </div>

            <br />
            <div>
              <strong>colors</strong>

              <button
                style={{
                  backgroundColor: theme.bgSecondary,
                  color: theme.color,
                  borderColor:
                    color.name === "analogous" ? styleColor : "transparent",
                }}
                className={styles.settingOptions}
                onClick={() => setColor("analogous")}
              >
                analogous
              </button>
              <button
                style={{
                  backgroundColor: theme.bgSecondary,
                  color: theme.color,
                  borderColor:
                    color.name === "complementary" ? styleColor : "transparent",
                }}
                className={styles.settingOptions}
                onClick={() => setColor("complementary")}
              >
                complementary
              </button>
            </div>

            <br />
            <div>
              <strong>person</strong>

              <button
                style={{
                  backgroundColor: theme.bgSecondary,
                  color: theme.color,
                  borderColor:
                    image.name === "girl-coding-1" ? styleColor : "transparent",
                }}
                className={styles.settingOptions}
                onClick={() => setImage('girl-coding-1')}
              >
                girl-coding 1
              </button>
              <button
                style={{
                  backgroundColor: theme.bgSecondary,
                  color: theme.color,
                  borderColor:
                    image.name === "girl-coding-2" ? styleColor : "transparent",
                }}
                className={styles.settingOptions}
                onClick={() => setImage('girl-coding-2')}
              >
                girl-coding 2
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
