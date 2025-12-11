import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../css/tree_q.css";

const questions = [
  {
    id: 1,
    text: "Чей это портрет?",
    answer: "И. А. Крылова",
    image: "src/img/500px-Ivan_Krylov.jpg",
  },
  {
    id: 2,
    text: "Сторож быстро достал платок и положил его на руку.\nКакому герою принадлежат эти слова, из какого произведения они взяты?",
    answer: "Сигнал, Семен",
  },
  {
    id: 3,
    text: "Какие главные герои в сказке «Каша из топора»?",
    answer: "В сказке два героя. \nСолдат-умный, хитрый.\nСтаруха-жадная и глупая.",
  },
  {
    id: 4,
    text: "Узнай писателя по портрету",
    image: "src/img/four__qimg.png",
    answerImage: "src/img/answerQ.png",
  },
];

function ThreeQ() {
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [openedQuestions, setOpenedQuestions] = useState([]);
  const [showAnswer, setShowAnswer] = useState(false);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("openedQuestions_page3")) || [];
    setOpenedQuestions(saved);
  }, []);

  const openModal = (question) => {
    setSelectedQuestion(question);
    if (!openedQuestions.includes(question.id)) {
      const updated = [...openedQuestions, question.id];
      setOpenedQuestions(updated);
      localStorage.setItem("openedQuestions_page3", JSON.stringify(updated));
    }
  };

  const closeModal = () => {
    setSelectedQuestion(null);
    setShowAnswer(false);
  };

  const resetAllQuestions = () => {
    setOpenedQuestions([]);
    localStorage.setItem("openedQuestions_page3", JSON.stringify([]));
  };

  return (
    <div className="threeq-page">
      {/* Top bar */}
      <div className="threeq-top-bar">
        <Link to="/">
          <button className="threeq-home-btn">Home</button>
        </Link>
        <button className="threeq-reset-btn" onClick={resetAllQuestions}>
          Reset All
        </button>
      </div>

      {/* Page title */}
      <h1 className="threeq-title">Писатели и герои</h1>

      {/* Question cards */}
      <div className="threeq-cards-container">
        {questions.map((q) => (
          <div
            key={q.id}
            className={`threeq-card ${openedQuestions.includes(q.id) ? "threeq-opened" : ""}`}
            onClick={() => openModal(q)}
          >
            {q.id}0
            {openedQuestions.includes(q.id) && (
              <span className="threeq-opened-label">✓</span>
            )}
          </div>
        ))}
      </div>

      {/* Question Modal */}
      {selectedQuestion && (
        <div className="threeq-modal">
          <div className="threeq-modal-content">
            <h2>Вопрос на {selectedQuestion.id}0 баллов</h2>
            <p style={{ whiteSpace: "pre-wrap" }}>{selectedQuestion.text}</p>

            {/* Savol rasmi */}
            {selectedQuestion.image && (
              <img
                src={selectedQuestion.image}
                alt={`Question ${selectedQuestion.id}`}
                className="threeq-question-image"
              />
            )}

            {/* Javob tugmasi */}
            <button
              className="threeq-answer-btn"
              onClick={() => setShowAnswer(true)}
            >
              Ответ
            </button>

            {/* Close button */}
            <button className="threeq-close-btn" onClick={closeModal}>
              ❌
            </button>
          </div>
        </div>
      )}

      {/* Answer Modal */}
      {showAnswer && selectedQuestion && (
        <div className="threeq-modal">
          <div className="threeq-modal-content">
            <h2>Ответ:</h2>
            <p style={{ whiteSpace: "pre-wrap" }}>{selectedQuestion.answer}</p>

            {/* Javob rasmi faqat mavjud bo'lsa */}
            {selectedQuestion.answerImage && (
              <img
                src={selectedQuestion.answerImage}
                alt={`Answer ${selectedQuestion.id}`}
                className="threeq-answer-image"
              />
            )}

            {/* Close button */}
            <button
              className="threeq-close-btn"
              onClick={() => setShowAnswer(false)}
            >
              ❌
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ThreeQ;
