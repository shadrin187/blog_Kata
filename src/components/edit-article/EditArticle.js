import React from 'react'
import { useSelector } from 'react-redux'

import NewArticle from '../new-article/NewArticle'

import styles from './EditArticle.module.css'

function EditArticle({ slug }) {
  const article = useSelector((state) => state.articleData)

  return (
    <div className={styles.edit__article}>
      <NewArticle
        slug={slug}
        titleInput={article.title}
        descriptionInput={article.description}
        textInput={article.body}
        tagsInput={article.tagList}
        isEdit={true}
      />
    </div>
  )
}

export default EditArticle
