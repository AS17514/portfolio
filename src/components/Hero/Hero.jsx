import { FaChevronDown } from 'react-icons/fa'
import projects from '../../data/projects.json'
import styles from './Hero.module.css'

const ORBIT_RADIUS = 320
const CARD_W = 160
const CARD_H = 240
const TOTAL = projects.length

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
        {/* 🔄 行星环轨道：卡牌围绕中心公转 */}
        <div className={styles.orbitRing}>
          <div className={styles.orbitStage}>
            {projects.map((proj, i) => {
              const angle = (360 / TOTAL) * i
              return (
                <div
                  key={proj.id}
                  className={styles.orbitCard}
                  style={{
                    width: CARD_W,
                    height: CARD_H,
                    marginLeft: -CARD_W / 2,
                    marginTop: -CARD_H / 2,
                    transform: `rotateY(${angle}deg) translateZ(${ORBIT_RADIUS}px)`,
                  }}
                >
                  <img
                    src={proj.poster || '/portfolio/images/poster.png'}
                    alt={proj.title}
                    className={styles.orbitCardImg}
                  />
                  <div className={styles.orbitCardLabel}>{proj.title}</div>
                </div>
              )
            })}
          </div>
        </div>

        {/* 📍 中央文字（圆柱核心） */}
        <div className={styles.centerColumn}>
          <h1 className={styles.title}>AS</h1>
          <p className={styles.subtitle}>游戏程序 / 技术美术</p>
        </div>
      </div>
      <button className={styles.scroll} onClick={scrollToAbout}>
        <FaChevronDown />
      </button>
    </section>
  )
}
