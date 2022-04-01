import Loader from '../components/Loader'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useUser } from '../context/Context.js'
import { onAuth } from '../firebase/utils'

export function WithoutAuth(Component) {
    return () => {
        const { user, setUserProfile } = useUser()
        const router = useRouter()
        useEffect(() => {
          onAuth(setUserProfile)
          if (user) router.replace('/Home')
        }, [user]);

        return (
            <>
                {user === undefined && <Loader />}
                {user === null && <Component {...arguments} />}
            </>
        )
    }
}
