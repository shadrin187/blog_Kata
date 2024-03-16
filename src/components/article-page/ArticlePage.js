import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { compiler } from 'markdown-to-jsx'
import { format } from 'date-fns'
import { Redirect, Link } from 'react-router-dom/cjs/react-router-dom'
import { Button, Popconfirm, ConfigProvider } from 'antd'

import Loader from '../Loder/Loader'
import styles from '../article/Article.module.css'
import like from '../images/heart_1.svg'
import liked from '../images/path4.svg'
import { fetchDeleteArticle, fetchArticle, fetchAddLike, fetchRemoveLike } from '../../redux/thunks'

import style from './ArticlePage.module.css'

function ArticlePage({ slug }) {
  const dispatch = useDispatch()
  const data = useSelector((state) => state.articleData)
  const token = useSelector((state) => state.user.token)
  if (data === '' || slug !== data.slug) {
    dispatch(fetchArticle(slug, token))
  }
  const isLoading = useSelector((state) => state.isLoading)
  const isAutorized = useSelector((state) => state.isAutorized)
  const username = useSelector((state) => state.user.username)
  const [isDeleted, setIsDeleted] = useState(false)

  let authorizedLikeStyle = styles.article__likes
  if (isAutorized) {
    authorizedLikeStyle += ' ' + styles.article__likes_auth
  }

  let likeSrc
  if (data.favorited) {
    likeSrc = liked
  } else {
    likeSrc = like
  }

  if (isLoading || data === '') {
    return <Loader />
  }

  if (isDeleted) {
    return <Redirect to={'/articles'} />
  }

  return (
    <div className={style.article_page}>
      <header className={style.article__header}>
        <div className={styles.article__info}>
          <div className={styles.article__header}>
            <h5 className={styles.article__title}>{data.title}</h5>
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
              <span className={styles.article__likes_counter}>{data.favoritesCount}</span>
            </label>
          </div>
          <ul className={styles.article__tags}>
            {data.tagList?.map((el, i) => {
              return (
                <li className={style.tag_item} key={i}>
                  {el}
                </li>
              )
            })}
          </ul>
          <p className={styles.article__description}>{data?.description}</p>
        </div>
        <div className={style.wrapper}>
          <div className={styles.article__user}>
            <div className={styles.article__user_info}>
              <span className={styles.article__user_name}>{data.author?.username}</span>
              <span className={styles.article__created_at}>{format(new Date(data?.updatedAt), 'PPP')}</span>
            </div>
            <img className={styles.article__user_image} alt="userImage" src={data.author?.image} />
          </div>
          {username === data.author.username ? (
            <div className={style.wrapper__buttons}>
              <ConfigProvider>
                <Popconfirm
                  placement="rightTop"
                  title="Are you sure to delete this article?"
                  okText="Yes"
                  cancelText="No"
                  onConfirm={(e) => {
                    e.stopPropagation()
                    dispatch(fetchDeleteArticle(token, slug))
                    setIsDeleted(true)
                  }}
                >
                  <Button className={style.delete__button}>Delete</Button>
                </Popconfirm>
              </ConfigProvider>

              <Link to={`/articles/${slug}/edit`} className={style.edit__button}>
                Edit
              </Link>
            </div>
          ) : (
            ''
          )}
        </div>
      </header>
      <p className={style.article__body}>{compiler(data.body?.split('\\n').join('\n\n'), { wrapper: null })}</p>
    </div>
  )
}

export default ArticlePage
