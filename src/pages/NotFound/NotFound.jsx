import { Link } from "react-router-dom";
import loginImg from "../../assets/images/login.png";
import "./NotFound.css"
import { Button, Modal } from "react-bootstrap";
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { useState } from "react";

export function NotFound() {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const path = window.location.pathname;
    const pathElements = path.split("/");
    const elementAfterSlash = pathElements[pathElements.length - 1];

    return (
        <div className="pagenotFound">
            <img src={loginImg} alt="login" className="notFound" />
            <p> <b>error 404.</b> Pagina não encontrada</p>
            <span>Não encontramos a pagina: /{elementAfterSlash}</span><br />
            <ButtonGroup className="mt-3">
                <Button variant="outline-secondary"><Link to="/" className="linkNotFound1">Voltar</Link></Button>
                <Button variant="outline-success"><Link to="/login" className="linkNotFound2">Login</Link></Button>
                <Button variant="outline-danger" onClick={handleShow}>Reportar</Button>
            </ButtonGroup>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Notificação Enviada</Modal.Title>
                </Modal.Header>
                <Modal.Body>Olá, os desenvolvedores foram notificados sobre o erro!</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Fechar
                    </Button>
                </Modal.Footer>
            </Modal>

        </div>
    );
}