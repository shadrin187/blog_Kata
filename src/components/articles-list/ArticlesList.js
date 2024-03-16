import React from 'react'

import Article from '../article/Arcticle'

import styles from './ArticlesList.module.css'

function ArticlesList({ articles }) {
  return (
    <ul className={styles.article_list}>
      {articles.map((el) => {
        return <Article key={el.slug} data={el} slug={el.slug} />
      })}
    </ul>
  )
}

export default ArticlesList
