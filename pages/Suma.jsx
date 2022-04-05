
import { useState, useEffect } from 'react'
import { useUser } from '../context/Context.js'
import { setProgress, setErrors, dataCompare } from '../firebase/utils'
import { useRouter } from 'next/router'
import Error from '../components/Error'
import PageEspecial from '../layouts/PageEspecial'
import { WithAuth } from '../HOCs/WithAuth'
import style from '../styles/Play.module.css'




function Play () {
    const { userDB,  setUserSuccess, success, setUserData } = useUser()
    const [objet, setObjet] = useState(null)
    const [countR, setCountR] = useState(0)
    const [countE, setCountE] = useState(0)
    
    const router = useRouter()
    function obj (){
        const dificult = userDB.sumaConfig
        const nOne = Math.floor(Math.random()*(dificult-1))+1
        const nTwo = Math.floor(Math.random()*(dificult-0))+0
        const ale = () => Math.floor(Math.random()*(11-1))+1
        const nFour = Math.floor(Math.random()*(5-1))+1
        const res = nOne+nTwo
        const errO = nOne == nTwo || nOne == 0 || nTwo == 0? ale(): nOne
        const errT = nOne == nTwo || nOne == 0 || nTwo == 0? ale(): nTwo

        setObjet({
            nOne,
            nTwo,
            nFour,
            res,
            errO,
            errT,
            correct: null,
            selected: null,
        })
      
    }
 
    function select (n) {
        
        if (userDB.premium === false && userDB.s + userDB.es > 30) {
            setUserSuccess(false) 
        return}
        if (objet.selected !== null ) {
        return}
        const s = userDB.s
        const e = userDB.es
        const o ={
            correct: true, selected: n,
        }
        console.log(userDB)
        setObjet({...objet, ...o,})
        setTimeout(obj, 1500)
        n == objet.nFour ? setProgress(s+1, userDB.profesor, 's', setUserData) : setErrors(e+1, userDB.profesor, 's', setUserData)
        n == objet.nFour ? setCountR(countR+1) : setCountE(countE+1)
    }

    function nextClick () {
        router.back()
    }

    useEffect( () => { 
        obj() 
    }, [userDB.sumaConfig]);
    return (
<PageEspecial>
        <div className={style.main}>
        {userDB !== 'loading' &&
            <>
            <div className={style.container}>
                <img src={`/${userDB.avatar}.png`} className={style.perfil} alt="user photo" />
                <div className={style.textCont}>
                    <span className={style.white}>N: {`${userDB.aName.split(' ')[0].toUpperCase()}`}</span>
                    <div className={style.contRE}>
                        <span className={style.e}>{countE}</span>
                        <span className={style.r}>{countR}</span>
                    </div>
                </div>
                {objet !== null &&
                <>
                <div className={style.boxMain}>
                    <span>{objet.nOne}</span>
                    <span>+</span>
                    <span>{objet.nTwo}</span> 
                </div>
                <div className={`${style.box} ${objet.selected == 1 && objet.selected !== objet.nFour? style.red: ''}  ${objet.selected !== null && 1 == objet.nFour? style.green: ''}`} onClick={(e)=>{select(1)}} >{objet.nFour == 1? objet.res: objet.res + 5} </div>
                <div className={`${style.box} ${objet.selected == 2 && objet.selected !== objet.nFour? style.red: ''}  ${objet.selected !== null && 2 == objet.nFour? style.green: ''}`} onClick={(e)=>{select(2)}} >{objet.nFour == 2? objet.res: objet.res + 8} </div>
                <div className={`${style.box} ${objet.selected == 3 && objet.selected !== objet.nFour? style.red: ''}  ${objet.selected !== null && 3 == objet.nFour? style.green: ''}`} onClick={(e)=>{select(3)}} >{objet.nFour == 3? objet.res: objet.res - 8} </div>
                <div className={`${style.box} ${objet.selected == 4 && objet.selected !== objet.nFour? style.red: ''}  ${objet.selected !== null && 4 == objet.nFour? style.green: ''}`} onClick={(e)=>{select(4)}} >{objet.nFour == 4? objet.res: objet.res - 5} </div>
                <button className={style.button} onClick={nextClick}>Finalizar</button> 
                </>}
           </div>
           </>}
           {success == false && userDB.profesor == false && <Error>Agotaste tu free mode: MULTIPLICACION</Error>}
           {success == false && userDB.profesor && <Error>Eres Profe? obten tu modo premium Gratis, contactanos</Error>}
        </div>
</PageEspecial>
    )


}
export default WithAuth(Play)
