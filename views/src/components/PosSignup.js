import style from '../styles/posSignup.module.css';

export default function PosSignup({isDarkMode}) {
    return (
        <div className={style.main}>
            <div className={isDarkMode ? `${style.card} ${style.darkMode}` : style.card}>
                <h1>Confirmação de E-mail</h1>
                <p className={style.mainText}>Uma mensagem com um link foi enviada para seu e-mail. Você tem até uma hora para clicar no link recebido e confirmar a criação de sua conta.<br/></p>
                <p className={style.bottomText}><br/>Caso não apareca nada na caixa de entrada, cheque sua caixa de lixo ou spam.<br/>Você será redirecionado a página de login.</p>
            </div>
        </div>
    )
}