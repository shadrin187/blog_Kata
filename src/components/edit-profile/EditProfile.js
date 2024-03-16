import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom/cjs/react-router-dom'

import { fetchEditProfile } from '../../redux/thunks'

import styles from './EditProfile.module.css'

function EditProfile() {
  const [isSended, setIsSended] = useState(false)

  const {
    register,
    formState: { errors },
    handleSubmit,
    setFocus,
    reset,
  } = useForm({ mode: 'onBlur' })

  useEffect(() => {
    setFocus('Username')
  }, [setFocus])

  const dispatch = useDispatch()
  const token = useSelector((state) => state.user.token)

  const submitForm = (data) => {
    dispatch(
      fetchEditProfile(token, {
        username: data.Username,
        password: data.Password,
        email: data.Email,
        image: data.image,
      })
    )
    reset()
    setIsSended(true)
  }

  if (isSended) {
    return <Redirect to={'/'} />
  }

  return (
    <form className={styles.form__edit_profile} onSubmit={handleSubmit(submitForm)}>
      <h3 className={styles.form__title}>Edit Profile</h3>
      <label className={styles.form__label}>
        Username
        <input
          type="text"
          className={errors.Username ? styles.form__input_error : styles.form__input}
          placeholder="Username"
          {...register('Username', {
            required: 'Username is required',
            minLength: {
              value: 3,
              message: 'Your username needs to be at least 3 characters.',
            },
            maxLength: {
              value: 20,
              message: 'Your username must be no more than 20 characters.',
            },
          })}
        />
        {errors.Username ? <p className={styles.error_message}>{errors.Username.message}</p> : ''}
      </label>
      <label className={styles.form__label}>
        Email address
        <input
          type="email"
          placeholder="Email address"
          className={errors.Email ? styles.form__input_error : styles.form__input}
          {...register('Email', {
            required: 'Email is required',
          })}
        />
        {errors.Email ? <p className={styles.error_message}>Your Email must be correct.</p> : ''}
      </label>
      <label className={styles.form__label}>
        New password
        <input
          type="password"
          placeholder="Password"
          className={errors.Password ? styles.form__input_error : styles.form__input}
          {...register('Password', {
            required: 'Password is required',
            minLength: {
              value: 6,
              message: 'Your password needs to be at least 6 characters.',
            },
            maxLength: {
              value: 40,
              message: 'Your password must be no more than 40 characters.',
            },
          })}
        />
        {errors.Password ? <p className={styles.error_message}>{errors.Password.message}</p> : ''}
      </label>
      <label className={styles.form__label}>
        Avatar image (url)
        <input
          type="url"
          placeholder="Avatar image"
          className={errors.image ? styles.form__input_error : styles.form__input}
          {...register('image', {
            required: 'image is required',
          })}
        />
        {errors.image ? <p className={styles.error_message}>{errors.image.message}</p> : ''}
      </label>
      <input type="submit" className={styles.form__submit} value="Save" />
    </form>
  )
}

export default EditProfile
