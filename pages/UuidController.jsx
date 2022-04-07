
import { useState, useEffect } from 'react'
import { generateUUID  } from '../utils/uuidGenerator'
import { setUuidFDB  } from '../firebase/utils'
import Button from '../components/Button'
import style from '../styles/Uuid.module.css'

export default function UuidController() { 

    const [uuid, setUuid] = useState([])

    function generate() {
        let uuidGenerates = []
        for (let i = 0; i < 10; i++) {
            const newUuid = generateUUID()
            uuidGenerates.push(newUuid)
        }
        setUuid([...uuidGenerates])
    }
    
    function añadir () {
        const obj = uuid.reduce(function(target, key, index) {
            target[key] = false
            return target;
          }, {})
          return setUuidFDB(obj)
    }

    useEffect(() => {
        
    }, []);

    return (
        <div className={style.container}>
            <div className={style.buttons}>
                <Button click={añadir} style={'buttonPrimary'}>añadir</Button>
                <Button click={generate} style={'buttonPrimary'}>generate</Button>
            </div>
            <div className={style.box}>
                {uuid.map((i, index) => <div key={index}>{i}</div>)}
            </div>
        </div>
)}