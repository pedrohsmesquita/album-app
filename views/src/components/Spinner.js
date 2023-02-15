import style from '../styles/spinner.module.css';

export default function Spinner({isDarkMode}) {
    return (
        <div className={isDarkMode ? `${style.loaderContainer} ${style.darkMode}` : style.loaderContainer}>
            <div className={style.spinner}></div>
        </div>
    );
}