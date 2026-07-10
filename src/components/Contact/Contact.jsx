import { FaGithub, FaEnvelope } from 'react-icons/fa'
import { SiBilibili } from 'react-icons/si'
import profile from '../../data/profile.json'
import styles from './Contact.module.css'

export default function Contact() {
  return (
    <section id="contact" className={styles.section}>
      <div className={styles.inner}>
        <h2 className={styles.heading}>Let's Connect</h2>
        <p className={styles.bio}>
          对项目感兴趣或有合作意向？欢迎通过以下方式联系我。
        </p>
        <div className={styles.icons}>
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.iconBtn}
          >
            <FaGithub size={24} />
          </a>
          {profile.bilibili && (
            <a
              href={profile.bilibili}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.iconBtn}
            >
              <SiBilibili size={24} />
            </a>
          )}
          <a href={`mailto:${profile.email}`} className={styles.iconBtn}>
            <FaEnvelope size={24} />
          </a>
        </div>
      </div>
    </section>
  )
}
