import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../css/two_q.css";

const questions = [
  {
    id: 1,
    score: 10,
    text: "Синтаксис 10\nПо дороге домой я … в магазин.\nВошла, зашла, пошла.",
    answer: "Ответ: зашла",
  },
  {
    id: 2,
    score: 20,
    text: "Синтаксис 20\nВот документы, … вы просили.\nКоторые, о которых, которое",
    answer: "Ответ: которые",
  },
  {
    id: 3,
    score: 30,
    text: "Синтаксис 30\nКакая пара слов не является словосочетанием?\nА) в конце января\nБ) придет и принесет\nВ) зимним морозом\nГ) замолчат сразу",
    answer: "Ответ: придет и принесет",
  },
  {
    id: 4,
    score: 40,
    text: "Синтаксис 40\nВ чем отличие понятий НЕВЕЖА-НЕВЕЖДА?",
    answer: "Ответ: НЕВЕЖА - невежливый человек\nНЕВЕЖДА - необразованный человек",
  },
];

function TwoQ() {
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [openedQuestions, setOpenedQuestions] = useState([]);
  const [showAnswer, setShowAnswer] = useState(false);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("openedQuestions_page2")) || [];
    setOpenedQuestions(saved);
  }, []);

  const openModal = (question) => {
    setSelectedQuestion(null);
    setShowAnswer(false);

    // Har safar modalni qayta ochish
    setTimeout(() => setSelectedQuestion(question), 0);

    // LocalStorage ga faqat birinchi marta yozish
    if (!openedQuestions.includes(question.id)) {
      const updated = [...openedQuestions, question.id];
      setOpenedQuestions(updated);
      localStorage.setItem("openedQuestions_page2", JSON.stringify(updated));
    }
  };

  const closeModal = () => setSelectedQuestion(null);
  const closeAnswerModal = () => setShowAnswer(false);
  const resetAllQuestions = () => {
    setOpenedQuestions([]);
    localStorage.setItem("openedQuestions_page2", JSON.stringify([]));
  };

  const formatText = (text) =>
    text.split("\n").map((line, i) => (
      <p key={i} className="modal-line">
        {line}
      </p>
    ));

  return (
    <div className="twoq-page">
      <div className="twoq-top-bar">
        <Link to="/">
          <button className="twoq-home-btn">Home</button>
        </Link>
        <button className="twoq-reset-btn" onClick={resetAllQuestions}>
          Reset All
        </button>
      </div>

      <h1 className="twoq-title">Синтаксис</h1>

      <div className="twoq-cards-container">
        {questions.map((q) => (
          <div
            key={q.id}
            className={`twoq-card ${openedQuestions.includes(q.id) ? "twoq-opened" : ""}`}
            onClick={() => openModal(q)}
          >
            {q.score}
            {openedQuestions.includes(q.id) && <span className="twoq-opened-label">✓</span>}
          </div>
        ))}
      </div>

      {/* Savol modal */}
      {selectedQuestion && (
        <div className="twoq-modal">
          <div className="twoq-modal-content">
            <h2>Вопрос на {selectedQuestion.score} баллов</h2>
            <div className="question-text">{formatText(selectedQuestion.text)}</div>

            <button className="twoq-answer-btn" onClick={() => setShowAnswer(true)}>
              Ответ
            </button>

            <button className="twoq-close-btn" onClick={closeModal}>
              ❌
            </button>
          </div>
        </div>
      )}

      {/* Javob modal */}
      {showAnswer && selectedQuestion && (
        <div className="twoq-modal">
          <div className="twoq-modal-content">
            <h2>Ответ</h2>
            <div className="answer-text">{formatText(selectedQuestion.answer)}</div>
            <button className="twoq-close-btn" onClick={closeAnswerModal}>
              ❌
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default TwoQ;
