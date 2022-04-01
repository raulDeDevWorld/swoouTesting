import Button from '../components/Button'
import PremiumC from '../components/PremiumC'
import { useRouter } from 'next/router'
import PageLayout from '../layouts/PageLayout'
import { WithAuth } from '../HOCs/WithAuth'
import { useUser } from '../context/Context.js'
import { avatarUpdate } from '../firebase/utils'
import Error from '../components/Error'
import Success from '../components/Success'
import Paragraph from '../components/Paragraph'
import style from '../styles/Config.module.css'
import styleP from '../styles/Progress.module.css'
import { useState } from 'react'


function ConfigAvatar() { 
    const { setUserAvatar, avatar, user, userDB, success, setUserSuccess } = useUser()
    const router = useRouter()

    function avatarClick(a) {
        setUserAvatar(a)
    }
    function nextClick() {
        if (userDB.premium === false){
            setUserSuccess(false)
            return
        }
        if (avatar !== null) {
            setUserSuccess(true)
            avatarUpdate(avatar, userDB.profesor)
        } else {
            setUserSuccess(false)
        } 
    }
    function back () {
        router.back()
    }
   
    return (
        <>
        <PageLayout>
            {userDB === 'loading' && ''}
            {userDB !== null && userDB !== 'loading' &&
                    <div className={style.container}>
                        <span className={style.orange}>Config Mode</span>
                        <img src="/robot.png" className={style.robot} alt="user photo" />
                        <span className={style.title}> {'ab1' == userDB.avatar || 'ab2' == userDB.avatar ? 'Hola,' : 'Bienvenida,'}  {`${userDB.aName.split(' ')[0].toUpperCase()}`}</span>
                     <span className={style.paragraph}>Elige tu nuevo un avatar </span>
                    <div className={style.avatarsContainer}>
                        <img src="/ab1.png" alt="avatar" className={`${style.avatarb1} ${avatar == 'ab1' ? style.right: ''}`} onClick={(e)=>{avatarClick('ab1')}}/>
                        <img src="/ab2.png" alt="avatar" className={`${style.avatarb2} ${avatar == 'ab2' ? style.right: ''}`} onClick={(e)=>{avatarClick('ab2')}}/>
                        <img src="/ag3.png" alt="avatar" className={`${style.avatarg1} ${avatar == 'ag3' ? style.right: ''}`} onClick={(e)=>{avatarClick('ag3')}}/>
                        <img src="/ag2.png" alt="avatar" className={`${style.avatarg2} ${avatar == 'ag2' ? style.right: ''}`} onClick={(e)=>{avatarClick('ag2')}}/>
                    </div> 
                    <div className={style.buttonsContainer}>
                    <Button style='buttonSecondary' click={back}>atras</Button><Button style='buttonPrimary' click={nextClick}>Continuar</Button>
                    </div>
                </div>
            }
           
    

        </PageLayout>
        {success ==true && <Success>Correcto</Success>}
        {success ==false && avatar == null && userDB.premium && <Error>Elija un avatar</Error>}
        {success == false && userDB.profesor == false && userDB.premium == false && <Error>Hazte Premium para modificar datos</Error>}
        {success == false && userDB.profesor && userDB.premium == false && <Error>Eres Profe? obten tu modo premium Gratis, contactanos</Error>}

        </>
    )
}

export default WithAuth(ConfigAvatar)