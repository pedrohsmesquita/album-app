import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login.js';
import ConfirmationPage from './pages/ConfirmationPage.js';
import Signup from './components/Signup.js';
import NotFound from './components/NotFound.js';

export default function App() {
    const [isDarkMode, setIsDarkmode] = useState(false);
    const [isRegistration, setIsRegistration] = useState(false);

    useEffect(() => {
        window.matchMedia('(prefers-color-scheme: dark')
              .addEventListener('change', e => onSelectTheme(e.matches))
        
        onSelectTheme(window.matchMedia('(prefers-color-scheme: dark').matches)

        return () => {
            window.matchMedia('(prefers-color-scheme: dark)')
                  .removeEventListener('change', () => {})
        }
    }, []);

    function onSelectTheme(isDarkTheme) {
        setIsDarkmode(isDarkTheme);
    }

    return (
        <Router>
            <Routes>
                <Route path='/' element={isRegistration ? (
                    <Signup isDarkMode={isDarkMode} setRegistration={setIsRegistration}/>
                ) : (
                    <Login isDarkMode={isDarkMode} setRegistration={setIsRegistration}/>
                )}/>
                <Route path='/auth/signup/confirm/:confirmationCode' element={<ConfirmationPage isDarkMode={isDarkMode}/>}/>
                <Route path='*' element={<NotFound />}/>
            </Routes>
        </Router>
    );
}