import { useState } from 'react';
import { postLogin } from '../services/UserServices';
import '../styles/login.css';

export default function Login({isDarkMode}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const inputClass = isDarkMode ? 'dark-mode' : '';

    async function handleSubmit(e) {
        e.preventDefault();
        const response = await postLogin({email: email, password: password});
        console.log(response);
    }

    return (
        <div className='main-login'>
            <div className={'card-login' + (isDarkMode ? ' dark-mode' : '')}>
                <h1>Entrar no Álbum</h1>
                <form onSubmit={e => handleSubmit(e)}>
                    <div className='textfield'>
                        <label htmlFor='email'>E-mail</label>
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
                    <div className='textfield'>
                        <label htmlFor='password'>Senha</label>
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
                <p>Não tem uma conta? <a href='#'>Crie uma aqui!</a></p>
            </div>
        </div>
    );
}