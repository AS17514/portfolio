import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa'
import projects from '../../data/projects.json'
import styles from './Projects.module.css'

export default function Projects() {
  return (
    <section id="projects" className={styles.section}>
      <div className={styles.inner}>
        <h2 className={styles.heading}>精选项目</h2>
        {projects.length === 0 && (
          <p className={styles.empty}>暂无项目展示</p>
        )}
        <div className={styles.list}>
          {projects.map((proj) => (
            <article key={proj.id} className={styles.card}>
              <div className={styles.media}>
                {proj.video ? (
                  <video
                    src={proj.video}
                    className={styles.mediaContent}
                    controls
                    muted
                    playsInline
                  />
                ) : proj.thumbnail ? (
                  <img
                    src={proj.thumbnail}
                    alt={proj.title}
                    className={styles.mediaContent}
                  />
                ) : (
                  <div className={styles.placeholder}>
                    <span className={styles.placeholderText}>{proj.title}</span>
                  </div>
                )}
              </div>
              <div className={styles.info}>
                <h3 className={styles.title}>{proj.title}</h3>
                {proj.subtitle && (
                  <p className={styles.subtitle}>{proj.subtitle}</p>
                )}
                <p className={styles.desc}>{proj.description}</p>
                <div className={styles.tags}>
                  {proj.responsibilities.map((r, i) => (
                    <span key={i} className={styles.respTag}>{r}</span>
                  ))}
                </div>
                <div className={styles.techTags}>
                  {proj.techStack.map((tech, i) => (
                    <span key={i} className={styles.techTag}>{tech}</span>
                  ))}
                </div>
                <div className={styles.actions}>
                  <a
                    href={proj.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.action}
                  >
                    <FaGithub size={16} />
                    GitHub
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
