import { UserProvider } from '../context/Context'
import Script from 'next/script'

import '../styles/globals.css'

function MyApp ({ Component, pageProps }) {

return (
  <>
<Script
  strategy='lazyOnload'
  src={`https://www.googletagmanager.com/gtag/js?id=UA-161162896-1`} />
<Script
  strategy='lazyOnload' >
  {`window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'UA-161162896-1');`}
</Script>



  <UserProvider>
    <Component {...pageProps} />
  </UserProvider>
  </>
  )
}

export default MyApp
