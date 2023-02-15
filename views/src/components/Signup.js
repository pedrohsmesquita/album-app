import { useEffect, useState } from 'react';
import { postSignup } from '../services/UserServices.js';
import PosSignup from './PosSignup.js';
import SignupCSS from '../styles/signup.module.css';

export default function Signup({isDarkMode, setStatus}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [passwordLen, setPasswordLen] = useState(0);
    const [submitStatus, setSubmitStatus] = useState('send');
    const inputClass = isDarkMode ? `${SignupCSS.inputField} ${SignupCSS.darkMode}` : `${SignupCSS.inputField}`;
    const passwordLenBool = passwordLen > 0 && passwordLen < 6;

    async function handleSubmit(e) {
        e.preventDefault();
        setSubmitStatus('sending');
        const response = await postSignup({email: email, name: name, password: password});
        if (response.status === 409) {
            alert(`${response.res.message}`);
            setSubmitStatus('send');
        } else if (response.status == 201)
            setSubmitStatus('sent');
        else
            setSubmitStatus('send');
    }
    useEffect(() => {
        if (submitStatus === 'sent') {
            const timer = setTimeout(() => setStatus('signin'), 10000);
            return () => clearTimeout(timer);
        }
    })
    
    if (submitStatus === 'sent') {
        return (<PosSignup isDarkMode={isDarkMode}/>);
    }

    return (
        <div className={SignupCSS.mainSignup}>
            <div className={isDarkMode ? `${SignupCSS.cardSignup} ${SignupCSS.darkMode}` : `${SignupCSS.cardSignup}`}>
                <h1>Registrar no Álbum</h1>
                <form onSubmit={e => handleSubmit(e)} className={SignupCSS.form}>
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
                    <button
                    disabled={submitStatus === 'sending' ? true : false} type="submit">Registrar</button>
                </form>
                <p>Já tem uma conta? <span onClick={() => setStatus('signin')}>Entre aqui!</span></p>
            </div>
        </div>
    );
}