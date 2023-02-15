import SideBar from "../components/SideBar";
import LoginAndSignup from "./LoginAndSignup";
import style from '../styles/Album.module.css';
import { useEffect, useState } from "react";

export default function Album({isDarkMode, status, setStatus}) {
    const [user, setUser] = useState(undefined);

    useEffect(() => {
        if (status === 'authenticated' && !user) {
            ;
        }
    }, [status]);
    
    return (
        <div className={style.main}>
            {status !== 'authenticated' ? <LoginAndSignup isDarkMode={isDarkMode} status={status} setStatus={setStatus} setUser={setUser}/> : null}
            <SideBar data={user} />
        </div>
    )
}