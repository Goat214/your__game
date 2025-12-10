import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../css/tree_q.css";

const questions = [
  { id: 1, text: "9 + 1 = ?" },
  { id: 2, text: "4 + 6 = ?" },
  { id: 3, text: "12 - 2 = ?" },
  { id: 4, text: "8 / 2 = ?" },
  { id: 5, text: "3 × 3 = ?" },
  { id: 6, text: "7 + 5 = ?" },
  { id: 7, text: "15 - 5 = ?" },
  { id: 8, text: "20 / 4 = ?" },
  { id: 9, text: "6 × 2 = ?" },
  { id: 10, text: "10 + 10 = ?" },
  { id: 11, text: "9 - 3 = ?" },
  { id: 12, text: "18 / 3 = ?" },
  { id: 13, text: "5 × 5 = ?" },
  { id: 14, text: "3 + 7 = ?" },
  { id: 15, text: "14 - 9 = ?" },
  { id: 16, text: "16 / 4 = ?" },
];

function ThreeQ() {
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [openedQuestions, setOpenedQuestions] = useState([]);

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

  const closeModal = () => setSelectedQuestion(null);

  const resetAllQuestions = () => {
    setOpenedQuestions([]);
    localStorage.setItem("openedQuestions_page3", JSON.stringify([]));
  };

  return (
    <div className="threeq-page">
      <div className="threeq-top-bar">
        <Link to="/">
          <button className="threeq-home-btn">Home</button>
        </Link>
        <button className="threeq-reset-btn" onClick={resetAllQuestions}>
          Reset All
        </button>
      </div>

      <h1 className="threeq-title">Savollar</h1>

      <div className="threeq-cards-container">
        {questions.map((q) => (
          <div
            key={q.id}
            className={`threeq-card ${
              openedQuestions.includes(q.id) ? "threeq-opened" : ""
            }`}
            onClick={() => openModal(q)}
          >
            {q.id}
            {openedQuestions.includes(q.id) && (
              <span className="threeq-opened-label">✓</span>
            )}
          </div>
        ))}
      </div>

      {selectedQuestion && (
        <div className="threeq-modal">
          <div className="threeq-modal-content">
            <h2>Savol {selectedQuestion.id}</h2>
            <p>{selectedQuestion.text}</p>
            <button className="threeq-close-btn" onClick={closeModal}>
              Yopish
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ThreeQ;
