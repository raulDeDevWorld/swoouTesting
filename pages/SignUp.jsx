import { WithoutAuth } from '../HOCs/WithoutAuth'
import { withFacebook, withGoogle } from '../firebase/utils'
import InitialLayout from '../layouts/InitialLayout'
import style from '../styles/Auth.module.css'
import Link from 'next/link'

function SignUp () {
    return (
        <InitialLayout>
            <div className={style.container}>
                <h3 className={style.subtitle}>Registrate!!</h3>
                <div className={style.buttonsContainer}>
                    <button className={style.withFacebook} onClick={withFacebook}>continuar con Facebook</button>
                    <button className={style.withGoogle} onClick={withGoogle}>continuar con Google</button>
                </div>
                <div className={style.linkContainer}>Ya tienes una cuenta? <Link href="/" ><a className={style.link}>Iniciar Sesion</a></Link></div>
            </div>
        </InitialLayout>
    )
}

export default WithoutAuth(SignUp)