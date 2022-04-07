import Button from '../../components/Button'
import PremiumC from '../../components/PremiumC'
import { useRouter } from 'next/router'
import PageLayout from '../../layouts/PageLayout'
import { WithAuth } from '../../HOCs/WithAuth'
import { useUser } from '../../context/Context.js'
import Subtitle from '../../components/Subtitle'
import Error from '../../components/Error'
import Paragraph from '../../components/Paragraph'
import style from '../../styles/Home.module.css'
import styleP from '../../styles/Progress.module.css'
import { useState } from 'react'


function Home() { 

    const { setUserAvatar, avatar, user, userDB, success, setUserSuccess } = useUser()
    const router = useRouter()

    function avatarClick(a) {
        setUserAvatar(a)
    }
    function nextClick() {
        avatar !== null ? router.push('/Welcome') : setUserSuccess(false)
    }
    function nextClickProfesor() {
        avatar !== null ? router.push('/Profesor') : setUserSuccess(false)
    }
    function practica() {
        if (!navigator.onLine) {
            setUserSuccess('NoInternet')
            return
        }
        router.push('https://drive.google.com/drive/folders/1WEakUFwv8boTWwPfwvvXmp1UpfcJ9qpa?usp=sharing')
 }
    function progress() {
        userDB.profesor == true ? router.push('/Progreso'): router.push('/Progress')
    }
    function play () {
        router.push('/Play')
    }
    function robot () {
        router.push('/Robot')
    }
    console.log(userDB)
    return (
        <>
        <PageLayout>
            {userDB === 'loading' && ''}
            {userDB === null &&
                <div className={style.containerTwo}>
                    <img src={user.photoURL} className={style.perfil} alt="user photo" />
                    <Subtitle> Bienvenido (a): <br /> {`${user.displayName.toUpperCase()}`}</Subtitle>
                    <Paragraph>Elige un avatar para tu hijo o hija</Paragraph>
                    <div className={style.avatarsContainer}>
                        <img src="/ab1.png" alt="avatar" className={`${style.avatarb1} ${avatar == 'ab1' ? style.right: ''}`} onClick={(e)=>{avatarClick('ab1')}}/>
                        <img src="/ab2.png" alt="avatar" className={`${style.avatarb2} ${avatar == 'ab2' ? style.right: ''}`} onClick={(e)=>{avatarClick('ab2')}}/>
                        <img src="/ag3.png" alt="avatar" className={`${style.avatarg1} ${avatar == 'ag3' ? style.right: ''}`} onClick={(e)=>{avatarClick('ag3')}}/>
                        <img src="/ag2.png" alt="avatar" className={`${style.avatarg2} ${avatar == 'ag2' ? style.right: ''}`} onClick={(e)=>{avatarClick('ag2')}}/>
                    </div> 
                    <div className={style.buttonsContainer}>
                    <Button style='buttonSecondary' click={nextClickProfesor}>Soy profesor</Button><Button style='buttonPrimary' click={nextClick}>Continuar</Button>

                    </div>
                </div>
            }
           
            { userDB !== null && userDB !== 'loading' && userDB.profesor !== true &&
                <div className={style.containerTwo}>
                    {userDB.premium !== false && <span className={style.subtitle}> Premium</span>}
                    {userDB.premium === false && <span className={style.subtitle}>Free mode</span>}
                 
                    <img src={`/${userDB.avatar}.png`} className={style.perfil} alt="user photo" />
                    <Subtitle> {'ab1' == userDB.avatar || 'ab2' == userDB.avatar? 'Bienvenido': 'Bienvenida'}: <br /> {`${userDB.aName.split(' ')[0].toUpperCase()}`}</Subtitle>
                    <Button style='buttonPrimary' click={play}>Play</Button>
                    <Button style='buttonPrimary'click={progress}>Progreso</Button>
                    <Button style='buttonPrimary' click={practica}>Practica <span className={style.pdf}>PDF</span></Button>
                    <Button style='buttonPrimary'click={robot}>Robot matemático</Button>
                    <PremiumC></PremiumC>
                </div>
            }
            {userDB !== null && userDB !== 'loading' && userDB.profesor == true &&
                <div className={style.containerTwo}>
                    {userDB.premium === true && <span className={style.subtitle}> Premium</span>}
                 
                    <img src={`/${userDB.avatar}.png`} className={style.perfil} alt="user photo" />
                    <div>
                    <Subtitle> {'ab1' == userDB.avatar || 'ab2' == userDB.avatar? 'Bienvenido': 'Bienvenida'}: <br /> {`${userDB.aName.split(' ')[0].toUpperCase()}`}</Subtitle>
                        {userDB.premium === false && <span className={style.subtitle}><span className={style.id}>Id:</span> {userDB.id}</span>}
                    </div>                    
                    <Button style='buttonPrimary' click={play}>Play</Button>
                    <Button style='buttonPrimary'click={progress}>Progreso</Button>
                    <Button style='buttonPrimary' click={practica}>Practica <span className={style.pdf}>PDF</span></Button>
                    <Button style='buttonPrimary'click={robot}>Robot matemático</Button>
                    <span className={style.fontBlack}>Comparte tu id con tus alumnos, para ver sus progresos.</span><br /><br />

                </div>
            }
        </PageLayout>
        {success ==false && <Error>Elija un avatar</Error>}
        {success === 'NoInternet' && <Error>Esta funcion necesita conexion</Error>}

        </>
    )
}

export default WithAuth(Home)
