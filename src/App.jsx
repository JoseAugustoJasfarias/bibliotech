import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Cadastro } from "./pages/Cadastro/Cadastro";
import { Home } from "./pages/Home/Home";
import { Login } from "./pages/Login/Login";
import { Root } from "./pages/Root/Root";
import { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/config";
import { AuthContext } from "./contexts/AuthContext";
import { AdicionarLivro } from "./pages/AdicionarLivro/AdicionarLivro";
import { Livros } from "./pages/Livros/Livros";
import { EditarLivro } from "./pages/EditarLivro/EditarLivro";
import { AdicionarEmprestimo } from "./pages/AdicionarEmprestimo/AdicionarEmprestimo";
import { Emprestimos } from "./pages/Emprestimos/Emprestimos";
import { EditarEmprestimo } from "./pages/EditarEmprestimo/EditarEmprestimo";
import { Ajuda } from "./pages/Ajuda/Ajuda"
import { ThemeContext } from "./contexts/ThemeContext";
import { Postagem } from "./pages/Postagem/Postagem"

export function App() {

  const [temaEscuro, setTemaEscuro] = useState(false);

  //alterna entre true e false toda vez que for chamada;
  function alternar() {
    if (temaEscuro === true) {
      setTemaEscuro(false)
    } else {
      setTemaEscuro(true);
    }
  }

  const [usuarioLogado, setUsuarioLogado] = useState(null);
  const [carregando, setCarregando] = useState(true); // novo estado de carregamento

  useEffect(() => {
    // Monitorar/detectar o usuário conectado
    // Fica sabendo quando loga/desloga
    onAuthStateChanged(auth, (user) => {
      // user é nulo = deslogado
      // user tem objeto = logado
      setUsuarioLogado(user);
      setCarregando(false); // atualizar estado de carregamento
    });

    // Esse efeito irá rodar apenas uma vez
    // Quando o App for renderizado/inicializado
  }, []);

  // Renderizar rotas apenas quando o aplicativo estiver pronto
  if (carregando) {
    return <div>Carregando...</div>;
  }

  return (
    <>
      <ThemeContext.Provider value={{ temaEscuro: temaEscuro, alternar: alternar }}>
        <AuthContext.Provider value={usuarioLogado}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Root />}>
                <Route path="/" element={<Home />} />
                <Route path="/Postagem" element={<Postagem />} />
                <Route path="/Ajuda" element={<Ajuda />} />
                <Route path="/livros" element={<Livros />} />
                <Route path="/livros/adicionar" element={<AdicionarLivro />} />
                <Route path="/livros/editar/:id" element={<EditarLivro />} />
                <Route path="/emprestimos" element={<Emprestimos />} />
                <Route path="/emprestimos/adicionar" element={<AdicionarEmprestimo />} />
                <Route path="/emprestimos/editar/:id" element={<EditarEmprestimo />} />
              </Route>
              <Route path="/login" element={<Login />} />
              <Route path="/cadastro" element={<Cadastro />} />
            </Routes>
          </BrowserRouter>
        </AuthContext.Provider>
        <Toaster />
      </ThemeContext.Provider>
    </>
  );
}