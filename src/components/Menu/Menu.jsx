import './Menu.css';
import { Container, Nav, Navbar } from 'react-bootstrap';
import logoIcon from './../../assets/icons/livros.png';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../../firebase/auth';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';


export function Menu() {
  const navigate = useNavigate();
  const [isMouseOverIcon, setIsMouseOverIcon] = useState(false);

  function onLogout() {
    logout().then(() => {
      navigate('/login');
    });
  }
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <Navbar bg="success" variant="light" expand="lg">
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
              <Nav.Link as={Link} to="/Ajuda" className="navText">
                Ajuda
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
            </Nav>
          </Offcanvas.Body>
        </Offcanvas>
      </Container>
    </Navbar>
  );
}
