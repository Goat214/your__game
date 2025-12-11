import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../css/one_q.css";

const questions = [
  {
    id: 1,
    score: 10,
    text: "Определите род следующих существительных:\nТюль, мозоль, кофе",
    answer: "Тюль (м.р)\nМозоль (ж.р)\nКофе (м.р)",
  },
  {
    id: 2,
    score: 20,
    text: "Образуйте прилагательное от слова «чайка» (морская птица).",
    answer: "Чаячий",
  },
  {
    id: 3,
    score: 30,
    text: "Какое окончание в наречиях: направо, налево, вглубь, вниз?",
    answer: "У наречий нет окончания.",
  },
  {
    id: 4,
    score: 40,
    text:
      "Приставка так же, как в слове расцвет.\n" +
      "Корень такой же, как в слове смотрю.\n" +
      "Суффикс такой же, как в слове хотеть.\n" +
      "Окончание такое же, как в слове иметь.",
    answer: "РАССМОТРЕТЬ",
  },
];

function OneQ() {
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [openedQuestions, setOpenedQuestions] = useState([]);
  const [showAnswer, setShowAnswer] = useState(false);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("openedQuestions")) || [];
    setOpenedQuestions(saved);
  }, []);

  const openModal = (question) => {
    // Modalni har safar majburiy qayta ochish
    setSelectedQuestion(null);
    setShowAnswer(false);
    setTimeout(() => {
      setSelectedQuestion(question);
    }, 0);

    // LocalStorage ga faqat birinchi marta yozish
    if (!openedQuestions.includes(question.id)) {
      const updated = [...openedQuestions, question.id];
      setOpenedQuestions(updated);
      localStorage.setItem("openedQuestions", JSON.stringify(updated));
    }
  };

  const closeModal = () => setSelectedQuestion(null);
  const closeAnswerModal = () => setShowAnswer(false);
  const resetAllQuestions = () => {
    setOpenedQuestions([]);
    localStorage.setItem("openedQuestions", JSON.stringify([]));
  };

  const formatText = (text) => {
    return text.split("\n").map((line, i) => (
      <p key={i} className="modal-line">
        {line}
      </p>
    ));
  };

  return (
    <div className="oneq-page">
      <div className="top-bar">
        <Link to="/">
          <button className="home-btnn">Home</button>
        </Link>
        <button className="reset-btn" onClick={resetAllQuestions}>
          Reset All
        </button>
      </div>

      <h1 className="page-title">Грамматика</h1>

      <div className="cards-container">
        {questions.map((q) => (
          <div
            key={q.id}
            className={`question-card ${
              openedQuestions.includes(q.id) ? "opened" : ""
            }`}
            onClick={() => openModal(q)}
          >
            {q.score}
            {openedQuestions.includes(q.id) && (
              <span className="opened-label">✓</span>
            )}
          </div>
        ))}
      </div>

      {/* SAVOL MODAL */}
      {selectedQuestion && (
        <div className="modal">
          <div className="modal-content">
            <h2>Вопрос на {selectedQuestion.score} баллов</h2>

            <div className="question-text">
              {formatText(selectedQuestion.text)}
            </div>

            <button className="answer-btn" onClick={() => setShowAnswer(true)}>
              Ответ
            </button>

            <button className="close-btn" onClick={closeModal}>
              ❌
            </button>
          </div>
        </div>
      )}

      {/* JAVOB MODAL */}
      {showAnswer && selectedQuestion && (
        <div className="modal">
          <div className="modal-content">
            <h2>Ответ</h2>

            <div className="answer-text">
              {formatText(selectedQuestion.answer)}
            </div>

            <button className="close-btn" onClick={closeAnswerModal}>
              ❌
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default OneQ;
