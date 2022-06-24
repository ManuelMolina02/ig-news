import Link from 'next/link'
import { useRouter } from 'next/router';
import { useState } from 'react'
import { useTheme } from '../../contexts/theme';
import styles from "./styles.module.scss";


interface ActiveLinkProps {
  title: string,
  href: string
}

export function ActiveLink({ title, href }: ActiveLinkProps) {
  const { theme, color } = useTheme()

  let style = {
    color: theme.color,
    backgroundColor: theme.bgHover,
  }

  const [elementMouseHover, setElementMouseHover] = useState('')
  const [mouseActive, setMouseActive] = useState(false)
  const { pathname } = useRouter()

  function enterSection(slug: string) {
    setElementMouseHover(slug)
    setMouseActive(true)
  }

  function closeSection(slug: string) {
    setElementMouseHover(slug)
    setMouseActive(false)
  }

  return (
    <Link
      href={href}
    >
      <a
        onMouseEnter={() => enterSection(title)}
        onMouseLeave={() => closeSection(title)}
        style={
          mouseActive && title === elementMouseHover ? style : {}
        }>
        {
          pathname === href ? (
            <>
              <strong>{title}</strong>
              <div className={styles.line} style={{ backgroundColor: color.primary }}></div>
            </>
          ) :
            <>
              {title}
            </>
        }
      </a>
    </Link>
  )
}