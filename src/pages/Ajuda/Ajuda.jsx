import React, { useContext } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Accordion from 'react-bootstrap/Accordion';
import "./Ajuda.css"
import { ThemeContext } from '../../contexts/ThemeContext';
import { Breadcrumb } from '../../components/Breadcrumb/Breadcrumb';

export function Ajuda() {

    const resultado = useContext(ThemeContext);
    const temaEscuro = resultado.temaEscuro;

    return (
        <div className={temaEscuro ? "bg-dark text-light" : "bg-light text-dark" }>
            <Breadcrumb />
            <div>
                <h1>Duvidas mais frequentes</h1>
                <Accordion className='Accordion' defaultActiveKey={['0']} alwaysOpen>
                    <Accordion.Item eventKey="0">
                        <Accordion.Header >Como pegar um livro emprestado</Accordion.Header>
                        <Accordion.Body >
                            Lorem ipsum dolor
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="1">
                        <Accordion.Header>Como devolver um livro</Accordion.Header>
                        <Accordion.Body>
                            Lorem ipsum dolor
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            </div>
            <div id='carousel'>
                <Carousel >
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="https://www.folhavitoria.com.br/geral/blogs/vem-ler-comigo/wp-content/uploads/2021/01/12313151875_04c83230a2_k-800x500.jpg"
                            alt="First slide"
                        />
                        <Carousel.Caption>
                            <h3>O benefício da leitura no combate da ansiedade</h3>
                            <p>
                                <a href="https://blog.estantevirtual.com.br/2021/04/30/como-a-leitura-ajuda-a-combater-a-ansiedade/">
                                    Saiba mais, clique neste link!
                                </a>
                            </p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="https://cdn.pensador.com/img/frase/ge/ni/genivaldo_pires_escolha_o_livro_certo_e_deixe_de_perder_trf_nl6ygvqm.jpg"
                            alt="Second slide"
                        />

                        <Carousel.Caption>

                            <h3>Como escolher um livro </h3>
                            <p>
                                <a href="https://www.shoppingbalneario.com.br/como-escolher-o-livro-certo-para-ler/">
                                    Saiba mais, clique neste link!
                                </a>
                            </p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="https://blog.bighouseweb.com.br/wp-content/uploads/2022/01/Linguagens-de-programacao-1140x660.jpg"
                            alt="Third slide"
                        />

                        <Carousel.Caption>
                            <h3>principais livros de programação</h3>
                            <p>
                                <a href="https://coodesh.com/blog/candidates/dicas/livros-para-desenvolvedores/">
                                    Saiba mais, clique neste link!
                                </a>
                            </p>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
            </div>
        </div>
    );
}