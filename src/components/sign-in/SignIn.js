import React, { useEffect } from 'react'
import { Link, Redirect } from 'react-router-dom/cjs/react-router-dom'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'

import { fetchSignIn } from '../../redux/thunks'

import styles from './SignIn.module.css'

function SignIn() {
  const {
    register,
    formState: { errors },
    handleSubmit,
    setFocus,
  } = useForm({ mode: 'onBlur' })

  useEffect(() => setFocus('Email'), [setFocus])

  const dispatch = useDispatch()
  const isAutorized = useSelector((state) => state.isAutorized)

  const submitForm = (data) => {
    dispatch(
      fetchSignIn({
        email: data.Email,
        password: data.Password,
      })
    )
  }
  if (isAutorized) {
    return <Redirect to={'/'} />
  }
  return (
    <form className={styles.sign_in_form} onSubmit={handleSubmit(submitForm)}>
      <h3 className={styles.form__title}>Sign In</h3>
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
        Password
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
      <input type="submit" className={styles.form__submit} value="Login" />
      <span className={styles.form__redirect}>
        Don’t have an account? <Link to="/sign-up">Sign Up.</Link>
      </span>
    </form>
  )
}

export default SignIn
