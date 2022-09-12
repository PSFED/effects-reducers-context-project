import React, {
  useEffect,
  useReducer,
  useState,
  useContext,
  useRef,
} from 'react'
import AuthContext from '../../components/store/Auth-context'

import Card from '../UI/Card/Card'
import styles from './Login.module.css'
import Button from '../UI/Button/Button'
import Input from '../UI/Input/Input'

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

  const ctx = useContext(AuthContext)
  const emailInputRef = useRef()
  const passwordInputRef = useRef()

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
    if (formIsValid) {
      ctx.onLogin(emailState.value, passwordState.value)
    } else if (!emailIsValid) {
      emailInputRef.current.focus()
    } else {
      passwordInputRef.current.focus()
    }
  }

  return (
    <Card className={styles.login}>
      <form onSubmit={submitHandler}>
        <Input
          ref={emailInputRef}
          id="email"
          label="Email"
          type="email"
          isValid={emailIsValid}
          value={emailState.value}
          onChange={emailChangeHandler}
          onBlur={validateEmailHandler}
        />
        <Input
          ref={passwordInputRef}
          id="password"
          label="Password"
          type="password"
          isValid={passwordIsValid}
          value={passwordState.value}
          onChange={passwordChangeHandler}
          onBlur={validatePasswordHandler}
        />

        <div className={styles.actions}>
          <Button type="submit" className={styles.btn}>
            Вход
          </Button>
        </div>
      </form>
    </Card>
  )
}

export default Login
