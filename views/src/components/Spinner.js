import style from '../styles/spinner.module.css';

export default function Spinner() {
    return (
        <div className={style.loaderContainer}>
            <div className={style.spinner}></div>
        </div>
    );
}