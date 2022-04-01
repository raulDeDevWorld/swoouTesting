import Button from '../components/Button'
import PremiumC from '../components/PremiumC'
import { useRouter } from 'next/router'
import PageLayout from '../layouts/PageLayout'
import { WithAuth } from '../HOCs/WithAuth'
import { useUser } from '../context/Context.js'
import Subtitle from '../components/Subtitle'
import style from '../styles/Home.module.css'



function Play() { 
    const { userDB } = useUser()

    const router = useRouter()

    function suma () {
        router.push('/Suma')
    }
    function resta () {
        router.push('/Resta')
    }
    function multiplicacion () {
        router.push('/Multiplicacion')
    }
    function division () {
        router.push('/Division')
    }
    function back () {
        router.back()
    }
 
    return (
        <>
        <PageLayout>
            {userDB === 'loading' && ''}
         
           
            { userDB !== null && userDB !== 'loading' &&
                <div className={style.containerTwo}>
                    {userDB.premium !== false && <span className={style.subtitle}> Premium</span>}
                    {userDB.premium === false && <span className={style.subtitle}>Free mode</span>}
                 
                    <img src={`/${userDB.avatar}.png`} className={style.perfil} alt="user photo" />
                    <Subtitle> {'ab1' == userDB.avatar || 'ab2' == userDB.avatar? 'Bienvenido': 'Bienvenida'}: <br /> {`${userDB.aName.split(' ')[0].toUpperCase()}`}</Subtitle>
                    <Button style='buttonPrimary' click={suma}>Suma</Button>
                    <Button style='buttonPrimary'click={resta}>Resta</Button>
                    <Button style='buttonPrimary' click={multiplicacion}>Multiplicación</Button>
                    <Button style='buttonPrimary'click={division}>División</Button>
                    <Button style='buttonSecondary'click={back}>Atras</Button>
                    <PremiumC></PremiumC>
                </div>
            }
    
        </PageLayout>
 
        </>
    )
}

export default WithAuth(Play)
