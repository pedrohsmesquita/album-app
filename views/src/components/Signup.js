import { useState } from 'react';
import { postLogin } from '../services/UserServices';
import SignupCSS from '../styles/signup.module.css';

export default function Signup({isDarkMode, setRegistration}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [passwordLen, setPasswordLen] = useState(0);
    const inputClass = isDarkMode ? `${SignupCSS.inputField} ${SignupCSS.darkMode}` : `${SignupCSS.inputField}`;
    const passwordLenBool = passwordLen > 0 && passwordLen < 6;

    async function handleSubmit(e) {
        e.preventDefault();
        const response = await postLogin({email: email, password: password});
        console.log(response);
    }

    return (
        <div className={SignupCSS.mainSignup}>
            <div className={isDarkMode ? `${SignupCSS.cardSignup} ${SignupCSS.darkMode}` : `${SignupCSS.cardSignup}`}>
                <h1>Registrar no Álbum</h1>
                <form onSubmit={e => handleSubmit(e)}>
                    <div className={SignupCSS.textfield}>
                        <label htmlFor='email' className={SignupCSS.labelField}>E-mail</label>
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
                    <div className={SignupCSS.textfield}>
                        <label htmlFor='name' className={SignupCSS.labelField}>Nome</label>
                        <input
                        type='text'
                        id='name'
                        name='name'
                        value={name}
                        placeholder='Nome'
                        className={inputClass}
                        onChange={e => setName(e.target.value)}
                        />
                    </div>
                    <div className={SignupCSS.textfield}>
                        <label htmlFor='password' className={SignupCSS.labelField}>Senha</label>
                        <input
                        type='password'
                        id='password'
                        name='password'
                        minLength='6'
                        maxLength='16'
                        value={password}
                        placeholder='Senha'
                        className={!passwordLenBool ? `${inputClass} ${SignupCSS.passwordBox}` : inputClass}
                        onChange={e => {
                            setPassword(e.target.value)
                            setPasswordLen(e.target.value.length);
                        }}
                        />
                        {passwordLenBool && <p className={SignupCSS.passwordLen}>A senha deve ter pelo menos 6 caracteres</p>}
                    </div>
                    <button type="submit">Registrar</button>
                </form>
                <p>Já tem uma conta? <span onClick={() => setRegistration(false)}>Entre aqui!</span></p>
            </div>
        </div>
    );
}