import Button from '../components/Button'
import Subtitle from '../components/Subtitle'
import PageLayout from '../layouts/PageLayout'
import { useUser } from '../context/Context.js'
import { dataUser, setDataTeachers } from '../firebase/utils'
import { useRouter } from 'next/router'
import { WithAuth } from '../HOCs/WithAuth'
import Paragraph from '../components/Paragraph'
import Error from '../components/Error'
import Success from '../components/Success'
import style from '../styles/Config.module.css'

function ConfigPerfil () {
    const { setUserAvatar, user, userDB, success, setUserSuccess } = useUser()

    const router = useRouter()
 

    function nextClick (e) {
        e.preventDefault()
        if (userDB.premium === false){
            setUserSuccess(false)
            return
        }
        const aName = e.target.form[0].value
        const grade = e.target.form[1].value
        const school = e.target.form[2].value
        const cell = null
        const profesor = false

        if(aName.length > 2 && grade.length > 2 && school.length >2){
            dataUser(aName, grade, school, userDB.avatar, cell, profesor, userDB.premium)  
            setUserSuccess(true) 
        } else {
            setUserSuccess(false)
        }

    }
    
    
        function nextClickProfesor (e) {
            e.preventDefault()
            if (userDB.premium === false){
                setUserSuccess(false)
                return
            }
            const aName = e.target.form[0].value
            const school = e.target.form[1].value
            const grade = e.target.form[2].value
            const cell = e.target.form[3].value
            const profesor = true
            if(aName.length > 2 && grade.length > 4 && school.length > 3 && cell.length > 7){
                setDataTeachers(aName, grade, school, userDB.avatar, cell, profesor, userDB.premium)  
                setUserSuccess(true)
            } else {
                setUserSuccess(false)
            }
    
        }
   


    function backClick (e) {
        e.preventDefault()
        router.back()
    }

    return (
        <>
    <PageLayout>
        {userDB !== null && userDB !== 'loading' && userDB.profesor !== true &&
                      <div className={style.container}>
                      <span className={style.orange}>Config Mode</span>
                      <img src="/robot.png" className={style.robot} alt="user photo" />
                      <span className={style.title}> {'ab1' == userDB.avatar || 'ab2' == userDB.avatar ? 'Hola,' : 'Bienvenida,'}  {`${userDB.aName.split(' ')[0].toUpperCase()}`}</span>
                   <span className={style.paragraph}>Modifica tus datos desde aqui </span> 
                   <form className={style.form}>
                    <label>
                        Nombre y apellido:
                        <input className={style.input} type="text" placeholder='Alex Choque'/>
                    </label>
                    <label>
                        Grado: 
                        <input className={style.input} type="text" placeholder='Cuarto B'/>
                    </label>
                    <label>
                        Colegio: 
                        <input className={style.input} type="text" placeholder='Guido Villagomez B'/>
                    </label>
                    <div className={style.buttonsContainer}>
                        <Button style='buttonSecondary' click={backClick}>Atras</Button>
                        <Button style='buttonPrimary' click={nextClick}>Continuar</Button>
                    </div>
                </form>
            </div>
            }
            {userDB !== null && userDB !== 'loading' && userDB.profesor === true &&
                      <div className={style.container}>
                      <span className={style.orange}>Config Mode</span>
                      <img src="/robot.png" className={style.robot} alt="user photo" />
                      <span className={style.title}> {'ab1' == userDB.avatar || 'ab2' == userDB.avatar ? 'Hola,' : 'Bienvenida,'}  {`${userDB.aName.split(' ')[0].toUpperCase()}`}</span>
                   <span className={style.paragraph}>Modifica tus datos desde aqui </span> 
                   <form className={style.form}>
                    <label>
                        Nombre y apellido:
                        <input className={style.input} type="text" placeholder='Alex Choque'/>
                    </label>
                    <label>
                        Grado: 
                        <input className={style.input} type="text" placeholder='Cuarto B'/>
                    </label>
                    <label>
                        Colegio: 
                        <input className={style.input} type="text" placeholder='Guido Villagomez B'/>
                    </label>
                    <label>
                        Numero de celular: 
                        <input className={style.input} type="number" placeholder='73447725'/>
                    </label>
                    <div className={style.buttonsContainer}>
                        <Button style='buttonSecondary' click={backClick}>Atras</Button>
                        <Button style='buttonPrimary' click={nextClickProfesor}>Continuar</Button>
                    </div>
                </form>
            </div>
            }
    </PageLayout>
    {success ==true && <Success>Correcto</Success>}
    {success ==false && <Error>Llene todo el formulario</Error>}
    {success == false && userDB.profesor == false && userDB.premium == false &&<Error>Hazte Premium para modificar datos</Error>}
    {success == false && userDB.profesor && userDB.premium == false && <Error>Eres Profe? obten tu modo premium Gratis, contactanos</Error>}

    </>
    )
}

export default WithAuth(ConfigPerfil)