import { Link, useLocation } from "react-router-dom";
import "./Breadcrumb.css"
import { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";

export function Breadcrumb() {

    const resultado = useContext(ThemeContext);
    const temaEscuro = resultado.temaEscuro;

    const location = useLocation();
    const pathSegments = location.pathname.split('/').filter(segment => segment !== '');

    return (
        <div className={temaEscuro ? "bg-dark text-light" : "bg-light text-dark" }>
        <nav className="Breadcrumb">
            <ul>
                <li><Link to="/">Home</Link></li>
                {pathSegments.map((segment, index) => {
                    const link = `/${pathSegments.slice(0, index + 1).join('/')}`;
                    const isLastSegment = index === pathSegments.length - 1;
                    return (
                        <li key={segment}>
                            <Link to={link}>{segment}</Link>
                            {!isLastSegment && <span className={temaEscuro ? "bg-dark text-light" : "bg-light text-dark" }> {'>'} </span>}
                        </li>
                    );
                })}
            </ul>
        </nav>
        </div>
    );
}