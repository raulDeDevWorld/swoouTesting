import { useRouter } from 'next/router'
import style from '../styles/PremiumC.module.css'
import { useUser } from '../context/Context.js'

function PremiumPluss() {

    const {  userDB } = useUser()
    const router = useRouter()
    function next () {
        router.push("https://api.whatsapp.com/send?phone=+59173447725&text=buenas,%20me%20gustaria%20adquirir%20Swoou%20Premium%20Pluss%20")

    }  
    return (
            <div className={style.box} onClick={next}>
                <span className={style.title}>Swoou Premium+</span>
                <div className={style.cont}>
                <span className={style.subtitle}>{(`${userDB.premium}`).length > 16 ? 'Felicidades!!!': 'cuadernillo fisico'}</span>
                    <span className={style.subtitleTwo}>{(`${userDB.premium}`).length > 16 ? 'Eres PREMIUM': 'cuadernillo fisico'}</span>
                </div>
            </div>
           )}
export default PremiumPluss