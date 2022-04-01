import Button from '../components/Button'
import Subtitle from '../components/Subtitle'
import { useState, useEffect } from 'react'
import PageEspecial from '../layouts/PageEspecial'
import { useUser } from '../context/Context.js'
import { setProgress, setErrors } from '../firebase/utils'
import { useRouter } from 'next/router'
import Error from '../components/Error'
import { WithAuth } from '../HOCs/WithAuth'
import style from '../styles/Play.module.css'
import styleA from '../styles/PlayAdvanced.module.css'
import styleH from '../styles/Home.module.css'



function Potenciacion () {
    const { userDB, avatar, setUserSuccess, success } = useUser()
    const [objet, setObjet] = useState(null)
    const [countR, setCountR] = useState(0)
    const [countE, setCountE] = useState(0)
   

    const router = useRouter()
    function obj (){
        const nOne = Math.floor(Math.random()*(11-0))+0
        const nTwo = Math.floor(Math.random()*(4-0))+0
        const nFour = Math.floor(Math.random()*(5-1))+1
        const res = Math.pow(nOne, nTwo)
        const err1 = nOne != nTwo && nOne > 1 && nTwo > 1 ? Math.pow(nOne, ntwo) - 4: Math.pow(nOne, nTwo) +1
        const err2 = nOne != nTwo && nOne > 1 && nTwo > 1 ? Math.pow(nOne, nTwo) - 2 : Math.pow(nOne, nTwo) +3
        const err3 = nOne != nTwo && nOne > 1 && nTwo > 1 ? nOne * nTwo : Math.pow(nOne, nTwo) +4
        const err4 = nOne != nTwo && nOne > 1 && nTwo > 1 ? Math.pow(nTwo, nOne) : Math.pow(nOne, nTwo) +2

        setObjet({
            err1,
            err2,
            err3,
            err4,
            nOne,
            nTwo,
            nFour,
            res,
            correct: null,
            selected: null,
        })
      
    }
 
    function select (n) {

        if (userDB.premium === false && userDB.m + userDB.em > 30) {
            setUserSuccess(false) 
        return}

        const m = userDB.m
        const e = userDB.em
        const o ={
            correct: true, selected: n,
        }
        setObjet({...objet, ...o,})
        setTimeout(obj, 1500)
        n == objet.nFour ? setProgress(m+1, userDB.profesor, 'm') : setErrors(e+1, userDB.profesor, 'm')
        n == objet.nFour ? setCountR(countR+1) : setCountE(countE+1)
    }

    function nextClick () {
        router.push('/Home')
    }

    useEffect(() => {
        obj()
    }, []);
console.log(objet)   
if (objet !== null) {console.log(objet.nOne)}
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
                <div className={styleA.boxMain}>
                    
                    <span className={styleA.base}>{objet.nOne}</span>
                    <span className={styleA.exponente}>{objet.nTwo}</span>
                   
                </div>
                <div className={`${style.box} ${objet.selected == 1 && objet.selected !== objet.nFour? style.red: ''}  ${objet.selected !== null && 1 == objet.nFour? style.green: ''}`} onClick={(e)=>{select(1)}} >{objet.nFour == 1? objet.res: objet.err1} </div>
                <div className={`${style.box} ${objet.selected == 2 && objet.selected !== objet.nFour? style.red: ''}  ${objet.selected !== null && 2 == objet.nFour? style.green: ''}`} onClick={(e)=>{select(2)}} >{objet.nFour == 2? objet.res: objet.err2} </div>
                <div className={`${style.box} ${objet.selected == 3 && objet.selected !== objet.nFour? style.red: ''}  ${objet.selected !== null && 3 == objet.nFour? style.green: ''}`} onClick={(e)=>{select(3)}} >{objet.nFour == 3? objet.res: objet.err3} </div>
                <div className={`${style.box} ${objet.selected == 4 && objet.selected !== objet.nFour? style.red: ''}  ${objet.selected !== null && 4 == objet.nFour? style.green: ''}`} onClick={(e)=>{select(4)}} >{objet.nFour == 4? objet.res: objet.err4} </div>
                <button className={style.button} onClick={nextClick}>Finalizar</button> 
                </>}
           </div>
           </>}
           {success == false && <Error>Agotaste tu free mode: MULTIPLICACION</Error>}
        </div>
</PageEspecial>
    )


}
export default WithAuth(Potenciacion)
