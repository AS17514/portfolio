import { useState, useRef } from 'react'
import { FaChevronDown } from 'react-icons/fa'
import styles from './Hero.module.css'

export default function Hero() {
  const cardRef = useRef(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  const scrollToAbout = () => {
    const el = document.getElementById('about')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  const handleMouseMove = (e) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const x = ((e.clientX - centerX) / rect.width) * 40
    const y = ((e.clientY - centerY) / rect.height) * -20
    setTilt({ x, y })
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    setTilt({ x: 0, y: 0 })
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
        <div className={styles.textArea}>
          <h1 className={styles.title}>AS</h1>
          <p className={styles.subtitle}>游戏程序 / 技术美术</p>
        </div>
        <div className={styles.cardWrapper}>
          <div
            ref={cardRef}
            className={`${styles.card} ${isHovered ? styles.cardHovered : ''}`}
            style={isHovered ? {
              transform: `perspective(900px) rotateY(${tilt.x}deg) rotateX(${tilt.y}deg)`,
            } : {}}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={handleMouseLeave}
            onMouseMove={handleMouseMove}
          >
            <div className={styles.cardInner}>
              <img
                src="/portfolio/images/poster.png"
                alt="The Law 海报"
                className={styles.posterImg}
              />
            </div>
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
