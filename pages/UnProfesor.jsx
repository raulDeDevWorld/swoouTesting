import PageLayout from '../layouts/PageLayout'
import { WithAuth } from '../HOCs/WithAuth'
import style from '../styles/Home.module.css'

function Simulacro () {
    return (
    <PageLayout>
        <div className={style.container}>
            Test
        </div>
    </PageLayout>
    )
}

export default Simulacro