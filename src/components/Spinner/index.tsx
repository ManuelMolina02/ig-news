import { useEffect, useState } from 'react';
import { ImSpinner2 } from 'react-icons/im';
import styles from './styles.module.scss'

interface SpinnerProps {
  color: string,
  size: 'sm' | 'md' | 'lg',
  mg?: string
}

export function Spinner({ color, size, mg }: SpinnerProps) {

  const [iconSize, setIconSize] = useState({});

  useEffect(() => {
    if (size === 'sm') {
      setIconSize({ width: '20px', height: '20px' });
    } else if (size === 'md') {
      setIconSize({ width: '60px', height: '60px' });
    } else if (size === 'lg') {
      setIconSize({ width: '100px', height: '100px' });
    }
  }, [size])


  return (
    <ImSpinner2 className={styles.spinner} color={color} style={{ ...iconSize, margin: mg }} />
  )
}