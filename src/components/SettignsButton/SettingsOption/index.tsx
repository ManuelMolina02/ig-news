import { AiOutlineCheck } from 'react-icons/ai';
import { themes } from '../../../styles/theme';
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

type AvatarProps = {
  aspectSelected: string;
  title: string;
}

interface SettingsOptionProps {
  keyOption: string;
  title: string;
  options: string[];
  useStyles: {
    theme: themeObjType,
    color: colorObjType,
  },
  action?: (themeSelected: string) => void,
  avatarAction?: ({ aspectSelected, title }: AvatarProps) => void,
}


export function SettingsOption({ keyOption, title, options, action, avatarAction, useStyles }: SettingsOptionProps) {

  function selectedBg(title, option) {
    if (title === 'theme') {
      return themes.theme.find(data => data.name === option)?.bgPrimary
    } else if (title === 'colors') {
      return themes.colors.find(data => data.name === option)?.primary

    } else if (title === 'Hair' || title === 'Glasses' || title === 'TShirt' || title === 'Skin') {
      const data = themes.avatar.find(data => data.name === title)
      return data?.colors.find(data => data === option)
    }
  }

  return (
    <>
      <div>
        <strong>{title}</strong>
        <div>
          {
            options.map((option) => {
              return (
                <button
                  key={option}
                  className={styles.optionStyle}
                  style={{
                    color: keyOption === option ? useStyles.theme.bgPrimary : useStyles.theme.color,
                    backgroundColor: selectedBg(title, option),

                  }}
                  onClick={() => avatarAction ? avatarAction({ aspectSelected: option, title }) : action ? action(option) : null}
                >
                  {
                    keyOption === option && (
                      <AiOutlineCheck color={useStyles.theme.bgPrimary} />
                    )
                  }
                </button>
              )
            })
          }
        </div>
      </div>
    </>
  )
}