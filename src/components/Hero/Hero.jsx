import { useEffect, useRef, useCallback } from 'react'
import { FaChevronDown, FaRegCircle } from 'react-icons/fa'
import projects from '../../data/projects.json'
import styles from './Hero.module.css'

const ORBIT_RADIUS = 280
const CARD_W = 140
const CARD_H = 210
const TOTAL_DISPLAY = 5
const BASE_SPEED = 0.20 // deg/frame (~30s 一圈)
const MAX_SPEED = 0.80
const DRAG_FACTOR = 0.25

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
  const angleRef = useRef(0)
  const speedRef = useRef(BASE_SPEED)
  const isDragging = useRef(false)
  const lastX = useRef(0)

  const handlePointerDown = useCallback((e) => {
    isDragging.current = true
    lastX.current = e.clientX
  }, [])

  const handlePointerMove = useCallback((e) => {
    if (!isDragging.current) return
    const dx = e.clientX - lastX.current
    speedRef.current = BASE_SPEED + (-dx * DRAG_FACTOR)
    speedRef.current = Math.max(-MAX_SPEED, Math.min(MAX_SPEED, speedRef.current))
    lastX.current = e.clientX
  }, [])

  const handlePointerUp = useCallback(() => {
    isDragging.current = false
  }, [])

  useEffect(() => {
    const stage = stageRef.current
    if (!stage) return
    let running = true

    const tick = () => {
      if (!running) return

      if (!isDragging.current) {
        speedRef.current += (BASE_SPEED - speedRef.current) * 0.04
        if (Math.abs(speedRef.current - BASE_SPEED) < 0.002) {
          speedRef.current = BASE_SPEED
        }
      }

      angleRef.current = (angleRef.current + speedRef.current) % 360

      for (let i = 0; i < stage.children.length; i++) {
        const card = stage.children[i]
        const cardAngle = angleRef.current + (360 / TOTAL_DISPLAY) * i
        const rad = (cardAngle * Math.PI) / 180
        const zPos = Math.cos(rad)
        const isPlaceholder = card.classList.contains(styles.placeholderCard)

        // 真实卡牌: 0.35~0.95 | 占位卡: 0.25~0.50（始终可见）
        const opacity = isPlaceholder
          ? 0.20 + ((zPos + 1) / 2) * 0.30
          : 0.35 + ((zPos + 1) / 2) * 0.60
        const scale = 0.85 + ((zPos + 1) / 2) * 0.25

        card.style.transform = `
          rotateY(${cardAngle}deg)
          translateZ(${ORBIT_RADIUS}px)
          scale(${scale})
        `
        card.style.opacity = opacity
        card.style.filter = `blur(${(1 - scale) * 5}px)`
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

      <div
        className={styles.content}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
      >
        <div className={styles.orbitRing}>
          <div className={styles.orbitTilt}>
            <div className={styles.orbitStage} ref={stageRef}>
              {cardData.map((card) => (
                <div
                  key={card.id}
                  className={`${styles.orbitCard} ${card.isPlaceholder ? styles.placeholderCard : ''}`}
                >
                  {!card.isPlaceholder ? (
                    <>
                      <img
                        src={card.poster || '/portfolio/images/poster.png'}
                        alt={card.title}
                        className={styles.orbitCardImg}
                      />
                      <div className={styles.orbitCardLabel}>{card.title}</div>
                    </>
                  ) : (
                    <div className={styles.placeholderInner}>
                      <FaRegCircle className={styles.placeholderIcon} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.centerColumn}>
          <h1 className={styles.title}>AS</h1>
          <p className={styles.subtitle}>游戏程序 / 技术美术</p>
        </div>

        <button className={styles.scroll} onClick={scrollToAbout}>
          <FaChevronDown />
        </button>
      </div>
    </section>
  )
}
