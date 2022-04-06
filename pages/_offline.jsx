import PageLayout from '../layouts/PageLayout'
import { WithAuth } from '../HOCs/WithAuth'
import Button from '../components/Button'
import PremiumC from '../components/PremiumC'
import style from '../styles/Config.module.css'
import router from 'next/router'


function Config () {
   
    function back () {
        router.back()
    }
 

   
    return (
    
    <PageLayout>
        <div className={style.container}>
            <span className={style.orange}>Offline Mode</span>
            <img src="/robot.png" className={style.robot} alt="user photo" />
            <span className={style.title}>Hola,<br />Conectate a internet o instala SWOOU en tu dispositivo y despreocupate del internet... </span>
            <div className={style.box}>
            <Button style='buttonSecondary' click={back}>Atras</Button>
            </div>
            <PremiumC></PremiumC>
         </div> 

    </PageLayout>
    )
}

export default WithAuth(Config)