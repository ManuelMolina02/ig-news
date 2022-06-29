import { Children } from 'react';
import styles from './styles.module.scss'

interface TooltipProps {
  text: string;
  children: React.ReactNode;
}


export function Tooltip({ text, children }: TooltipProps) {

  return (
    <div className={styles.tooltipContainer}>
      {children}

      <span>
        {text}
      </span>
    </div>
  )
}