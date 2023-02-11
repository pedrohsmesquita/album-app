import { useState } from 'react';
import { postLogin } from '../services/UserServices';
import LoginCSS from  '../styles/login.module.css';

export default function Login({isDarkMode, setRegistration}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const inputClass = isDarkMode ? `${LoginCSS.inputField} ${LoginCSS.darkMode}` : `${LoginCSS.inputField}`;

    return (
        <div className={LoginCSS.mainLogin}>
            <div className={isDarkMode ? `${LoginCSS.cardLogin} ${LoginCSS.darkMode}` : `${LoginCSS.cardLogin}`}>
                <h1>Entrar no Álbum</h1>
                <form>
                    <div className={LoginCSS.textfield}>
                        <label htmlFor='email' className={LoginCSS.labelField}>E-mail</label>
                        <input
                        type='email'
                        id='email'
                        name='email'
                        value={email}
                        placeholder='E-mail'
                        className={inputClass}
                        onChange={e => setEmail(e.target.value)}
                        />
                    </div>
                    <div className={LoginCSS.textfield}>
                        <label htmlFor='password' className={LoginCSS.labelField}>Senha</label>
                        <input 
                        type='password'
                        id='password'
                        name='password'
                        minLength='6'
                        maxLength='16'
                        value={password}
                        placeholder='Senha'
                        className={inputClass}
                        onChange={e => setPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit">Entrar</button>
                </form>
                <p>Não tem uma conta? <span onClick={() => setRegistration(true)} >Crie uma aqui!</span></p>
            </div>
        </div>
    );
}