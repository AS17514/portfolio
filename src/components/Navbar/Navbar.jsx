import { useState, useEffect } from 'react'
import styles from './Navbar.module.css'

const navItems = [
  { label: '首页', anchor: 'hero' },
  { label: '关于', anchor: 'about' },
  { label: '项目', anchor: 'projects' },
  { label: '优势', anchor: 'strengths' },
  { label: '联系', anchor: 'contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > window.innerHeight * 0.8)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollTo = (anchor) => {
    const el = document.getElementById(anchor)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.inner}>
        <button className={styles.logo} onClick={() => scrollTo('hero')}>
          AS
        </button>
        <ul className={styles.links}>
          {navItems.map((item) => (
            <li key={item.anchor}>
              <button
                className={styles.link}
                onClick={() => scrollTo(item.anchor)}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}
