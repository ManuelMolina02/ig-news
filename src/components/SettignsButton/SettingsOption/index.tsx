import styles from './styles.module.scss'

type themeObjType = {
  name: string;
  bgPrimary: string;
  color: string;
}

type colorObjType = {
  name: string;
  primary: string;
}

interface SettingsOptionProps {
  keyOption: string;
  title: string;
  options: string[];
  useStyles: {
    theme: themeObjType,
    color: colorObjType,
  },
  action: (themeSelected: string) => void,
}


export function SettingsOption({ keyOption, title, options, action, useStyles }: SettingsOptionProps) {
  return (
    <>
      <div>
        <strong>{title}</strong>
        {
          options.map((option) => {
            return (
              <button
                key={option}
                className={styles.optionStyle}
                style={{
                  color: keyOption === option ? useStyles.theme.bgPrimary : useStyles.theme.color,
                  backgroundColor:
                    keyOption === option ? useStyles.color.primary : useStyles.theme.bgPrimary,
                }}
                onClick={() => action(option)}
              >
                <div>{option}</div>
              </button>
            )
          })
        }
      </div>
    </>
  )
}