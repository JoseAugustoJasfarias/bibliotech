import "./Menu.css";
import { Container, Nav, Navbar } from "react-bootstrap";
import logoIcon from "./../../assets/icons/livros.png";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../firebase/auth";
import { useState, useEffect, useContext } from "react";
import { auth } from "../../firebase/config";
import { AuthContext } from "../../contexts/AuthContext";


export function Menu() {
  const navigate = useNavigate();
  const [userDisplayName, setUserDisplayName] = useState("");
  const usuarioLogado = useContext(AuthContext);


  useEffect(() => {
    // const unsubscribe = auth.onAuthStateChanged((user) => {
    //   if (user) {
    //     setUserDisplayName(userDisplayName);
    //   } else {
    //     setUserDisplayName("");
    //   }
    // });

    // return unsubscribe;
    setUserDisplayName(usuarioLogado.displayName)

  }, []);

  function onLogout() {
    logout().then(() => {
      navigate("/login");
    });
  }

  return (
    <Navbar bg="success" variant="light" expand="lg">
      <Container fluid>
        <Navbar.Brand>
          <Link to="/">
            <img src={logoIcon} width="32" alt="Logo" />
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/livros">
              Livros
            </Nav.Link>
            <Nav.Link as={Link} to="/emprestimos">
              Emprestimos
            </Nav.Link>
            <Nav.Link as={Link} to="/usuario">
              {userDisplayName}
              </Nav.Link>
              <Nav.Link as={Link} to="/usuario">
                {userDisplayName ? userDisplayName : usuarioLogado.email.split("@")[0]}
                </Nav.Link>
            <Nav.Link onClick={onLogout}>
              <i className="bi bi-box-arrow-right"></i>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
