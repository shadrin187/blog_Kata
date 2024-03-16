import React from 'react'
import { Link } from 'react-router-dom/cjs/react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { logOutAction } from '../../redux/actions'

import styles from './Header.module.css'

function Header() {
  const dispatch = useDispatch()
  const isAutorized = useSelector((state) => state.isAutorized)
  const user = useSelector((state) => state.user)
  return (
    <header className={styles.app__header}>
      <Link to={'/articles'} className={styles.header__title}>
        Realworld Blog
      </Link>
      {isAutorized ? (
        <>
          <Link to={'/new-article'} className={styles.header__create_article}>
            Create article
          </Link>
          <Link to={'/profile'} className={styles.header__label}>
            <span>{user.username}</span>
            <img className={styles.header__user_image} alt="user" src={user.image} />
          </Link>
          <button
            className={styles.header__log_out}
            onClick={() => {
              dispatch(logOutAction())
              localStorage.clear()
            }}
          >
            Log out
          </button>
        </>
      ) : (
        <>
          <Link to={'/sign-in'} className={styles.header__sign_in}>
            Sign In
          </Link>
          <Link to={'/sign-up'} className={styles.header__sign_up}>
            Sign Up
          </Link>
        </>
      )}
    </header>
  )
}

export default Header
