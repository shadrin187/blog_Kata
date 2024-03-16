import React from 'react'
import { Pagination } from 'antd'
import { useSelector, useDispatch } from 'react-redux'

import ArticlesList from '../articles-list/ArticlesList'
import { changePageAction } from '../../redux/actions'
import { fetchArticles } from '../../redux/thunks'
import Loader from '../Loder/Loader'

import styles from './ArticlesPage.module.css'

function ArticlesPage() {
  const dispatch = useDispatch()
  const token = useSelector((state) => state.user.token)
  const page = useSelector((state) => state.page)
  const totalArticles = useSelector((state) => state.totalCount)
  const articles = useSelector((state) => state.articles)
  const isLoading = useSelector((state) => state.isLoading)

  if (articles.length === 0) {
    dispatch(fetchArticles(page, token))
  }

  if (isLoading) {
    return <Loader />
  }
  return (
    <div className={styles.articles_page}>
      <ArticlesList articles={articles} />
      <Pagination
        className={styles.pagination}
        current={page}
        total={totalArticles}
        onChange={(p) => {
          dispatch(changePageAction(p))
          dispatch(fetchArticles(p, token))
        }}
        pageSize={5}
        showSizeChanger={false}
        showPrevNextJumpers={false}
      />
    </div>
  )
}

export default ArticlesPage
