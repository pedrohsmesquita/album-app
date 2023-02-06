import { useState, useEffect } from 'react';
import Login from './components/Login.js';

export default function App() {
    const [isDarkMode, setIsDarkmode] = useState(false);

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
            <Login isDarkMode={isDarkMode}/>
        </div>
    );
}