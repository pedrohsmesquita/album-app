import style from '../styles/changePassword.module.css';

export default function ChangePassword() {
    return (
        <div className={style.config}>
            <h2>Alterar Senha</h2>
            <form className={style.forms}>
                <div className={style.textField}>
                    <label htmlFor='current-password' className={style.labelField}>Senha atual</label>
                    <input
                    type='password'
                    id='current-password'
                    name='currentPassword'
                    className={style.inputField}
                    placeholder='Senha atual'
                    />
                </div>
                <div className={style.textField}>
                    <label htmlFor='new-password' className={style.labelField}>Nova senha</label>
                    <input
                    type='password'
                    id='new-password'
                    name='newPassword'
                    className={style.inputField}
                    placeholder='Nova senha'
                    />
                </div>
                <button className={style.btn}>Alterar</button>
            </form>
        </div>
    );
}