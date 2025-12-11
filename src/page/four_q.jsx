import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../css/four_q.css"; // alohida CSS fayl

import geraklImg from "../img/gerakl.jpg";

import yachImg from "../img/OIP.webp";
import jaguarImg from "../img/jaguar.jfif";

const questions4 = [
  {
    id: 1,
    text: "Древнегреческий герой который совершил двенадцать подвигов?",
    answer: "Геракл",
    answerImage: geraklImg,
  },
  {
    id: 2,
    text: "Ни кузнец, ни столяр.\nНи моляр ни плотник,\nА лучший в селе работник.",
    answer: "Конь",
    
  },
  {
    id: 3,
    text: "Кто старший: овес или ячмень?",
    answer: "Ячмень (потому что имеет усы)",
    answerImage: yachImg,
  },
  {
    id: 4,
    text: "Этот пятнистый хищник дал название одному из зарубежных автомобилей?",
    answer: "Ягуар",
    answerImage: jaguarImg,
  },
];


function FourQ() {
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [openedQuestions, setOpenedQuestions] = useState([]);
  const [showAnswer, setShowAnswer] = useState(false);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("openedQuestions_4")) || [];
    setOpenedQuestions(saved);
  }, []);

  const openModal = (question) => {
    setSelectedQuestion(question);
    if (!openedQuestions.includes(question.id)) {
      const updated = [...openedQuestions, question.id];
      setOpenedQuestions(updated);
      localStorage.setItem("openedQuestions_4", JSON.stringify(updated));
    }
  };

  const closeModal = () => {
    setSelectedQuestion(null);
    setShowAnswer(false);
  };

  const resetAllQuestions = () => {
    setOpenedQuestions([]);
    localStorage.setItem("openedQuestions_4", JSON.stringify([]));
  };

  return (
    <div className="fourq-page">
      {/* Top bar */}
      <div className="fourq-top-bar">
        <Link to="/">
          <button className="fourq-home-btn">Home</button>
        </Link>
        <button className="fourq-reset-btn" onClick={resetAllQuestions}>
          Reset All
        </button>
      </div>

      <h1 className="fourq-title">Логические вопросы</h1>

      {/* Question cards */}
      <div className="fourq-cards-container">
        {questions4.map((q) => (
          <div
            key={q.id}
            className={`fourq-card ${openedQuestions.includes(q.id) ? "fourq-opened" : ""}`}
            onClick={() => openModal(q)}
          >
            {q.id}0
            {openedQuestions.includes(q.id) && <span className="fourq-opened-label">✓</span>}
          </div>
        ))}
      </div>

      {/* Question Modal */}
      {selectedQuestion && (
        <div className="fourq-modal">
          <div className="fourq-modal-content">
            <h2>Вопрос {selectedQuestion.id}0 баллов</h2>
            <p style={{ whiteSpace: "pre-wrap" }}>{selectedQuestion.text}</p>

            {/* Savol rasmi */}
            {selectedQuestion.image && (
              <img
                src={selectedQuestion.image}
                alt={`Question ${selectedQuestion.id}`}
                className="fourq-question-image"
              />
            )}

            {/* Javob tugmasi */}
            <button className="fourq-answer-btn" onClick={() => setShowAnswer(true)}>
              Ответ
            </button>

            {/* Close button */}
            <button className="fourq-close-btn" onClick={closeModal}>
              ❌
            </button>
          </div>
        </div>
      )}

      {/* Answer Modal */}
      {showAnswer && selectedQuestion && (
        <div className="fourq-modal">
          <div className="fourq-modal-content">
            <h2>Ответ:</h2>
            <p style={{ whiteSpace: "pre-wrap" }}>{selectedQuestion.answer}</p>

            {/* Javob rasmi faqat mavjud bo'lsa */}
            {selectedQuestion.answerImage && (
              <img
                src={selectedQuestion.answerImage}
                alt={`Answer ${selectedQuestion.id}`}
                className="fourq-answer-image"
              />
            )}

            <button className="fourq-close-btn" onClick={() => setShowAnswer(false)}>
              ❌
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default FourQ;
