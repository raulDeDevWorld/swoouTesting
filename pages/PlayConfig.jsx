import Button from '../components/Button'
import Subtitle from '../components/Subtitle'
import { useState, useEffect } from 'react'
import PageEspecial from '../layouts/PageEspecial'
import { useUser } from '../context/Context.js'
import { playDificult } from '../firebase/utils'
import { useRouter } from 'next/router'
import { WithAuth } from '../HOCs/WithAuth'
import Error from '../components/Error'
import Success from '../components/Success'
import style from '../styles/PlayConfig.module.css'
import {rob} from '../utils/robot'



function PlayConfig() {
    const { userDB, avatar, setUserSuccess, success, setUserData } = useUser()
    const [mode, setMode] = useState('suma')
    const [modeTwo, setModeTwo] = useState('multiplicacion')
    const [controller, setController] = useState(false)
    const [sumaConfig, setSumaConfig] =useState(99)
    const [restaConfig, setRestaConfig] =useState(99)
    const [multiplicacionConfig, setMultiplicacionConfig] =useState(10)
    const [divisionConfig, setDivisionConfig] =useState(10)


    const router = useRouter()



    function suma () {
        setMode('suma')
    }
    function resta () {
        setMode('resta')
    }
    function multiplicacion() {
        setModeTwo('multiplicacion')
    }
    function division() {
        setModeTwo('division')
    }


  
    function cHandler (n) {
        mode == 'suma' ? setSumaConfig(n) : setRestaConfig(n)
    }
    function clickHandler (n) {
        modeTwo == 'multiplicacion' ? setMultiplicacionConfig(n) : setDivisionConfig(n)
      
    }

    function back () {
        router.back()
    }
    function save () {   
        if (userDB.premium === false){
            setUserSuccess(false)
            return
        }
        if ( userDB.id == 'Te ha eliminado'){
            playDificult(userDB.profesor, {sumaConfig, restaConfig, multiplicacionConfig, divisionConfig }, setUserData)
            setUserSuccess(true)
            return 
        }
        if (userDB.id && userDB.profesor == false) {
            setUserSuccess(false)
            return
        }
        playDificult(userDB.profesor, {sumaConfig, restaConfig, multiplicacionConfig, divisionConfig }, setUserData)
        setUserSuccess(true)
    }

    useEffect( () => {
        userDB.sumaConfig ? setSumaConfig(userDB.sumaConfig) : ""
        userDB.restaConfig ? setRestaConfig(userDB.restaConfig) : ""
        userDB.multiplicacionConfig ? setMultiplicacionConfig(userDB.multiplicacionConfig) :''
        userDB.divisionConfig ? setDivisionConfig(userDB.divisionConfig) :''
    }, [userDB.sumaConfig, userDB.restaConfig, userDB.multiplicacionConfig, userDB.divisionConfig]);
    return (
        <PageEspecial>
        <div className={style.main}>
            {userDB !== 'loading' &&
                <>
                    <div className={style.container}>

                        <img src="/robot.png" className={style.perfil} alt="user photo" />
                        <p className={style.greeting}> Hola, {`${userDB.aName.split(' ')[0].toUpperCase()}`} configura el Play de tus estudiantes desde aqui...</p>


                        <div className={style.box}>
                            <button className={`${style.button} ${ mode== 'suma' ? style.right : ''}`} onClick={suma}>Suma</button>
                            <button className={`${style.button} ${ mode == 'resta' ? style.right : ''}`} onClick={resta}>Resta</button>
                        </div>
                        <p className={style.greeting}>Selecciona una cifra...</p>
                        <div className={`${style.boxSelect}`}>
                            <span className={`${sumaConfig >= 9 && mode == 'suma'? style.green : ''} ${restaConfig >= 9 && mode == 'resta'? style.green : ''}`} onClick={() => cHandler(9)}>1 Cifra</span>
                            <span className={`${sumaConfig >= 99 && mode == 'suma'? style.green : ''} ${restaConfig >= 99 && mode == 'resta'? style.green : ''}`} onClick={() => cHandler(99)}>2 Cifras</span>
                            <span className={`${sumaConfig >= 999 && mode == 'suma'? style.green : ''} ${restaConfig >= 999 && mode == 'resta'? style.green : ''}`} onClick={() => cHandler(999)}>3 Cifras</span>
                        </div>
                         
                        <div className={style.box}>
                            <button className={`${style.button} ${modeTwo == 'multiplicacion' ? style.right : ''}`} onClick={multiplicacion}>Multiplicación</button>
                            <button className={`${style.button} ${modeTwo == 'division' ? style.right : ''}`} onClick={division}>División</button>
                        </div>
                        <p className={style.greeting}>Selecciona una o mas tablas...</p>
                        <div className={`${style.boxSelect}`}>
                            <span className={`${modeTwo == 'multiplicacion' && multiplicacionConfig >= 0 ? style.green : ''} ${modeTwo == 'division' && divisionConfig >= 0 ? style.green : ''}`} onClick={() => clickHandler(0)} >0</span> 
                            <span className={`${modeTwo == 'multiplicacion' && multiplicacionConfig >= 1 ? style.green : ''} ${modeTwo == 'division' && divisionConfig >= 1 ? style.green : ''}`} onClick={() => clickHandler(1)} >1</span>
                            <span className={`${modeTwo == 'multiplicacion' && multiplicacionConfig >= 2 ? style.green : ''} ${modeTwo == 'division' && divisionConfig >= 2 ? style.green : ''}`} onClick={() => clickHandler(2)} >2</span>
                            <span className={`${modeTwo == 'multiplicacion' && multiplicacionConfig >= 3 ? style.green : ''} ${modeTwo == 'division' && divisionConfig >= 3 ? style.green : ''}`} onClick={() => clickHandler(3)} >3</span>
                            <span className={`${modeTwo == 'multiplicacion' && multiplicacionConfig >= 4 ? style.green : ''} ${modeTwo == 'division' && divisionConfig >= 4 ? style.green : ''}`} onClick={() => clickHandler(4)} >4</span>
                            <span className={`${modeTwo == 'multiplicacion' && multiplicacionConfig >= 5 ? style.green : ''} ${modeTwo == 'division' && divisionConfig >= 5 ? style.green : ''}`} onClick={() => clickHandler(5)} >5</span>
                            <span className={`${modeTwo == 'multiplicacion' && multiplicacionConfig >= 6 ? style.green : ''} ${modeTwo == 'division' && divisionConfig >= 6 ? style.green : ''}`} onClick={() => clickHandler(6)} >6</span>
                            <span className={`${modeTwo == 'multiplicacion' && multiplicacionConfig >= 7 ? style.green : ''} ${modeTwo == 'division' && divisionConfig >= 7 ? style.green : ''}`} onClick={() => clickHandler(7)} >7</span>
                            <span className={`${modeTwo == 'multiplicacion' && multiplicacionConfig >= 8 ? style.green : ''} ${modeTwo == 'division' && divisionConfig >= 8 ? style.green : ''}`} onClick={() => clickHandler(8)} >8</span>
                            <span className={`${modeTwo == 'multiplicacion' && multiplicacionConfig >= 9 ? style.green : ''} ${modeTwo == 'division' && divisionConfig >= 9 ? style.green : ''}`} onClick={() => clickHandler(9)} >9</span>
                            <span className={`${modeTwo == 'multiplicacion' && multiplicacionConfig >= 10 ? style.green : ''} ${modeTwo == 'division' && divisionConfig >= 10 ? style.green : ''}`} onClick={() => clickHandler(10)} >10</span>
                            <span className={`${modeTwo == 'multiplicacion' && multiplicacionConfig >= 11 ? style.green : ''} ${modeTwo == 'division' && divisionConfig >= 11 ? style.green : ''}`} onClick={() => clickHandler(11)} >11</span>
                        </div>

                        <div className={style.buttonContainer}>         
                            <button className={style.buttonGreen} onClick={back}>Atras</button>
                            <button className={style.buttonGreen} onClick={save}>Guardar</button>
                        </div>

               
                    </div>

                </>}
                {success ==true && <Success>Correcto</Success>}
                {success == false && <Error>Tu profe pre-configuro tu play</Error>}
                {success == false && userDB.profesor == false && <Error>Hazte Premium para modificar datos</Error>}
                {success == false && userDB.profesor && <Error>Eres Profe? obten tu modo premium Gratis, contactanos</Error>}

        </div>
        </PageEspecial>
    )
}
export default WithAuth(PlayConfig)