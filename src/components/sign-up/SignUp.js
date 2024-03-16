import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Redirect } from 'react-router-dom/cjs/react-router-dom'

import { fetchSignUp } from '../../redux/thunks'

import styles from './SignUp.module.css'

function SignUp() {
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    setFocus,
  } = useForm({ mode: 'onBlur' })

  useEffect(() => setFocus('Username'), [setFocus])

  const dispatch = useDispatch()
  const isAutorized = useSelector((state) => state.isAutorized)

  const submitForm = (data) => {
    dispatch(
      fetchSignUp({
        username: data.Username,
        email: data.Email,
        password: data.Password,
      })
    )
  }

  if (isAutorized) {
    return <Redirect to={'/'} />
  }
  return (
    <form className={styles.form__sign_up} onSubmit={handleSubmit(submitForm)}>
      <h4 className={styles.form__title}>Create new account</h4>
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
      <label className={styles.form__label}>
        Repeat Password
        <input
          type="password"
          placeholder="Repeat Password"
          className={errors.passwordRepeat ? styles.form__input_error : styles.form__input}
          {...register('passwordRepeat', {
            required: 'Repeat password is required',
            validate: (val) => {
              if (watch('Password') !== val) {
                return 'Passwords must match'
              }
            },
          })}
        />
        {errors.passwordRepeat ? <p className={styles.error_message}>{errors.passwordRepeat.message}</p> : ''}
      </label>
      <label className={styles.form__label_checkbox}>
        <input
          type="checkbox"
          className={styles.form__input_checkbox}
          {...register('checkbox', {
            required: 'You must agree.',
          })}
        />
        I agree to the processing of my personal information
      </label>
      {errors.checkbox ? <p className={styles.error_message}>{errors.checkbox.message}</p> : ''}
      <input type="submit" className={styles.form__submit} value="Create" />
      <p className={styles.form__redirect}>
        Already have an account? <Link to="/sign-in">Sign In.</Link>
      </p>
    </form>
  )
}

export default SignUp
