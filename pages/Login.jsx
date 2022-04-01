import Head from 'next/head'
import { useEffect } from 'react'
import { WithoutAuth } from '../HOCs/WithoutAuth'
import { useUser } from '../context/Context.js'
import { onAuth, withFacebook, withGoogle } from '../firebase/utils'
import { useRouter } from 'next/router'
import InitialLayout from '../layouts/InitialLayout'
import style from '../styles/Auth.module.css'
import Link from 'next/link'

function Login(props) {
  const { user, setUserProfile } = useUser()
  const router = useRouter()
  useEffect(() => {
    onAuth(setUserProfile)
    if (user) router.replace('/Home')
  }, [user]);
  return (
    <InitialLayout>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={style.container}>
        <h3 className={style.subtitle}>Iniciar Sesion</h3>
        <div className={style.buttonsContainer}>
          <button className={style.withFacebook} onClick={withFacebook}>continuar con Facebook</button>
          <button className={style.withGoogle} onClick={withGoogle}>continuar con Google</button>
        </div>
        <div className={style.linkContainer}>Crear una cuenta? <Link href="/SignUp" ><a className={style.link}>Registrate</a></Link></div>
      </div>
    </InitialLayout>
  )
}


export default WithoutAuth(Login)
