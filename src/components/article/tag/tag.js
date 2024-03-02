import styles from './tag.module.css'

export default function Tag ({tag}) {
  return (
    <li className={styles.tag_item}>{tag}</li>
  )
}