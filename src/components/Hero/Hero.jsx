import { useEffect, useRef } from 'react'
import { FaChevronDown } from 'react-icons/fa'
import projects from '../../data/projects.json'
import styles from './Hero.module.css'

const ORBIT_RADIUS = 280
const CARD_W = 140
const CARD_H = 210
const TOTAL_DISPLAY = 5

// 组装卡牌：真实项目 + 空占位
const cardData = []
for (let i = 0; i < TOTAL_DISPLAY; i++) {
  if (i < projects.length) {
    cardData.push(projects[i])
  } else {
    cardData.push({ id: `ph-${i}`, title: '', isPlaceholder: true })
  }
}

export default function Hero() {
  const stageRef = useRef(null)

  useEffect(() => {
    const stage = stageRef.current
    if (!stage) return
    let angle = 0
    let running = true

    const tick = () => {
      if (!running) return
      angle = (angle + 0.12) % 360

      for (let i = 0; i < stage.children.length; i++) {
        const card = stage.children[i]
        const cardAngle = angle + (360 / TOTAL_DISPLAY) * i
        const rad = (cardAngle * Math.PI) / 180
        const zPos = Math.cos(rad) // +1 = 最前, -1 = 最后
        const opacity = 0.08 + ((zPos + 1) / 2) * 0.42 // 0.08 ~ 0.50
        const scale = 0.85 + ((zPos + 1) / 2) * 0.25 // 0.85 ~ 1.10

        card.style.transform = `
          rotateY(${cardAngle}deg)
          translateZ(${ORBIT_RADIUS}px)
          scale(${scale})
        `
        card.style.opacity = opacity
        card.style.filter = `blur(${(1 - scale) * 6}px)`
      }

      requestAnimationFrame(tick)
    }

    requestAnimationFrame(tick)
    return () => { running = false }
  }, [])

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
        {/* ⭕ 行星环轨道 */}
        <div className={styles.orbitRing}>
          <div className={styles.orbitTilt}>
            <div className={styles.orbitStage} ref={stageRef}>
              {cardData.map((card) => (
                <div
                  key={card.id}
                  className={`${styles.orbitCard} ${card.isPlaceholder ? styles.placeholderCard : ''}`}
                >
                  {!card.isPlaceholder && (
                    <>
                      <img
                        src={card.poster || '/portfolio/images/poster.png'}
                        alt={card.title}
                        className={styles.orbitCardImg}
                      />
                      <div className={styles.orbitCardLabel}>{card.title}</div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 📍 中心文字 */}
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
