import { Link } from "react-router-dom";
import notFound from "../../assets/images/BIBLIOTECH-login.png";
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
            <img src={notFound} alt="login" className="notFound" />
            <p className="mt-2"> <b>error 404.</b> Pagina não encontrada</p>
            <p>Não encontramos a pagina: /{elementAfterSlash}</p><br />
            <ButtonGroup >
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