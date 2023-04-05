import "./Footer.css"

export function Footer() {
    return (
        <div className="footer">
            <footer className="d-flex flex-wrap justify-content-between align-items-center p-4 border-top">
                <div className="col-md-4 d-flex align-items-center">
                    <span class="mb-3 mb-md-0 ">© 2023 Bibliotech</span>
                </div>
                <div className="col-md-4 d-flex align-items-center">
                    <span className="mb-3 mb-md-0 ">Sobre</span>
                    <span className="ms-5 mb-md-0 ">Contato</span>
                    <span className="ms-5 mb-md-0 ">Novidades</span>
                    <span className="ms-5 mb-md-0 ">Ajuda</span>
                </div>

                <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
                    <li className="ms-3"><i className="bi bi-instagram"></i></li>
                    <li className="ms-3"><i className="bi bi-whatsapp"></i></li>
                    <li className="ms-3"><i className="bi bi-facebook"></i></li>
                    <li className="ms-3"><i className="bi bi-twitter"></i></li>
                </ul>
            </footer>
        </div>
    )
}