import { FaChevronDown } from 'react-icons/fa'
import styles from './Hero.module.css'

export default function Hero() {
  const scrollToAbout = () => {
    const el = document.getElementById('about')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="hero" className={styles.hero}>
      <video
        className={styles.video}
        src="/portfolio/videos/hero-bg.mp4"
        autoPlay
        muted
        loop
        playsInline
      />
      <div className={styles.overlay} />
      <div className={styles.content}>
        <div className={styles.centerColumn}>
          <h1 className={styles.title}>AS</h1>
          <p className={styles.subtitle}>游戏程序 / 技术美术</p>
        </div>
        <div className={styles.cardRing}>
          <div className={styles.card}>
            <img
              src="/portfolio/images/poster.png"
              alt="The Law 海报"
              className={styles.posterImg}
            />
            <div className={styles.cardShine} />
          </div>
        </div>
      </div>
      <button className={styles.scroll} onClick={scrollToAbout}>
        <FaChevronDown />
      </button>
    </section>
  )
}
