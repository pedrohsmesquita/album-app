import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { verifyUser } from "../services/UserServices";
import Spinner from "../components/Spinner";
import style from '../styles/confirmationPage.module.css';

export default function ConfirmationPage({isDarkMode}) {
    const [response, setResponse] = useState({status: 0});
    const { confirmationCode } = useParams();
    
    useEffect(() => {
        const api = async () => {
            const data = await verifyUser(confirmationCode);
            setResponse({status: data.status, res: data.res});
        }

        api();
    }, []);
    
    console.log(confirmationCode, response.status);

    return (
        <div className={isDarkMode ? `${style.main} ${style.darkMode}` : style.main}>
            {response.status === 0 ? <Spinner /> : 
            <div className={style.container}>
                {response.status === 200 ?
                <>
                    <h1 className={style.title}><strong>{response.res.message}!</strong></h1>
                    <p>Você já consegue acessar sua conta.</p>
                </>
                 : <h1>{response.res.message}.</h1>
                 }
            </div>}
        </div>
    );
}