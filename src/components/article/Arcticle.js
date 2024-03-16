import React from 'react'
import { format } from 'date-fns'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import like from '../images/heart_1.svg'
import liked from '../images/path4.svg'
import { fetchAddLike, fetchRemoveLike } from '../../redux/thunks'
import Loader from '../Loder/Loader'

import styles from './Article.module.css'

function Article({ data, slug }) {
  const isAutorized = useSelector((state) => state.isAutorized)
  const token = useSelector((state) => state.user.token)
  const isLoading = useSelector((state) => state.isLoading)
  const dispatch = useDispatch()

  let likeSrc
  if (data.favorited) {
    likeSrc = liked
  } else {
    likeSrc = like
  }

  let authorizedLikeStyle = styles.article__likes
  if (isAutorized) {
    authorizedLikeStyle += ' ' + styles.article__likes_auth
  }

  if (isLoading || data === '') {
    return <Loader />
  }

  return (
    <li className={styles.article}>
      <div className={styles.article__info}>
        <div className={styles.article__header}>
          <Link to={`/articles/${slug}`} className={styles.article__title}>
            {data?.title}
          </Link>
          <label
            className={authorizedLikeStyle}
            onClick={() => {
              if (!data.favorited) {
                dispatch(fetchAddLike(token, slug))
              } else {
                dispatch(fetchRemoveLike(token, slug))
              }
            }}
          >
            <img className={styles.article__likes_image} alt="likes" src={likeSrc} />
            <span className={styles.article__likes_counter}>{data?.favoritesCount}</span>
          </label>
        </div>
        <ul className={styles.article__tags}>
          {data.tagList?.map((el, i) => {
            return (
              <li key={i} className={styles.tag_item}>
                {el}
              </li>
            )
          })}
        </ul>
        <p className={styles.article__description}>{data?.description}</p>
      </div>
      <div className={styles.article__user}>
        <div className={styles.article__user_info}>
          <span className={styles.article__user_name}>{data.author?.username}</span>
          <span className={styles.article__created_at}>{format(data.createdAt, 'PPP')}</span>
        </div>
        <img className={styles.article__user_image} alt="userImage" src={data.author?.image} />
      </div>
    </li>
  )
}

export default Article
