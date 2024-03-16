import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom/cjs/react-router-dom'

import { fetchNewArticle, fetchEditArticle } from '../../redux/thunks'

import styles from './NewArticle.module.css'

function NewArticle({ slug, titleInput = '', descriptionInput = '', textInput = '', tagsInput = [], isEdit = false }) {
  const [tags, setTags] = useState(tagsInput)
  const [title, setTitle] = useState(titleInput)
  const [text, setText] = useState(textInput)
  const [description, setDescription] = useState(descriptionInput)
  const [isSended, setIsSended] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    setFocus,
    formState: { errors },
  } = useForm({ mode: 'onChange' })

  useEffect(() => setFocus('Title'), [setFocus])

  const dispatch = useDispatch()
  const token = useSelector((state) => state.user.token)

  const submitForm = (data) => {
    if (isEdit) {
      dispatch(
        fetchEditArticle(token, slug, {
          title: data.Title,
          description: data.description,
          body: data.Text,
          tags: tags,
        })
      )
    } else {
      dispatch(
        fetchNewArticle(token, {
          title: data.Title,
          description: data.description,
          body: data.Text,
          tags: tags,
        })
      )
    }

    reset({
      Title: '',
      Text: '',
      Description: '',
    })

    setTags([])

    setIsSended(true)
  }

  if (isSended) {
    return <Redirect to={'/articles'} />
  }

  return (
    <form className={styles.form__new_article} onSubmit={handleSubmit(submitForm)}>
      {isEdit ? (
        <h3 className={styles.form__title}>Edit article</h3>
      ) : (
        <h3 className={styles.form__title}>Create new article</h3>
      )}

      <label className={styles.form__label}>
        Title
        <input
          type="text"
          placeholder="Title"
          value={title}
          className={errors.Title ? styles.form__input_error : styles.form__input}
          {...register('Title', {
            required: 'Title is required',
          })}
          onChange={(e) => {
            setTitle(e.target.value)
          }}
        />
        {errors.Title ? <p className={styles.error_message}>{errors.Title.message}</p> : ''}
      </label>
      <label className={styles.form__label}>
        Short description
        <input
          type="text"
          value={description}
          placeholder="Short description"
          className={errors.description ? styles.form__input_error : styles.form__input}
          {...register('description', {
            required: 'Short description is required',
          })}
          onChange={(e) => {
            setDescription(e.target.value)
          }}
        />
        {errors.description ? <p className={styles.error_message}>{errors.description.message}</p> : ''}
      </label>
      <label className={styles.form__label}>
        Text
        <textarea
          type="text"
          value={text}
          placeholder="Text"
          className={errors.Text ? styles.form__input_error : styles.form__input_text}
          {...register('Text', {
            required: 'Text is required',
          })}
          onChange={(e) => {
            setText(e.target.value)
          }}
        />
        {errors.Text ? <p className={styles.error_message}>{errors.Text.message}</p> : ''}
      </label>
      <label className={styles.form__label_tags}>
        Tags
        <ul className={styles.form__tags}>
          {tags.length === 0 ? (
            <li className={styles.form__tag}>
              <button
                className={styles.button__add}
                onClick={(e) => {
                  e.preventDefault()
                  setTags([...tags, ''])
                }}
              >
                Add tag
              </button>
            </li>
          ) : (
            tags.map((el, i) => {
              if (i !== tags.length - 1) {
                return (
                  <li className={styles.form__tag} key={i}>
                    <input
                      value={el}
                      className={errors[`tag-${i}`] ? styles.form__input_error : styles.form__input}
                      {...register(`tag-${i}`, {
                        required: 'Tag must not be empty',
                      })}
                      onChange={(e) => {
                        setTags(
                          tags.map((el1, i1) => {
                            if (i1 === i) {
                              return e.target.value
                            } else {
                              return el1
                            }
                          })
                        )
                      }}
                    />
                    {errors[`tag-${i}`] ? <p className={styles.error_message}>{errors[`tag-${i}`].message}</p> : ''}
                    <button
                      className={styles.button__del}
                      onClick={(e) => {
                        e.preventDefault()
                        setTags(tags.filter((elem, i1) => i !== i1))
                      }}
                    >
                      Delete
                    </button>
                  </li>
                )
              } else {
                return (
                  <li className={styles.form__tag} key={i}>
                    <input
                      type="text"
                      value={el}
                      placeholder="Tag"
                      className={errors[`tag-${i}`] ? styles.form__input_error : styles.form__input}
                      {...register(`tag-${i}`, {
                        required: 'Tag must not be empty',
                      })}
                      onChange={(e) => {
                        setTags(
                          tags.map((el1, index1) => {
                            if (index1 === i) {
                              return e.target.value
                            } else {
                              return el1
                            }
                          })
                        )
                      }}
                    />
                    {errors[`tag-${i}`] ? <p className={styles.error_message}>{errors[`tag-${i}`].message}</p> : ''}
                    <button
                      className={styles.button__del}
                      onClick={(e) => {
                        e.preventDefault()
                        setTags(tags.filter((elem, index1) => i !== index1))
                      }}
                    >
                      Delete
                    </button>
                    <button
                      className={styles.button__add}
                      onClick={(e) => {
                        e.preventDefault()
                        setTags([...tags, ''])
                      }}
                    >
                      Add tag
                    </button>
                  </li>
                )
              }
            })
          )}
        </ul>
      </label>
      <input type="submit" className={styles.form__submit} value="Send" />
    </form>
  )
}

export default NewArticle
