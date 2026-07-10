import { FaCubes, FaBrain, FaLightbulb, FaCode } from 'react-icons/fa'
import { SiUnity } from 'react-icons/si'
import skills from '../../data/skills.json'
import styles from './Strengths.module.css'

const iconMap = {
  FaCubes: FaCubes,
  FaBrain: FaBrain,
  FaLightbulb: FaLightbulb,
  SiUnity: SiUnity,
}
const fallbackIcon = FaCode

export default function Strengths() {
  return (
    <section id="strengths" className={styles.section}>
      <div className={styles.inner}>
        <h2 className={styles.heading}>个人优势</h2>
        <div className={styles.grid}>
          {skills.map((skill, i) => {
            const Icon = iconMap[skill.icon] || fallbackIcon
            return (
              <div key={i} className={styles.card}>
                <div className={styles.header}>
                  <Icon className={styles.icon} />
                  <h3 className={styles.category}>{skill.category}</h3>
                </div>
                <div className={styles.tags}>
                  {skill.items.map((item, j) => (
                    <span key={j} className={styles.tag}>{item}</span>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
