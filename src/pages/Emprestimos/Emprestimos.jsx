import { useContext, useEffect, useState } from 'react';
import {
  Badge,
  Button,
  ButtonGroup,
  Container,
  Dropdown,
  DropdownButton,
  Table
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getEmprestimos } from '../../firebase/emprestimos';
import { Loader } from '../../components/Loader/Loader';
import { ThemeContext } from '../../contexts/ThemeContext';
import './Emprestimos.css';

export function Emprestimos() {
  const resultado = useContext(ThemeContext);
  const temaEscuro = resultado.temaEscuro;

  const [emprestimos, setEmprestimos] = useState(null);

  useEffect(() => {
    getEmprestimos().then(busca => {
      setEmprestimos(busca);
    });
  }, []);

  function atualizaStatusEmprestimo(emprestimo, novoStatus) {
    const updatedEmprestimos = emprestimos.map(e => {
      if (e.id === emprestimo.id) {
        return { ...e, status: novoStatus };
      } else {
        return e;
      }
    });
    setEmprestimos(updatedEmprestimos);
  }

  function handleStatusChange(emprestimo, novoStatus) {
    const updatedEmprestimos = emprestimos.map(e => {
      if (e.id === emprestimo.id) {
        return { ...e, status: novoStatus };
      } else {
        return e;
      }
    });
    setEmprestimos(updatedEmprestimos);
  }

  return (
    <div className={temaEscuro ? 'bg-dark text-light' : 'bg-light text-dark'}>
      <div className="emprestimos">
        <Container
          className={temaEscuro ? 'bg-dark text-light' : 'bg-light text-dark'}
        >
          <div className="d-flex justify-content-between align-items-center">
            <h1>Emprestimos</h1>
            <Button as={Link} to="/emprestimos/adicionar" variant="success">
              Adicionar emprestimo
            </Button>
          </div>
          <hr />
          {emprestimos === null ? (
            <Loader />
          ) : (
            <Table
              className={
                temaEscuro ? 'bg-dark text-light' : 'bg-light text-dark'
              }
            >
              <thead>
                <tr>
                  <th>Leitor</th>
                  <th>E-mail</th>
                  <th>Telefone</th>
                  <th>Livro</th>
                  <th>Status</th>
                  <th>Data de Empréstimo</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {emprestimos.map(emprestimo => {
                  const dataEmprestimo = emprestimo.dataEmprestimo
                    ?.toDate()
                    ?.toLocaleDateString('pt-br');
                  const dataEntrega =
                    emprestimo.dataEntrega &&
                    typeof emprestimo.dataEntrega === 'object' &&
                    emprestimo.dataEntrega instanceof Date
                      ? emprestimo.dataEntrega
                      : null;

                  // Verifica se o empréstimo está atrasado
                  const atrasado =
                    emprestimo.dataEntrega &&
                    new Date() > emprestimo.dataEntrega;

                  // Atualiza o status para "Atrasado" se o empréstimo estiver atrasado
                  if (atrasado && emprestimo.status !== 'Atrasado') {
                    atualizaStatusEmprestimo(emprestimo, 'Atrasado');
                    emprestimo.status = 'Atrasado';
                  }

                  return (
                    <tr key={emprestimo.id}>
                      <td>{emprestimo.leitor}</td>
                      <td>{emprestimo.email}</td>
                      <td>{emprestimo.telefone}</td>
                      <td>{emprestimo.livro.titulo}</td>
                      <td>
                        <Badge
                          bg={
                            emprestimo.status === 'Pendente'
                              ? 'warning'
                              : emprestimo.status === 'Atrasado'
                              ? 'danger'
                              : 'success'
                          }
                          className="botao"
                        >
                          {emprestimo.status}
                        </Badge>
                      </td>
                      <td>{dataEmprestimo}</td>
                      <td>
                        <Button
                          as={Link}
                          to={`/emprestimos/editar/${emprestimo.id}`}
                          variant="warning"
                          size="sm"
                          className="botao"
                        >
                          <i className="bi bi-pencil-fill icon-size"></i>
                        </Button>

                        {['end'].map(direction => (
                          <DropdownButton
                            className="mt-2"
                            as={ButtonGroup}
                            key={direction}
                            id={`dropdown-button-drop-${direction}`}
                            drop={direction}
                            title={`Alterar Status`}
                          >
                            <Dropdown.Item
                              onClick={() =>
                                handleStatusChange(emprestimo, 'Pendente')
                              }
                              style={{
                                color:
                                  emprestimo.status === 'Pendente'
                                    ? 'grey'
                                    : 'black'
                              }}
                            >
                              Pendente
                            </Dropdown.Item>
                            <Dropdown.Item
                              onClick={() =>
                                handleStatusChange(emprestimo, 'Concluído')
                              }
                              style={{
                                color:
                                  emprestimo.status === 'Concluído'
                                    ? 'grey'
                                    : 'black'
                              }}
                            >
                              Concluído
                            </Dropdown.Item>
                            <Dropdown.Item
                              onClick={() =>
                                handleStatusChange(emprestimo, 'Atrasado')
                              }
                              style={{
                                color:
                                  emprestimo.status === 'Atrasado'
                                    ? 'grey'
                                    : 'black'
                              }}
                            >
                              Atrasado
                            </Dropdown.Item>
                          </DropdownButton>
                        ))}
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
