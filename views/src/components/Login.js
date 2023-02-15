import { useState } from 'react';
import { postLogin } from '../services/UserServices';
import LoginCSS from  '../styles/login.module.css';

export default function Login({isDarkMode, setStatus, setUser}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [submitStatus, setSubmitStatus] = useState('send');
    const [errorMessage, setErrorMessage] = useState('');
    const inputClass = isDarkMode ? `${LoginCSS.inputField} ${LoginCSS.darkMode}` : `${LoginCSS.inputField}`;

    async function handleSubmit(e) {
        e.preventDefault();
        const response = await postLogin({email: email, password: password});
        if (response.res.code === 100)
            setErrorMessage(response.res.message);
        else if (response.status === 401 || response.status === 500)
            setErrorMessage(response.res.message);
        else {
            setStatus('authenticated');
            setUser({name: response.res.user.name, profilePicture: response.res.user.name});
        }
    }

    return (
        <div className={LoginCSS.mainLogin}>
            <div className={isDarkMode ? `${LoginCSS.cardLogin} ${LoginCSS.darkMode}` : `${LoginCSS.cardLogin}`}>
                <h1>Entrar no Álbum</h1>
                {errorMessage.length !== 0 && <p className={LoginCSS.error}>{errorMessage}</p>}
                <form onSubmit={e => handleSubmit(e)} className={LoginCSS.form}>
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
                    <button disabled={submitStatus === 'sending' ? true : false} type="submit">Entrar</button>
                </form>
                <p>Não tem uma conta? <span onClick={() => setStatus('signup')} >Crie uma aqui!</span></p>
            </div>
        </div>
    );
}