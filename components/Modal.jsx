import style from '../styles/Modal.module.css'
import { useState } from 'react'

export default function Progreso(props ) {

    return ( <>
    
        {props.mode && <div className={style.modalContainer}>
            <div className={style.contBlue}>

                <span onClick={props.click} className={style.x}>X</span>
                <img src="/robot.png" className={style.modalBoot} alt="user photo" />
                <span className={style.textModal}>{ props.text }<br/>{ props.textTwo }</span>
                { props.children }
            </div>
        </div>} </>
    )
}