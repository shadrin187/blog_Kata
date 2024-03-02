import styles from './Header.module.css'

function Header () {
  return (
    <header className={styles.app__header}>
        <h6 className={styles.header__title}>Realworld Blog</h6>
        <button className={styles.header__sign_in}>Sign In</button>
        <button className={styles.header__sign_up}>Sign Up</button>
      </header>
  )
}

export default Header