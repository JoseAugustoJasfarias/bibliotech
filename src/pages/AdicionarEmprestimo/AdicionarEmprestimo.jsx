import { useContext, useEffect, useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { adicionarEmprestimo } from '../../firebase/emprestimos';
import { getLivro, getLivros } from '../../firebase/livros';
import { isAfter } from 'date-fns';
import { ThemeContext } from '../../contexts/ThemeContext';
import { Breadcrumb } from '../../components/Breadcrumb/Breadcrumb';

export function AdicionarEmprestimo() {

  const resultado = useContext(ThemeContext);
  const temaEscuro = resultado.temaEscuro;

  const [livros, setLivros] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const navigate = useNavigate();

  function onSubmit(data) {
    getLivro(data.idLivro).then(livro => {
      delete data.idLivro;
      let novoEmprestimo = {
        ...data,
        livro,
        dataEmprestimo: new Date(),
        dataEntrega: new Date(data.dataEntrega).toISOString(),
        status: 'Pendente'
      };

      if (isAfter(new Date(data.dataEntrega), new Date())) {
        novoEmprestimo.status = 'Pendente';
      }
      adicionarEmprestimo(novoEmprestimo).then(() => {
        toast.success('Empréstimo adicionado com sucesso!', {
          duration: 2000,
          position: 'bottom-right'
        });
        navigate('/emprestimos');
      });
    });
  }

  useEffect(() => {
    getLivros().then(busca => {
      setLivros(busca);
    });
  }, []);

  return (
    <div className={temaEscuro ? "bg-dark text-light" : "bg-light text-dark" }>
    <div className="adicionar-emprestimo">
      <Breadcrumb />
      <Container className={temaEscuro ? "bg-dark text-light" : "bg-light text-dark" }>
        <h1>Adicionar empréstimo</h1>
        <hr />
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-3">
            <Form.Label>Leitor</Form.Label>
            <Form.Control
              type="text"
              className={errors.leitor && 'is-invalid'}
              {...register('leitor', {
                required: 'Leitor é obrigatório!',
                maxLength: { value: 255, message: 'Limite de 255 caracteres!' }
              })}
            />
            <Form.Text className="invalid-feedback">
              {errors.leitor?.message}
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>E-mail</Form.Label>
            <Form.Control
              type="email"
              className={errors.email && 'is-invalid'}
              {...register('email', {
                required: 'E-mail é obrigatório!',
                maxLength: { value: 255, message: 'Limite de 255 caracteres!' }
              })}
            />
            <Form.Text className="invalid-feedback">
              {errors.email?.message}
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Telefone</Form.Label>
            <Form.Control
              type="tel"
              className={errors.telefone && 'is-invalid'}
              {...register('telefone', {
                required: 'Telefone é obrigatório!',
                maxLength: { value: 20, message: 'Limite de 20 caracteres!' }
              })}
            />
            <Form.Text className="invalid-feedback">
              {errors.telefone?.message}
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Livro</Form.Label>
            <Form.Control
              as="select"
              className={errors.idLivro && 'is-invalid'}
              {...register('idLivro', {
                required: 'Livro é obrigatório!'
              })}
            >
              <option value="">Selecione um livro...</option>
              {livros.map(livro => (
                <option key={livro.id} value={livro.id}>
                  {livro.titulo} - {livro.autor}
                </option>
              ))}
            </Form.Control>
            <Form.Text className="invalid-feedback">
              {errors.idLivro?.message}
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Data de entrega</Form.Label>
            <Form.Control
              type="date"
              className={errors.dataEntrega && 'is-invalid'}
              {...register('dataEntrega', {
                required: 'Data de entrega é obrigatória!',
                validate: {
                  dataValida: data => {
                    return (
                      isAfter(new Date(data), new Date()) ||
                      'Data deve ser posterior à data atual!'
                    );
                  }
                }
              })}
              min={new Date().toISOString().split('T')[0]}
              max={
                new Date(new Date().setMonth(new Date().getMonth() + 2))
                  .toISOString()
                  .split('T')[0]
              }
            />
            <Form.Text className="invalid-feedback">
              {errors.dataEntrega?.message}
            </Form.Text>
          </Form.Group>
          <Button type="submit" variant="success">
            Adicionar empréstimo
          </Button>
        </Form>
      </Container>
    </div>
    </div>
  );
}
