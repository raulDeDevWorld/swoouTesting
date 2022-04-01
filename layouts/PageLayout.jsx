import Head from 'next/head'
import Navbar from '../components/Navbar'
import style from '../styles/PageLayout.module.css'
import Link from 'next/link'


export default function PageLayout ({ children }) {
  return (
<>
     <Head>
     <title>Swoou Mathematics - Materiales didactico tecnologicos para la enseña de Matemáticas</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#000000" />
        <meta name="msapplication-navbutton-color" content="#000000" /> 
        <meta name="apple-mobile-web-app-status-bar-style" content="#000000" /> 
        <meta name="description" content="Desarrollando tecnología para hacer de un mundo complicado un mundo más sencillo" />
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
        <Navbar />
        <main className={style.mainContainer}> { children } </main>
        <div className={style.vector}>
          <button className={style.button}><a href="https://api.whatsapp.com/send?phone=+59173447725&text=buenas,%20me%20gustaria%20comunicarme%20con%20un%20%20operador(a)%20">Operador(a)</a></button>
        </div>
    </div>
    <footer className={style.footer}>
        <span>copyright 2022</span>
        <Link href="https://swoou.com/">
          <a>swoou.com</a>
        </Link>
    </footer>
</>
  )
}
