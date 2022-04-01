
import { useRouter } from 'next/router'
import Button from '../components/Button'
import PremiumC from '../components/PremiumC'
import PremiumPluss from '../components/PremiumPluss'
import PageLayout from '../layouts/PageLayout'
import { getCode } from '../firebase/utils'
import { useUser } from '../context/Context.js'
import { WithAuth } from '../HOCs/WithAuth'
import Success from '../components/Success'
import { useState, useEffect } from 'react'
import Error from '../components/Error'
import Modal from '../components/Modal'
import style from '../styles/Premium.module.css'

function Premium() {
    const router = useRouter()
    const [mode, setMode] = useState(false)
    const { user, userDB, setUserSuccess, success } = useUser()
    function x() {
        setMode(!mode)
    }
    function nextClick(e) {
        e.preventDefault()
        const code = e.target.form[0].value
        getCode(code, user.uid, setUserSuccess, userDB.profesor)
    }
    function backClick(e) {
        e.preventDefault()
        router.back()
    }
    function next() {
        router.push("https://api.whatsapp.com/send?phone=+59173447725&text=Buenas,%20me%20gustaria%20adquirir%20Swoou%20Premium...%20%20")
    }

    function enlace() {
        router.push("/Policy")
    }

    return (
        <>
            <PageLayout>
                {userDB.premium !== null && <div className={style.container}>

                    <PremiumC></PremiumC>
                    {userDB.premium === false && <div className={style.tiket}>9.70 BOB</div>}
                    <ul className={style.list}>
                        <li className={style.li}>Play ilimitado <img src='/right.svg' className={style.right} alt='rigth'></img></li>
                        <li className={style.li}>Robot ilimitado <img src='/right.svg' className={style.right} alt='rigth'></img></li>
                        <li className={style.li}>Cuadernillo de practica pdf <img src='/right.svg' className={style.right} alt='rigth'></img></li>
                        <li className={style.li}>No publicidad <img src='/right.svg' className={style.right} alt='rigth'></img></li>
                        <li className={style.li}>Soporte Tecnico <img src='/right.svg' className={style.right} alt='rigth'></img></li>
                    </ul>

                    {userDB.premium === false &&
                        <>
                            <PremiumPluss></PremiumPluss>
                            <div className={style.tiketTwo}>19.70 BOB</div>
                            <div className={style.spaceDiv}>
                                <Button style='buttonSecondary' click={backClick}>Atras</Button><Button style='buttonPrimary' click={next}>Adquirirlo ya</Button>
                            <div>
                                <a className={style.enlace} onClick={enlace}>Terminos y condiciones Swoou Premium</a> <br />
                                <a className={style.enlace} onClick={x}>Ya cuento con acceso a Swoou Premium</a>

                            </div> 
                           </div>
                        </>
                    }

                    {(`${userDB.premium}`).length > 16 &&
                        <div className={style.form}>
                            <span className={style.span}> Premium Code:</span>
                            <span className={style.code}> {userDB.premium} </span>
                            <Button style='buttonPrimary' click={backClick}>atras</Button> <br />
                            <a className={style.enlace} onClick={enlace}>Terminos y condiciones Swoou Premium</a>
                        </div>}
                </div>}

            </PageLayout>
            <Modal mode={mode} click={x} text={'Ingresa tu codigo de activación'}>
                <form className={style.form}>
                    <input className={style.input} type="text" placeholder='xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx' />
                    <Button style='buttonSecondary' click={backClick}>Atras</Button><Button style='buttonPrimary' click={nextClick}>Continuar</Button>
                </form>            
            </Modal>
            {success == true && <Success>Correcto</Success>}
            {success == false && <Error>Error</Error>}
        </>
    )
}

export default WithAuth(Premium)