import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../css/two_q.css";

const questions = [
  { id: 1, text: "2 + 2 = ?" },
  { id: 2, text: "5 + 3 = ?" },
  { id: 3, text: "7 - 4 = ?" },
  { id: 4, text: "10 / 2 = ?" },
  { id: 5, text: "2 + 2 = ?" },
  { id: 6, text: "5 + 3 = ?" },
  { id: 7, text: "7 - 4 = ?" },
  { id: 8, text: "10 / 2 = ?" },
  { id: 9, text: "2 + 2 = ?" },
  { id: 10, text: "5 + 3 = ?" },
  { id: 11, text: "7 - 4 = ?" },
  { id: 12, text: "10 / 2 = ?" },
  { id: 13, text: "2 + 2 = ?" },
  { id: 14, text: "5 + 3 = ?" },
  { id: 15, text: "7 - 4 = ?" },
  { id: 16, text: "10 / 2 = ?" },
];

function TwoQ() {
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [openedQuestions, setOpenedQuestions] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("openedQuestions_page2")) || [];
    setOpenedQuestions(saved);
  }, []);

  const openModal = (question) => {
    setSelectedQuestion(question);

    if (!openedQuestions.includes(question.id)) {
      const updated = [...openedQuestions, question.id];
      setOpenedQuestions(updated);
      localStorage.setItem("openedQuestions_page2", JSON.stringify(updated));
    }
  };

  const closeModal = () => setSelectedQuestion(null);

  const resetAllQuestions = () => {
    setOpenedQuestions([]);
    localStorage.setItem("openedQuestions_page2", JSON.stringify([]));
  };

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

      <h1 className="twoq-title">Savollar</h1>

      <div className="twoq-cards-container">
        {questions.map((q) => (
          <div
            key={q.id}
            className={`twoq-card ${
              openedQuestions.includes(q.id) ? "twoq-opened" : ""
            }`}
            onClick={() => openModal(q)}
          >
            {q.id}
            {openedQuestions.includes(q.id) && (
              <span className="twoq-opened-label">✓</span>
            )}
          </div>
        ))}
      </div>

      {selectedQuestion && (
        <div className="twoq-modal">
          <div className="twoq-modal-content">
            <h2>Savol {selectedQuestion.id}</h2>
            <p>{selectedQuestion.text}</p>

            <button className="twoq-close-btn" onClick={closeModal}>
              Yopish
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default TwoQ;
