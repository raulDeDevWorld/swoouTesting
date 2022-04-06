import { useRouter } from 'next/router'
import { useUser } from '../context/Context.js'
import { WithAuth } from '../HOCs/WithAuth'
import Success from '../components/Success'
import Error from '../components/Error'
import PageEspecial from '../layouts/PageEspecial'
import { getIds, query } from '../firebase/utils'
import style from '../styles/Progress.module.css'
import Button from '../components/Button'
import ProgressC from '../components/ProgressC'
import Modal from '../components/Modal'
import { useState, useEffect } from 'react'



function Progress() {
    const { user, userDB, id, setTeacherId, setUserSuccess, success } = useUser()
    const [mode, setMode] = useState(false)
    const [alert, setAlert] = useState(false)
    const [idConfig, setIdConfig] = useState(null)


    const router = useRouter()

    function x () {
        setMode(!mode)
    }
    function y () {
        setAlert(!alert)
    }
    function nextClick (e) {
        e.preventDefault()
        if (!navigator.onLine) {
            setUserSuccess('NoInternet')
            return
        }
        const idInput = e.target.form[0].value
        setIdConfig(idInput)
        query(idInput, setTeacherId, user.uid, userDB.aName, setUserSuccess, setAlert)
    }
    function sureClick (e) {
        e.preventDefault()
        getIds(idConfig, setTeacherId, user.uid, userDB.aName, setUserSuccess, true)
        setAlert(false)
    }
    function backClick (e) {
        e.preventDefault()
        router.back()
    }
    console.log(userDB.id)
    useEffect(() => {
        success == true ? x() : ''
    }, [success, alert]);
    return (
       
   <PageEspecial>
        {userDB !== 'loading' && 
            <>
            <div className={style.container}>
                <img src={`/robot.png`} className={style.robot} alt="user photo" />
                <div>
                    <span className={style.title}> {'ab1' == userDB.avatar || 'ab2' == userDB.avatar? 'Hola,': 'hola,'}  {`${userDB.aName.split(' ')[0].toUpperCase()}`}</span> 
                    <span className={style.subtitle}>Monitorea tus progresos desde aqui</span>
                </div>
            
                    <div className={style.gridContainer}>
                    {userDB.id ? <span className={`${style.subtitle} ${style.left} `}>Prof. Id: <span className={style.orange}>{userDB.id}</span></span> : <span className={style.subtitle}>Comparte tus progresos con tu profe.</span>}<br/>
                    <div className={style.grid}>
                        <ProgressC progress={userDB.s} errors={userDB.es} text={'Suma'}></ProgressC>
                        <ProgressC progress={userDB.r} errors={userDB.er} text={'Resta'}></ProgressC>
                        <ProgressC progress={userDB.m} errors={userDB.em} text={'Multiplicación'}></ProgressC>
                        <ProgressC progress={userDB.d} errors={userDB.ed} text={'División'}></ProgressC> 
                    </div>
                    </div>                   
          

                <div className={style.buttons}>                
                    <Button style='buttonSecondary' click={backClick}>Atras</Button><Button style='buttonPrimary' click={x}>{userDB.id ? 'Cambiar Prof. Id' : 'Compartir progreso'}</Button>
                </div>



            </div> 
 
          
            </>}
   
    <Modal mode={mode} click={x} text={`Ingresa el Id de tu profe...`}>
    <form className={style.form}>      
        <input className={style.modalInput} type="text" placeholder='alex73447725' />
        <button className={style.modalButton} onClick={nextClick}>ok</button>
    </form>
    </Modal>
    <Modal mode={alert} click={y} text={`Este Id esta preconfigurado para RESETEAR todos tus progresos...`}>
    <span className={style.black}>Id: <span className={style.black}>{idConfig}</span></span>
    <form className={style.form}>      
        <button className={style.modalButton} onClick={sureClick}>Continuar</button>
    </form>
    </Modal>
    {success ==true && <Success>Correcto</Success>}
    {success ==false && <Error>Error</Error>}
    {success === 'NoInternet' && <Error>Esta funcion necesita conexion</Error>}
    </PageEspecial>
    )
}

export default WithAuth(Progress)
