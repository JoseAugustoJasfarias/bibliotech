import React, { useState } from "react";
import { Button, Card } from "react-bootstrap";
import "./Quizz.css"
import { Link } from "react-router-dom";
import quizzImg from '../../assets/video/BIBLIOTECH.gif';

export const Quizz = () => {
    const [score, setScore] = useState(0);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [showScore, setShowScore] = useState(false);

    const questions = [
        {
            questionText: "Qual é o nome do livro que foi lançado em 2015, escrito por Paula Hawkins, e que se tornou um sucesso instantâneo?",
            answerOptions: [
                { answerText: "O homem de giz", isCorrect: false },
                { answerText: "A garota no trem", isCorrect: true },
                { answerText: "A garota do gelo", isCorrect: false },
                { answerText: "Em águas sombrias", isCorrect: false },
            ],
        },
        {
            questionText: "Qual é o livro de J.K. Rowling que tem um garoto com uma cicatriz na testa como personagem principal?",
            answerOptions: [
                { answerText: "O Senhor dos Anéis", isCorrect: false },
                { answerText: "As Crônicas de Nárnia", isCorrect: false },
                { answerText: "Harry Potter e a Pedra Filosofal", isCorrect: true },
                { answerText: "O Código Da Vinci", isCorrect: false },
            ],
        },
        {
            questionText: "Em que cidade acontece a história de 'O Morro dos Ventos Uivantes', de Emily Bronte?",
            answerOptions: [
                { answerText: "Londres", isCorrect: false },
                { answerText: "Nova York", isCorrect: false },
                { answerText: "Liverpool", isCorrect: false },
                { answerText: "Yorkshire", isCorrect: true },
            ],
        },
        {
            questionText: "Quem é o autor de 'O Grande Gatsby'?",
            answerOptions: [
                { answerText: "F. Scott Fitzgerald", isCorrect: true },
                { answerText: "Ernest Hemingway", isCorrect: false },
                { answerText: "James Joyce", isCorrect: false },
                { answerText: "Virginia Woolf", isCorrect: false },
            ],
        },
        {
            questionText: "Qual é o livro escrito por Delia Owens que foi lançado em 2018 e tornou-se um best-seller mundial?",
            answerOptions: [
                { answerText: "Pequenos incêndios por toda parte", isCorrect: false },
                { answerText: "O poder do hábito", isCorrect: false },
                { answerText: "A garota do lago", isCorrect: false },
                { answerText: "A vida secreta dos bichos", isCorrect: true },
            ],
        },
    ];

    const handleAnswerButtonClick = (isCorrect) => {
        if (isCorrect) {
            setScore(score + 1);
        }

        const nextQuestion = currentQuestion + 1;
        if (nextQuestion < questions.length) {
            setCurrentQuestion(nextQuestion);
        } else {
            setShowScore(true);
        }
    };

    const handleResetButtonClick = () => {
        setScore(0);
        setCurrentQuestion(0);
        setShowScore(false);
    };

    return (
        <Card className="text-center" id="quizz">
            <div className="quiz">
                {showScore ? (
                    <div className="score-section">
                        <img src={quizzImg} width="256" alt="Logo" />
                        <p className="mt-2">Você acertou {score} de {questions.length} perguntas!</p>
                        <br />
                        <Button variant="outline-light" className="mb-1" onClick={handleResetButtonClick}>Reiniciar</Button>
                        <br/>
                        <Link to="/login">
                            <Button className="mt-2" variant="outline-light">
                                Login
                            </Button>
                        </Link>
                    </div>
                ) : (
                    <>
                        <div className="question-section mt-3">
                            <div className="question-count">
                                <span>Pergunta {currentQuestion + 1}</span> de {questions.length}
                            </div>
                            <br />
                            <div className="question-text mt-3">{questions[currentQuestion].questionText}</div>
                            <br />
                        </div>
                        <div className="answer-section mt-3">
                            {questions[currentQuestion].answerOptions.map((answerOption) => (
                                <Button className="me-2 ms-2 mt-2 mb-2" variant="outline-light" onClick={() => handleAnswerButtonClick(answerOption.isCorrect)}>{answerOption.answerText}</Button>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </Card>
    );
};

export default Quizz;