import { Button, Container, Form, InputGroup } from 'react-bootstrap';
import { Link, Navigate } from 'react-router-dom';
import logoIcon from '../../assets/images/BIBLIOTECH-login.png';
import googleIcon from '../../assets/icons/google-white.svg';
import { useForm } from 'react-hook-form';
import {
  cadastrarEmailSenha,
  loginFacebook,
  loginGoogle,
  loginGithub
} from '../../firebase/auth';
import facebookIcon from '../../assets/icons/facebook.svg';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import { useContext, useState } from 'react';
import { Footer } from '../../components/Footer/Footer';
import gitHubIcon from '../../assets/icons/github.svg';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

export function Cadastro() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const navigate = useNavigate();
  function togglePasswordVisibility() {
    setshowPassword(!showPassword);
  }

  const [showPassword, setshowPassword] = useState(false);

  function onSubmit(data) {
    const { email, senha } = data;

    return new Promise(async (resolve, reject) => {
      try {
        const user = await cadastrarEmailSenha(email, senha);
        toast.success(`Entrando como ${user ? user.email : ''}`, {
          position: 'bottom-right',
          duration: 4000
        });
        navigate('/');
        resolve(user);
      } catch (erro) {
        let errorMessage;
        switch (erro.code) {
          case 'auth/invalid-email':
            errorMessage = 'O endereço de e-mail informado é inválido';
            break;
          case 'auth/wrong-password':
            errorMessage = 'A senha informada está incorreta';
            break;
          case 'auth/user-not-found':
            errorMessage =
              'Não há registro de usuário correspondente a este e-mail';
            break;
          case 'auth/user-disabled':
            errorMessage = 'Este usuário foi desativado';
            break;
          case 'auth/email-already-in-use':
            errorMessage =
              'O endereço de e-mail informado já está em uso por outra conta';
            break;
          case 'auth/weak-password':
            errorMessage = 'A senha deve ter pelo menos 6 caracteres';
            break;
          default:
            errorMessage =
              'Ocorreu um erro ao tentar fazer login. Tente novamente mais tarde.';
            break;
        }
        toast.error(errorMessage, {
          position: 'bottom-right',
          duration: 4000
        });
        reject(erro);
      }
    });
  }

  function onLoginFacebook() {
    loginFacebook()
      .then(user => {
        toast.success(`Bem-vindo(a) ${user.email}`, {
          position: 'bottom-right',
          duration: 4000
        });
        navigate('/');
      })
      .catch(erro => {
        let errorMessage;
        switch (erro.code) {
          case 'auth/account-exists-with-different-credential':
            errorMessage =
              'Esta conta já está associada a um e-mail diferente. Faça login com esse e-mail ou tente redefinir a senha.';
            break;
          case 'auth/auth-domain-config-required':
            errorMessage =
              'O domínio de autenticação não foi configurado para o projeto atual.';
            break;
          case 'auth/credential-already-in-use':
            errorMessage =
              'As credenciais já estão em uso por outra conta. Tente fazer login com outro método de autenticação.';
            break;
          case 'auth/email-already-in-use':
            errorMessage =
              'O endereço de e-mail informado já está em uso por outra conta.';
            break;
          case 'auth/invalid-credential':
            errorMessage =
              'As credenciais fornecidas para a autenticação são inválidas ou expiraram. Tente novamente.';
            break;
          case 'auth/operation-not-allowed':
            errorMessage =
              'A operação de login com o método fornecido foi desabilitada para o projeto atual.';
            break;
          case 'auth/operation-not-supported-in-this-environment':
            errorMessage =
              'Esta operação de autenticação não é suportada no ambiente atual.';
            break;
          case 'auth/popup-blocked':
            errorMessage =
              'O pop-up de autenticação foi bloqueado pelo navegador. Por favor, permita pop-ups para este site e tente novamente.';
            break;
          case 'auth/popup-closed-by-user':
            errorMessage =
              'O pop-up de autenticação foi fechado pelo usuário antes de completar a operação de login.';
            break;
          case 'auth/unauthorized-domain':
            errorMessage =
              'O domínio atual não está autorizado para realizar operações de autenticação.';
            break;
          case 'auth/user-cancelled':
            errorMessage = 'A operação de login foi cancelada pelo usuário.';
            break;
          case 'auth/user-not-found':
            errorMessage =
              'Não há registro de usuário correspondente ao e-mail informado.';
            break;
          case 'auth/wrong-password':
            errorMessage = 'A senha informada está incorreta.';
            break;
          default:
            errorMessage =
              'Ocorreu um erro ao tentar fazer login. Tente novamente mais tarde.';
            break;
        }

        toast.error(errorMessage, {
          position: 'bottom-right',
          duration: 4000
        });
      });
  }

  function onLoginGithub() {
    loginGithub()
      .then(user => {
        toast.success(`Bem-vindo(a) ${user.email}`, {
          position: 'bottom-right',
          duration: 4000
        });
        navigate('/');
      })
      .catch(erro => {
        let errorMessage;
        switch (erro.code) {
          case 'auth/invalid-email':
            errorMessage = 'O endereço de e-mail informado é inválido';
            break;
          case 'auth/wrong-password':
            errorMessage = 'A senha informada está incorreta';
            break;
          case 'auth/user-not-found':
            errorMessage =
              'Não há registro de usuário correspondente a este e-mail';
            break;
          case 'auth/user-disabled':
            errorMessage = 'Este usuário foi desativado';
            break;
          case 'auth/email-already-in-use':
            errorMessage =
              'O endereço de e-mail informado já está em uso por outra conta';
            break;
          case 'auth/weak-password':
            errorMessage = 'A senha deve ter pelo menos 6 caracteres';
            break;
          default:
            errorMessage =
              'Ocorreu um erro ao tentar fazer login. Tente novamente mais tarde.';
            break;
        }
        toast.error(errorMessage, {
          position: 'bottom-right',
          duration: 4000
        });
      });
  }

  function onLoginGoogle() {
    loginGoogle()
      .then(user => {
        toast.success(`Bem-vindo(a) ${user.email}`, {
          position: 'bottom-right',
          duration: 4000
        });
        navigate('/');
      })
      .catch(erro => {
        let errorMessage;
        switch (erro.code) {
          case 'auth/invalid-email':
            errorMessage = 'O endereço de e-mail informado é inválido';
            break;
          case 'auth/wrong-password':
            errorMessage = 'A senha informada está incorreta';
            break;
          case 'auth/user-not-found':
            errorMessage =
              'Não há registro de usuário correspondente a este e-mail';
            break;
          case 'auth/user-disabled':
            errorMessage = 'Este usuário foi desativado';
            break;
          case 'auth/email-already-in-use':
            errorMessage =
              'O endereço de e-mail informado já está em uso por outra conta';
            break;
          case 'auth/weak-password':
            errorMessage = 'A senha deve ter pelo menos 6 caracteres';
            break;
          default:
            errorMessage =
              'Ocorreu um erro ao tentar fazer login. Tente novamente mais tarde.';
            break;
        }

        toast.error(`Um erro aconteceu. ${errorMessage}`, {
          position: 'bottom-right',
          duration: 4000
        });
      });
  }

  const usuarioLogado = useContext(AuthContext);

  // Se tiver dados no objeto, está logado
  if (usuarioLogado !== null) {
    return <Navigate to="/" />;
  }

  return (
    <div>
      <Container fluid className="my-5">
        <p className="text-center">
          <img src={logoIcon} width="256" alt="Logo do app" />
        </p>
        <h4>Faça parte da nossa plataforma</h4>
        <p className="text-muted">
          Já tem conta? <Link to="/login">Entre</Link>
        </p>
        <hr />

        <Button
          className="mb-3 ms-2 btnLogin"
          variant="danger"
          onClick={onLoginGoogle}
        >
          <img src={googleIcon} width="32" alt="Google icon" /> Entrar com o
          Google
        </Button>

        <Button className="mb-3 ms-2 btnLogin" onClick={onLoginFacebook}>
          <img src={facebookIcon} width="32" alt="Facebook icon" /> Entrar com o
          Facebook
        </Button>

        <Button
          className="mb-3 ms-2 githubIcon btnLogin"
          id="gitIcon"
          onClick={onLoginGithub}
        >
          <img src={gitHubIcon} width="32" alt="GitHub icon" /> Entrar com o Git
          Hub
        </Button>
        <Link to="/quizz">
          <Button className="mb-3 ms-2" variant="danger">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              fill="currentColor"
              class="bi bi-patch-question me-2"
              viewBox="0 0 16 16"
            >
              <path d="M8.05 9.6c.336 0 .504-.24.554-.627.04-.534.198-.815.847-1.26.673-.475 1.049-1.09 1.049-1.986 0-1.325-.92-2.227-2.262-2.227-1.02 0-1.792.492-2.1 1.29A1.71 1.71 0 0 0 6 5.48c0 .393.203.64.545.64.272 0 .455-.147.564-.51.158-.592.525-.915 1.074-.915.61 0 1.03.446 1.03 1.084 0 .563-.208.885-.822 1.325-.619.433-.926.914-.926 1.64v.111c0 .428.208.745.585.745z" />
              <path d="m10.273 2.513-.921-.944.715-.698.622.637.89-.011a2.89 2.89 0 0 1 2.924 2.924l-.01.89.636.622a2.89 2.89 0 0 1 0 4.134l-.637.622.011.89a2.89 2.89 0 0 1-2.924 2.924l-.89-.01-.622.636a2.89 2.89 0 0 1-4.134 0l-.622-.637-.89.011a2.89 2.89 0 0 1-2.924-2.924l.01-.89-.636-.622a2.89 2.89 0 0 1 0-4.134l.637-.622-.011-.89a2.89 2.89 0 0 1 2.924-2.924l.89.01.622-.636a2.89 2.89 0 0 1 4.134 0l-.715.698a1.89 1.89 0 0 0-2.704 0l-.92.944-1.32-.016a1.89 1.89 0 0 0-1.911 1.912l.016 1.318-.944.921a1.89 1.89 0 0 0 0 2.704l.944.92-.016 1.32a1.89 1.89 0 0 0 1.912 1.911l1.318-.016.921.944a1.89 1.89 0 0 0 2.704 0l.92-.944 1.32.016a1.89 1.89 0 0 0 1.911-1.912l-.016-1.318.944-.921a1.89 1.89 0 0 0 0-2.704l-.944-.92.016-1.32a1.89 1.89 0 0 0-1.912-1.911l-1.318.016z" />
              <path d="M7.001 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0z" />
            </svg>
            Quizz
          </Button>
        </Link>

        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              className={errors.email && 'is-invalid'}
              placeholder="Seu email"
              {...register('email', { required: 'O email é obrigatório' })}
            />
            <Form.Text className="invalid-feedback">
              {errors.email?.message}
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Senha</Form.Label>
            <InputGroup>
              <Form.Control
                type={showPassword ? 'text' : 'password'}
                placeholder="Sua senha"
                className={errors.senha ? 'is-invalid' : ''}
                {...register('senha', { required: 'A Senha é obrigatória' })}
              />
              <Button
                variant="light"
                className="password-toggle"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </Button>
            </InputGroup>
            <Form.Text className="invalid-feedback">
              {errors.senha?.message}
            </Form.Text>
          </Form.Group>

          <Button type="submit" variant="success">
            Cadastrar
          </Button>
        </Form>
      </Container>
      <Footer />
    </div>
  );
}
