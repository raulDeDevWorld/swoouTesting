import style from '../styles/Text.module.css'

export default function Paragraph (props) {
    return (
        <p className={style.paragraph}>{props.children}</p>
    )
}