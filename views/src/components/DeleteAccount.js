import style from '../styles/deleteAccount.module.css';

export default function DeleteAccount() {
    return (
        <div className={style.config}>
            <h2>Deletar Conta</h2>
            <form className={style.forms}>
                <div className={style.textField}>
                    <label htmlFor='current-password' className={style.labelField}>Senha</label>
                    <input
                    type='password'
                    id='current-password'
                    name='currentPassword'
                    className={style.inputField}
                    placeholder='Senha'
                    />
                </div>
                <button className={style.btn}>Deletar</button>
            </form>
        </div>
    );
}