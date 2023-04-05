import { useContext, useEffect, useState } from "react";
import { Button, Container, Table } from "react-bootstrap";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import { Loader } from "../../components/Loader/Loader";
import { deleteLivro, getLivros } from "../../firebase/livros";
import "./Livros.css";
import { ThemeContext } from "../../contexts/ThemeContext";
import { Breadcrumb } from "../../components/Breadcrumb/Breadcrumb";
import Modal from "react-bootstrap/Modal";

export function Livros() {
  const resultado = useContext(ThemeContext);
  const temaEscuro = resultado.temaEscuro;
  const [livroSelecionado, setLivroSelecionado] = useState(null);
  const [livros, setLivros] = useState(null);

  useEffect(() => {
    initializeTable();
  }, []);

  function initializeTable() {
    getLivros().then((resultados) => {
      setLivros(resultados);
    });
  }

  function onDeleteLivro(id, titulo) {
    const deletar = window.confirm(
      `Tem certeza que deseja excluir o livro ${titulo}?`
    );
    if (deletar) {
      deleteLivro(id).then(() => {
        toast.success(`${titulo} apagado com sucesso!`, {
          duration: 2000,
          position: "bottom-right",
        });
        initializeTable();
      });
    }
  }

  return (
    <div className={temaEscuro ? "bg-dark text-light" : "bg-light text-dark"} id="livros">
      <div className={temaEscuro ? 'bg-dark text-light' : 'bg-light text-dark'}>
        <Breadcrumb />
          <Container 
            id="containerLivros"
            className={temaEscuro ? "bg-dark text-light" : "bg-light text-dark"}
          >
            <div className="d-flex justify-content-between align-items-center">
              <h1>Livros</h1>
              <Button as={Link} to="/livros/adicionar" variant="success">
                Adicionar Livro
              </Button>
            </div>
            <hr />
            {livros === null ? (
              <Loader />
            ) : (
              <Table
                className={
                  temaEscuro ? "bg-dark text-light" : "bg-light text-dark"
                }
              >
                <thead>
                  <tr>
                    <th>Título</th>
                    <th>Autor</th>
                    <th>Categoria</th>
                    <th>ISBN</th>
                    <th>Imagem</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {livros.map((livro) => {
                    return (
                      <tr key={livro.id}>
                        <td>{livro.titulo}</td>
                        <td>{livro.autor}</td>
                        <td>{livro.categoria}</td>
                        <td>{livro.isbn}</td>
                        <td>
                          <img src={livro.urlCapa} alt={livro.titulo} />
                        </td>
                        <td>
                          <Button
                            as={Link}
                            to={`/livros/editar/${livro.id}`}
                            variant="warning"
                            size="sm"
                            className="me-2"
                          >
                            <i className="bi bi-pencil-fill"></i>
                          </Button>
                          <Button
                            size="sm"
                            variant="danger"
                            onClick={() => onDeleteLivro(livro.id, livro.titulo)}
                          >
                            <i className="bi bi-trash3-fill"></i>
                          </Button>
                          <Button
                            size="sm"
                            variant="warning"
                            className="mt-2"
                            onClick={() => setLivroSelecionado(livro)}
                          >
                            <i className="bi bi-info-circle-fill"></i>
                          </Button>
                          <Modal
                            show={livroSelecionado !== null}
                            onHide={() => setLivroSelecionado(null)}
                          >
                            <Modal.Header closeButton>
                              <Modal.Title>Informações do Livro</Modal.Title>
                            </Modal.Header>
                            {livroSelecionado && (
                              <Modal.Body>
                                <p>
                                  <strong>Título:</strong>{" "}
                                  {livroSelecionado.titulo}
                                </p>
                                <p>
                                  <strong>Autor:</strong> {livroSelecionado.autor}
                                </p>
                                <p>
                                  <strong>Categoria:</strong>{" "}
                                  {livroSelecionado.categoria}
                                </p>
                                <p>
                                  <strong>ISBN:</strong> {livroSelecionado.isbn}
                                </p>
                                <img
                                  src={livroSelecionado.urlCapa}
                                  alt={livroSelecionado.titulo}
                                />
                              </Modal.Body>
                            )}
                          </Modal>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            )}
          </Container>
        </div>
      </div>
  );
}
