import { useState, useEffect } from 'react';
import Login from './components/Login.js';
import Signup from './components/Signup.js';

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
        <div>
            {isRegistration ? (
                <Signup isDarkMode={isDarkMode} setRegistration={setIsRegistration}/>
            ) : (
                <Login isDarkMode={isDarkMode} setRegistration={setIsRegistration}/>
            )}
        </div>
    );
}