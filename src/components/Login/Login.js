import React, { useEffect, useReducer, useState } from 'react'

import Card from '../UI/Card/Card'
import styles from './Login.module.css'
import Button from '../UI/Button/Button'

const emailReducer = (prevState, action) => {
  if (action.type === 'USER_INPUT') {
    return {
      value: action.value,
      isValid: action.value.includes('@'),
    }
  }
  if (action.type === 'INPUT_BLUR') {
    return {
      value: prevState.value,
      isValid: prevState.value.includes('@'),
    }
  }
  return {
    value: '',
    isValid: false,
  }
}

const passwordReducer = (prevState, action) => {
  if (action.type === 'USER_INPUT') {
    return {
      value: action.value,
      isValid: action.value.trim().length > 7,
    }
  }
  if (action.type === 'INPUT_BLUR') {
    return {
      value: prevState.value,
      isValid: prevState.value.trim().length > 7,
    }
  }
  return {
    value: '',
    isValid: false,
  }
}

const Login = (props) => {
  // const [inputEmail, setInputEmail] = useState('')
  // const [emailIsValid, setEmailIsValid] = useState()
  // const [inputPassword, setInputPassword] = useState('')
  // const [passwordIsValid, setPasswordIsValid] = useState()
  const [formIsValid, setFormIsValid] = useState(false)

  const [emailState, dipatchEmailState] = useReducer(emailReducer, {
    value: '',
    isValid: undefined,
  })

  const [passwordState, dipatchPasswordState] = useReducer(passwordReducer, {
    value: '',
    isValid: undefined,
  })

  const { isValid: emailIsValid } = emailState
  const { isValid: passwordIsValid } = passwordState

  useEffect(() => {
    const timer = setTimeout(() => {
      setFormIsValid(emailIsValid && passwordIsValid)
    }, 1000)

    return () => {
      clearTimeout(timer)
    }
  }, [emailIsValid, passwordIsValid])

  const emailChangeHandler = (event) => {
    dipatchEmailState({ type: 'USER_INPUT', value: event.target.value })

    // setFormIsValid(event.target.value.includes('@') && passwordState.isValid)
  }

  const passwordChangeHandler = (event) => {
    dipatchPasswordState({ type: 'USER_INPUT', value: event.target.value })

    // setFormIsValid(event.target.value.trim().length > 7 && emailState.isValid)
  }

  const validateEmailHandler = () => {
    dipatchEmailState({ type: 'INPUT_BLUR' })
  }

  const validatePasswordHandler = () => {
    dipatchPasswordState({ type: 'INPUT_BLUR' })
  }

  const submitHandler = (event) => {
    event.preventDefault()
    props.onLogin(emailState.value, passwordState.value)
  }

  return (
    <Card className={styles.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${styles.control} ${
            emailState.isValid === false ? styles.invalid : ''
          }`}
        >
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${styles.control} ${
            passwordState.isValid === false ? styles.invalid : ''
          }`}
        >
          <label htmlFor="password">Пароль</label>
          <input
            type="password"
            id="password"
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={styles.actions}>
          <Button type="submit" className={styles.btn} disabled={!formIsValid}>
            Вход
          </Button>
        </div>
      </form>
    </Card>
  )
}

export default Login
