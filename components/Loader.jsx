import style from '../styles/Loader.module.css'
import PageEspecial from '../layouts/PageEspecial'


export default function Loader () {
    return (
        <PageEspecial>  

    <div className={style.spinnerContainer}>
        <div className={style.spinner}>
            <div>
            </div>
            <div>
            </div>
        </div>
    </div>
    </PageEspecial>
    )
}
