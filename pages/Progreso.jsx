import PageLayout from '../layouts/PageLayout'
import { useRouter } from 'next/router'
import { useUser } from '../context/Context.js'
import { WithAuth } from '../HOCs/WithAuth'
import Modal from '../components/Modal'
import PageEspecial from '../layouts/PageEspecial'
import { userDelete, getProgress, newStudent, progressReset, progressResetTeacher } from '../firebase/utils'
import style from '../styles/Progreso.module.css'
import Button from '../components/Button'
import ProgressC from '../components/ProgressC'
import { useEffect, useState } from 'react'

function Progreso() {
    const { user, userDB, id, setTeacherId, setStudentsProgress, progress, setUserSuccess } = useUser()
    const [mode, setMode] = useState(false)
    const [modl, setModl] = useState('')
    const [name, setName] = useState('')
    const [account, setAcoount] = useState(null)
    const [visibility, setVisibility] = useState(null)
    const [s, setS] = useState(false)
    const [r, setR] = useState(false)
    const [m, setM] = useState(false)
    const [d, setD] = useState(false)
    
    const router = useRouter()

    function backClick (e) {
        e.preventDefault()
        router.back()
    }
    function getDataProgress () {
        getProgress(setStudentsProgress, user.uid)
    }
    function manageVisibility (i, uid) {
        visibility === i ? setVisibility(null):setVisibility(i)
        newStudent(uid)

    }
    function delet (uid, name) {
        setName(name)
        setModl('delete')
        setMode(!mode)
        setAcoount(uid)
       
    }
    function sureDelete () {
        userDelete(account)
        setMode(!mode)
    }
    function resetButton () {
        userDelete(account)
        setModl('reset')
        setMode(!mode)
    }
    function x () {
        setMode(!mode)
    }
    function resetAutomatico () {
        progressResetTeacher(!userDB.reset)
    }
    function modalClick () {
        console.log('hello')
        progressReset(userDB.profesor, s, r, m, d, 'unity', account)
        setMode(!mode)
        setUserSuccess(true)
    }
    function selectElement (st) {
        switch (st){
            case 's':
                  setS(!s)
                  break;
            case 'r':
                  setR(!r)
                  break;
            case 'm':
                  setM(!m)
                  break;
            case 'd':
                  setD(!d)
            default:
                  break;      
      }
      return

    }
    useEffect(() => {
        getDataProgress()
    }, [mode, userDB.students]);
    return (
        <PageEspecial>  
        <div className={style.main}>
            {userDB !== 'loading' &&
                       <div className={style.container}>
                    <img src="/robot.png" className={style.perfil} alt="user photo" />
                    <p className={style.greeting}> Hola, {`${userDB.aName.split(' ')[0].toUpperCase()}`} controla el progreso de tus alumnos desde aqui...</p>
                    <div className={style.containerMap}>
                   
                    <>
                        <div><span className={style.circleRed}></span><span className={style.red}>Alumnos nuevos</span></div>
                        <div className={style.greenContainer}><span className={style.circleGreen}></span><span className={style.green}>Alumnos regulares</span></div>
                        <div className={style.blueContainer}><span className={`${style.circleBlueContainer} ${userDB.reset ?  '' : style.circleLeadContainer}`} onClick={resetAutomatico}><span className={`${style.circleBlue} ${userDB.reset ? '' : style.circleLead}`}></span></span><span className={style.blue}>Reset automatico</span></div>
                    </>
                 
                        {progress !== null ? progress.map((item, i) =>
                      
                            <div  className={`${style.item}`} key={i}> 
                            <div onClick={()=>manageVisibility(i, item.userUid)} className={`${item.nw == true?style.red:''}`}> {(`${item.name}`).split(' ')[0].charAt(0).toUpperCase()+(`${item.name}`).split(' ')[0].slice(1)}  {(`${item.name}`).split(' ').length > 0 ? (`${item.name}`).split(' ')[1].charAt(0).toUpperCase()+(`${item.name}`).split(' ')[1].slice(1): ''}
                            </div>
                                <div className={style.progressPorcent} onClick={()=>manageVisibility(i)}>

                                    {Math.round((Math.floor(item.s / 3 - item.es) 
                                     + Math.floor(item.r / 3 - item.er)
                                     + Math.floor(item.m / 3 - item.em)
                                     + Math.floor(item.d / 3 - item.ed))/4) <= 0 && '0%'}

                                    {Math.round((Math.floor(item.s / 3 - item.es) 
                                     + Math.floor(item.r / 3 - item.er)
                                     + Math.floor(item.m / 3 - item.em)
                                     + Math.floor(item.d / 3 - item.ed))/4) > 0 &&

                                     <div className={style.porcent} style={{ background: '#1eff00', width: `${
                                        Math.round((Math.floor(item.s / 3 - item.es) 
                                        + Math.floor(item.r / 3 - item.er)
                                        + Math.floor(item.m / 3 - item.em)
                                        + Math.floor(item.d / 3 - item.ed))/4) < 0 ? '0' : 
                                     Math.round((Math.floor(item.s / 3 - item.es) 
                                     + Math.floor(item.r / 3 - item.er)
                                     + Math.floor(item.m / 3 - item.em)
                                     + Math.floor(item.d / 3 - item.ed))/4)}%`, height: '15px' }}> 
                                     {`${Math.round((Math.floor(item.s / 3 - item.es) 
                                     + Math.floor(item.r / 3 - item.er)
                                     + Math.floor(item.m / 3 - item.em)
                                     + Math.floor(item.d / 3 - item.ed))/4) < 0 ? '0'

                                     : Math.round((Math.floor(item.s / 3 - item.es) 
                                     + Math.floor(item.r / 3 - item.er)
                                     + Math.floor(item.m / 3 - item.em)
                                     + Math.floor(item.d / 3 - item.ed))/4)}%`}</div>}

                                </div>
                                <img src="/delete.png" onClick={()=>{delet(item.userUid, item.name)}} className={style.delete} alt="delete" />
                                <span className={style.reset} onClick={()=>resetButton(item.userUid, item.name)}>Res</span>
                                <div className={`${style.viewGrid} ${visibility === i ? style.visibility: ''}`}>
                                <div className={style.grid}>
                                    <ProgressC progress={item.s} errors={item.es} text={'Suma'}></ProgressC>
                                    <ProgressC progress={item.r} errors={item.er} text={'Resta'}></ProgressC>
                                    <ProgressC progress={item.m} errors={item.em} text={'Multiplicación'}></ProgressC>
                                    <ProgressC progress={item.d} errors={item.ed} text={'División'}></ProgressC>
                                </div>
                                </div>
                            </div>) : ''}
                            <br />
                            <br />
                            <div className={style.orange}>Comparte tu id con tus alumnos para monitorear sus progresos...</div>

                    </div>

                    <button className={style.buttonBack} onClick={backClick}>Atras</button>
                    <Modal mode={mode == true && modl == 'delete'} click={x} text={`Esta por eliminar a:`} textTwo={name.toUpperCase()}>
                        <button className={style.modalButton} onClick={sureDelete}>Totalmente seguro</button>
                    </Modal>
                    <Modal mode={mode == true && modl == 'reset'} click={x} text={`Selecciona el progreso que quieras resetear`} textTwo={name.toUpperCase()}>
                                    <span onClick={x} className={style.x}>X</span>
                                    <div className={style.boxSelect}>
                                        <span className={style.textReset} onClick={() => selectElement('s')}>Suma </span> {s == true ? <img src='/right.svg' className={style.space} alt='rigth'></img> : ''}
                                    </div>
                                    <div className={style.boxSelect}>
                                        <span className={style.textReset} onClick={() => selectElement('r')}>Resta </span> {r == true ? <img src='/right.svg' className={style.space} alt='rigth'></img> : ''}
                                    </div>
                                    <div className={style.boxSelect}>
                                        <span className={style.textReset} onClick={() => selectElement('m')}>Multiplicación </span> {m == true ? <img src='/right.svg' className={style.space} alt='rigth'></img> : ''}
                                    </div>
                                    <div className={style.boxSelect}>
                                        <span className={style.textReset} onClick={() => selectElement('d')}>División </span> {d == true ? <img src='/right.svg' className={style.space} alt='rigth'></img> : ''}
                                    </div>

                                    <button className={style.modalButton} onClick={modalClick}>Totalmente seguro</button>
                                </Modal>
                </div>
                }
        </div>
        </PageEspecial>
    )
}

export default WithAuth(Progreso)