import './Menu.css';
import { Container, Nav, Navbar, } from 'react-bootstrap';
import logoIcon from './../../assets/icons/livros.png';
import { Link, useNavigate, } from 'react-router-dom';
import { logout } from '../../firebase/auth';
import React, { useEffect, useState, useContext, } from 'react';
import { AuthContext } from "../../contexts/AuthContext";
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { ThemeContext } from '../../contexts/ThemeContext';



export function Menu() {


  const resultado = useContext(ThemeContext);
  const temaEscuro = resultado.temaEscuro;
  const alternar = resultado.alternar;  

  const navigate = useNavigate();
  const [isMouseOverIcon, setIsMouseOverIcon] = useState(false);
  const usuarioLogado = useContext(AuthContext);
  const [userDisplayName, setUserDisplayName] = useState();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  let iconeBtn = "https://cdn-icons-png.flaticon.com/512/3073/3073665.png";
  if (temaEscuro) {
    iconeBtn = "https://cdn-icons-png.flaticon.com/512/581/581601.png";
  }

 


  useEffect(() => {
    setUserDisplayName(usuarioLogado.displayName)
  }, [usuarioLogado.displayName]);

  function onLogout() {
    logout().then(() => {
      navigate('/login');
    });
  }


  return (
    <Navbar
      bg={temaEscuro ? "dark" : "success"}
      variant={temaEscuro ? "dark, 0.5" : "ligth"}
      expand="sm"
    >
      <Container fluid>
        <Navbar.Brand>
          {
            <Link to="/">
              <img src={logoIcon} width="32" alt="Logo" />
            </Link>
          }
        </Navbar.Brand>


        <Button
          variant="dark"
          className="d-lg-none menu-btn"
          onClick={handleShow}
        >
          <span className="icon">
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </span>
        </Button>


        <Offcanvas
          show={show}
          onHide={handleClose}
          responsive="lg"
          style={{ backgroundColor: '#00000035' }}
        >
          <Offcanvas.Header
            closeButton
            closeVariant="white"
            style={{ color: 'white' }}
          >
            <Offcanvas.Title style={{ marginRight: '200px' }}>
              Menu
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="ms-auto navText my-nav">
              <Nav.Link as={Link} to="/" className="navText">
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="/livros" className="navText">
                Livros
              </Nav.Link>

              <Nav.Link as={Link} to="/emprestimos" className="navText">
                Emprestimos
              </Nav.Link>

              <Nav.Link as={Link} to="/usuario" className="navText">
                {userDisplayName ? userDisplayName : usuarioLogado.email.split("@")[0]}
              </Nav.Link>
              
              <Nav.Link as={Link} to="/Ajuda" className="navText">
                Ajuda
              </Nav.Link>

              <Nav.Link as={Link} to="/Postagem" className="navText">
                Postagem
              </Nav.Link>
              
              <Nav.Link
                onClick={onLogout}
                className="navText"
                onMouseOver={() => setIsMouseOverIcon(true)} // Altera o estado para indicar que o mouse está sobre o ícone
                onMouseOut={() => setIsMouseOverIcon(false)} // Altera o estado para indicar que o mouse não está mais sobre o ícone
              >
                <i
                  className="bi bi-box-arrow-right"
                  style={{ color: isMouseOverIcon ? '#5ecfff' : 'white' }} // Verifica se o mouse está sobre o ícone e altera a cor de acordo
                ></i>
              </Nav.Link>


              <Nav.Link  as={Link} variant="outline-light" onClick={alternar} className="navText iconHover ms-2"  >
                <img src={iconeBtn} alt="tema claro ou escuro" width="16" className='navText' />

              </Nav.Link>

            </Nav>
          </Offcanvas.Body>
        </Offcanvas>
      </Container>
    </Navbar>
  );
}
