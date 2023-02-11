import { Link } from "react-router-dom";

export default function NotFound() {
    return (
        <div>
            <h1>Oops! Está perdido?</h1>
            <Link to='/'>Clique aqui para voltar com segurança</Link>
        </div>
    );
}