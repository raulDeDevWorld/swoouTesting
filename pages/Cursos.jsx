import PageLayout from '../layouts/PageLayout'
import { WithAuth } from '../HOCs/WithAuth'
import style from '../styles/Cursos.module.css'

function BancoDePreguntas () {
    return (
    <PageLayout>
        <div className={style.container}>
        <img src="/robot.png" className={style.robot} alt="user photo" />
        <div className={style.card}>
                <h3 className={style.paragraph}>Muy Pronto </h3>

                <h3 className={style.subtitle}>Curso de programación y diseño web</h3>


        </div>
        </div>
    </PageLayout>
    )
}

export default WithAuth(BancoDePreguntas)