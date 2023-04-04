import { useContext } from "react";
import { Navigate, Outlet, Route } from "react-router-dom";
import { Menu } from "../../components/Menu/Menu";
import { AuthContext } from "../../contexts/AuthContext";
import { ThemeContext } from "../../contexts/ThemeContext";

// Layout principal do App com Navbar Fixa
// As páginas com Navbar fixa: home, livros, empréstimos, etc
export function Root() {

  const resultado = useContext(ThemeContext);
  const temaEscuro = resultado.temaEscuro;

  const usuarioLogado = useContext(AuthContext);

  if (usuarioLogado === null) {
    // se está deslogado
    // redireciona para a página de login
    return <Navigate to="/login" />;
  }
  
  return (
    <>
      <header className={temaEscuro ? "bg-dark text-light" : "bg-light text-dark"}>
        <Menu />
      </header>
      <main className={temaEscuro ? "bg-dark text-light" : "bg-light text-dark"}>
        <Outlet />
      </main>
    </>
  );
}
