import Head from 'next/head'
import { WithoutAuth } from '../HOCs/WithoutAuth'
import { withFacebook, withGoogle } from '../firebase/utils'
import InitialLayout from '../layouts/InitialLayout'
import style from '../styles/Auth.module.css'
import Link from 'next/link'

function Login({posts}) {
  return (
    <InitialLayout>
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
