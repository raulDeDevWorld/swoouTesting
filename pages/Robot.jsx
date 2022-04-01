import Button from '../components/Button'
import Subtitle from '../components/Subtitle'
import { useState, useEffect } from 'react'
import PageEspecial from '../layouts/PageEspecial'
import { useUser } from '../context/Context.js'
import { progressUpdate, errorsUpdate } from '../firebase/utils'
import { useRouter } from 'next/router'
import { WithAuth } from '../HOCs/WithAuth'
import Error from '../components/Error'
import style from '../styles/Robot.module.css'
import styleH from '../styles/Home.module.css'
import {rob} from '../utils/robot'



function Robot() {
    const { userDB, avatar, setUserSuccess, success } = useUser()
    const [mode, setMode] = useState('multiplicacion')
    const [values, setValues] = useState({ firstValue: '', secondValue: '' })
    const [res, setRes] = useState(false)
    const [obj, setObj] =useState(null)
    const [cifDiv, setCifDiv] =useState('')

    const router = useRouter()

    function multiplicacion() {
        setMode('multiplicacion')
    }
    function division() {
        setMode('division')
    }
    function handleInputChange(e) {
        e.preventDefault()
        if (userDB.premium === false && userDB.progress + userDB.errors == 30) {
            setUserSuccess(false) 
        return}
        const name = e.target.name
        const value = e.target.value
        setValues({ ...values, [name]: value })
        setObj(null)
    }
    function resolver() {
        if (userDB.premium === false && userDB.progress + userDB.errors == 30) {
            setUserSuccess(false) 
        return}
        setRes(true)
    }
  
    
    useEffect(() => {
        values.firstValue !== '' && values.secondValue !== '' ? setObj(rob(values.firstValue, values.secondValue)): ''
        values.firstValue > 0 && values.firstValue.substring(0, 1) == 0 && mode == 'division' ? setValues({ ...values, firstValue: `${values.firstValue * 1}` }):''
        values.firstValue.substring(0, values.secondValue.length) >= values.secondValue 
        ? setCifDiv(values.firstValue.substring(0, values.secondValue.length))
        : setCifDiv(values.firstValue.substring(0, values.secondValue.length + 1))
    },[values]);   
    console.log(cifDiv)
    return (
        <PageEspecial>
        <div className={style.main}>
            {userDB !== 'loading' &&
                <>
                    <div className={style.container}>

                        <img src="/robot.png" className={style.perfil} alt="user photo" />
                        <p className={style.greeting}> Hola, {`${userDB.aName.split(' ')[0].toUpperCase()}`} dime en que te ayudo...</p>

                        <div className={style.box}>
                            <button className={`${style.button} ${mode == 'multiplicacion' ? style.right : ''}`} onClick={multiplicacion}>Multiplicación</button>
                            <button className={`${style.button} ${mode == 'division' ? style.right : ''}`} onClick={division}>División</button>
                        </div>
                        <p className={style.greeting}>Ingresa los datos</p>

                        <div className={style.box}>
                            <input className={style.input} type="number" maxLength={12} name="firstValue" onChange={handleInputChange} placeholder={mode == 'division' ? 'Dividendo' : 'Multiplicando'} />
                            <input className={style.input} type="number" maxLength={12} name="secondValue" onChange={handleInputChange} placeholder={mode == 'division' ? 'Divisor' : 'Multiplicador'} />
                        </div>
                        <div className={style.boxMain}>

                            {mode == 'multiplicacion' ?
                                <div className={style.multBox}>
                                    <span className={style.p}>{values.firstValue}</span>
                                    <span className={`${style.p} ${res == true && values.secondValue.length < 2 ? '' : style.border}`}>
                                        <span className={style.red}>{values.secondValue !== '' ? 'X': ''}</span>{values.secondValue.length < values.firstValue.length?<span className={style.hideTrick}>{values.secondValue > 0 ? values.firstValue.substring(0, (values.firstValue.length - 1 - values.secondValue.length)).toString().replace(/[1-9]/g, '0'): ''}</span>:' '}{values.secondValue}
                                    </span>
                                    {res == true && values.secondValue.length > 1 && values.firstValue.length > 0? values.secondValue.split('').reverse().map((i, index) => <span className={style.p} key={index}>{i == 0 ||  values.firstValue == 0 ? values.firstValue.toString().replace(/[1-9]/g, '0') : i * values.firstValue
                                    }<span className={style.hide}>{values.secondValue.substring(0, index)} </span></span>) : ''}
                                    {res == true && values.secondValue.length > 0 && values.firstValue.length > 0 ? <span className={`${style.p} ${style.borderTop}`}>{ values.secondValue == 0 || values.firstValue == 0? values.firstValue.toString().replace(/[1-9]/g, '0') + values.secondValue.split('').map((i, index) =>0).toString().replace(/[,]/g, '').replace('0', ''): ''}{ values.secondValue > 0 && values.firstValue > 0? values.firstValue * values.secondValue : ''} </span> : ''}
                                </div> :

                                <div className={`${style.divisionBox} ${values.firstValue !== '' || values.secondValue !== '' ? style.display : ''}`}>
                                    <span className={`${style.dividendo} ${values.firstValue !== '' || values.secondValue !== '' ? style.vertical : ''}`}>
                                  
                                        <div><span className={res == true  && values.firstValue > 0 && values.secondValue > 0 ? style.cifDiv: ''}>{cifDiv}</span><span>{values.firstValue.toString().substring(cifDiv.length ).split('').map((item, i)=> <span className={res == true && values.secondValue !== '' && values.firstValue > 0 && values.secondValue > 0?style.cifDivTwo:''} key={i}>{item}</span>)}</span></div>
                                        {obj !== null && values.firstValue > 0 && res == true ? obj.cifra.map((i, index) => <span className={style.residuo} key={index}><span>{values.firstValue < values.secondValue ? obj.zero[index]: ''}</span>{i}<span className={style.hideDiv}>{Math.trunc(values.firstValue / values.secondValue).toString().replace(/,/g, "").substring(0, (obj.space[index + 1]))}</span></span>) : ''}{obj !== null && values.firstValue == 0 && values.secondValue > 0 && res == true ?<span className={style.specialZero}>0</span>:''}{obj !== null && values.firstValue == 0 && values.secondValue == 0 && res == true ?<span className={style.specialZero}>NaN</span>:''}
                                    </span>
                                    {values.secondValue !== '' ? <span className={style.divisor}><span className={`${values.firstValue !== '' || values.secondValue !== '' ? style.horizontal : ''}`}>{values.secondValue}</span><span className={style.span}>{values.firstValue !== '' && values.secondValue !== '' && res == true ? Math.trunc(values.firstValue / values.secondValue) : ''}</span></span> : ''}
                                </div>}
                        </div>
                        <button className={style.buttonGreen} onClick={resolver}>Resolver</button>

                    </div>

                </>}
                {success == false && <Error>Agotaste tu modo prueba</Error>}
        </div>
        </PageEspecial>
    )


}
export default WithAuth(Robot)
