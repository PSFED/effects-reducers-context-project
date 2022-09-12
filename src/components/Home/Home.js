import React, { useContext } from 'react'
import AuthContext from '../store/Auth-context'
import Button from '../UI/Button/Button'
import Card from '../UI/Card/Card'
import styles from './Home.module.css'

const Home = () => {
  const ctx = useContext(AuthContext)

  return (
    <Card className={styles.home}>
      <h1>Рады Вас Видеть Снова!</h1>
      <Button onClick={ctx.onLogout}>Выход</Button>
    </Card>
  )
}

export default Home
