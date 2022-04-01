import PageLayout from '../layouts/PageLayout'
import { WithAuth } from '../HOCs/WithAuth'

import Link from 'next/link'
import style from '../styles/About.module.css'

function Policy() {
    return (
        <PageLayout>
         <div className={style.container}>
         <img src="logo-hazlo-simple.svg" className={style.logo} alt="logo" />
            <h3 className={style.subtitle}>Polica De Privacidad Y Servicios</h3>
            <h4>Informacion Personal</h4>
            <p>Swoou Math requiere acceder a la informacion basica de su cuenta en Google o Facebook simplemente para mejorar la experiencia de usuario de manera personazalida, no se usara dicha informacion para fines diferentes del ya mencionado cometido.</p>
            <h4>Licencia de servicio Swoou Premium</h4>
            <p>Cuando usted adquiere Swoou Premium desde esta plataforma lo que en realidad esta adquiriendo es una licencia para Swoou Math, para acceder a esta plataforma de manera pemium, con todos los beneficios como ser: Play Ilimitado, Robot matematico ilimitado, Cuadernillo de practicas en pdf, no publicidad y soporte Tecnico.</p>
            <h4>Licencia de servicio Swoou Premium+</h4>
            <p>La unica diferencia entre Swoou Premium y Swoou Premium+ es que usted recibe el cuadernillo de practicas en fisico muy aparte del pdf</p>
            <h4>Vigencia de la Licencia</h4>
            <p>Ya sea usted adquiera Swoou Premium o Swoou Premium+ la licencia que se le otorga tiene una vigencia unicamente para el año en en curso, LA LICENCIA NO ES PARA SIEMPRE, debido al coste que supone el consumo de datos a la base de datos.</p>
         </div>
        </PageLayout>
    )
}

export default WithAuth(Policy)