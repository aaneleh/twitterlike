import { Link }  from "react-router-dom";

export default function Main() {
    return (
        <div>
            <div>
                <Link to="/login">Login</Link>
            </div>
            <div>
                <Link to="/register">Cadastro</Link>
            </div>
        </div>
    )
}