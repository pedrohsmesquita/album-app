import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { tokenAuthentication } from './services/UserServices.js';
import ConfirmationPage from './pages/ConfirmationPage.js';
import NotFound from './components/NotFound.js';
import Spinner from './components/Spinner.js';
import Album from './pages/Album.js';

export default function App() {
    const [isDarkMode, setIsDarkmode] = useState(false);
    const [status, setStatus] = useState('loading');

    useEffect(() => {
        window.matchMedia('(prefers-color-scheme: dark')
              .addEventListener('change', e => onSelectTheme(e.matches))
        
        onSelectTheme(window.matchMedia('(prefers-color-scheme: dark').matches)

        return () => {
            window.matchMedia('(prefers-color-scheme: dark)')
                  .removeEventListener('change', () => {})
        }
    }, []);

    useEffect(() => {
        const api = async () => {
            const data = await tokenAuthentication();
            if (data.status === 401)
                setStatus('signin');
            else
                setStatus('authenticated');
        }

        api();
    }, []);

    function onSelectTheme(isDarkTheme) {
        setIsDarkmode(isDarkTheme);
    }

    if (status === 'loading')
        return (<Spinner isDarkMode={isDarkMode}/>);

    return (
        <Router>
            <Routes>
                <Route path='/' element={<Album isDarkMode={isDarkMode} status={status} setStatus={setStatus}/>}/>
                <Route path='/auth/signup/confirm/:confirmationCode' element={<ConfirmationPage isDarkMode={isDarkMode}/>}/>
                <Route path='*' element={<NotFound />}/>
            </Routes>
        </Router>
    );
}