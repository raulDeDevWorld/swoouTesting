import Head from 'next/head'


export default function PageEspecial ({ children }) {
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
        <main> { children } </main>
  
    </>
  )
}
