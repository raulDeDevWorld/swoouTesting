import { useState, useEffect } from 'react'
import Head from 'next/head'
import style from '../styles/InitialLayout.module.css'

export default function InitialLayout ({ children }) {
  // const [msg, setMsg] = useState('')
	// const [i, setI] = useState(0)
	// const [text] = useState('Hazlo Simple flow.')

  // useEffect(() => {
	// 	const interval = setTimeout(() => {
	// 		i < text.length
	// 			? setI(i => i + 1)
	// 			: clearTimeout(interval)
	// 		setMsg(msg => msg + text.charAt(i))
	// 	}, 100)
	// 	return () => clearTimeout(interval)
	// }, [i, text]);


  useEffect(() => {

    var sUsrAg = navigator.userAgent;

    if (( sUsrAg.indexOf("FBAN") > -1) || (sUsrAg.indexOf("FBAV") > -1 )) {
          alert("math.swoou.com utiliza tecnologías modernas que FACEBOOK NAVEGATOR no reconoce aun, por favor PRESIONE LOS TRES PUNTOS DEL LATERAL DERECHO Y ELIJA LA OPCIÓN ABRIR EN EL NAVEGADOR o intente directamente desde otro navegador o establezca otro navegador como prederterminado, gracias por su comprensión.");
          return
    }

});
  return (
<>
     <Head>
        <title>Swoou Mathematics - Materiales didactico tecnologicos para la enseña de Matemáticas</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#000000" />
        <meta name="msapplication-navbutton-color" content="#000000" /> 
        <meta name="apple-mobile-web-app-status-bar-style" content="#000000" /> 
        <meta name="description" content="Materiales didacticos para la enseñanza de Matemáticas, en la nueva era digital." />
        <meta name="keywords" content="Swoou, Swoou mathematics, Swoou math, 
                                      Materiales didacticos para la enseñanza de Matemáticas,
                                      Materiales didacticos para la enseñanza de Matemáticas a primaria,
                                      aplicaciones para la enseñanza de Matemáticas,
                                      aplicaciones para la enseñanza de Matemáticas a primaria,
                                      plataformas para la enseñanza de Matemáticas,
                                      plataformas para la enseñanza de Matemáticas a primaria,
                                      cursos particulares de Matemáticas para primaria," />
        <meta name="author" content="Raul Choque Romero, web and app developer, fundador de swoou.com" />
    </Head>
    <div className={style.container}>
      {/* <span className={style.msg}>{msg}</span>  */}
      <img src="logo-hazlo-simple-two.svg" className={style.logo} alt="logo Swoou Mathematics" />
      <main> { children } </main>
    </div>
</>
  )
}
