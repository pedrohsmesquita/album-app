import Login from '../components/Login.js';
import Signup from '../components/Signup.js';

export default function LoginAndSignup({isDarkMode, status, setStatus, setUser}) {
    if (status === 'signin')
        return (<Login isDarkMode={isDarkMode} setStatus={setStatus} setUser={setUser}/>);
    if (status === 'signup')
        return (<Signup isDarkMode={isDarkMode} setStatus={setStatus}/>);
}