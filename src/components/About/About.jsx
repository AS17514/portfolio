import { FaGithub, FaEnvelope } from 'react-icons/fa'
import { SiBilibili } from 'react-icons/si'
import profile from '../../data/profile.json'
import styles from './About.module.css'

export default function About() {
  const hasAvatar = !!profile.avatar
  const initial = profile.name.charAt(0)

  return (
    <section id="about" className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.left}>
          {hasAvatar ? (
            <img src={profile.avatar} alt={profile.name} className={styles.avatar} />
          ) : (
            <div className={styles.placeholder}>{initial}</div>
          )}
          <div className={styles.stats}>
            {profile.stats.map((stat, i) => (
              <div key={i} className={styles.stat}>
                <span className={styles.statValue}>{stat.value}</span>
                <span className={styles.statLabel}>{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.right}>
          <h2 className={styles.heading}>关于我</h2>
          <p className={styles.bio}>{profile.bio}</p>
          <div className={styles.contacts}>
            <a href={profile.github} target="_blank" rel="noopener noreferrer" className={styles.iconLink}>
              <FaGithub size={22} />
            </a>
            {profile.bilibili && (
              <a href={profile.bilibili} target="_blank" rel="noopener noreferrer" className={styles.iconLink}>
                <SiBilibili size={22} />
              </a>
            )}
            <a href={`mailto:${profile.email}`} className={styles.iconLink}>
              <FaEnvelope size={22} />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
