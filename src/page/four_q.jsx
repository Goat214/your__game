import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../css/four_q.css";

const questions4 = [
  { id: 1, text: "12 + 8 = ?" },
  { id: 2, text: "15 - 6 = ?" },
  { id: 3, text: "3 × 4 = ?" },
  { id: 4, text: "20 / 5 = ?" },
  { id: 5, text: "9 + 7 = ?" },
  { id: 6, text: "18 - 9 = ?" },
  { id: 7, text: "6 × 2 = ?" },
  { id: 8, text: "16 / 4 = ?" },
];

function FourQ() {
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [openedQuestions, setOpenedQuestions] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("openedQuestions4")) || [];
    setOpenedQuestions(saved);
  }, []);

  const openModal = (question) => {
    setSelectedQuestion(question);

    if (!openedQuestions.includes(question.id)) {
      const updated = [...openedQuestions, question.id];
      setOpenedQuestions(updated);
      localStorage.setItem("openedQuestions4", JSON.stringify(updated));
    }
  };

  const closeModal = () => setSelectedQuestion(null);

  const resetAllQuestions = () => {
    setOpenedQuestions([]);
    localStorage.setItem("openedQuestions4", JSON.stringify([]));
  };

  return (
    <div className="fourq-page">
      <div className="top-bar">
        <Link to="/">
          <button className="home-btnn">Home</button>
        </Link>
        <button className="reset-btn" onClick={resetAllQuestions}>
          Reset All
        </button>
      </div>

      <h1 className="page-title">Savollar 4</h1>

      <div className="cards-container">
        {questions4.map((q) => (
          <div
            key={q.id}
            className={`question-card ${openedQuestions.includes(q.id) ? "opened" : ""}`}
            onClick={() => openModal(q)}
          >
            {q.id}
            {openedQuestions.includes(q.id) && (
              <span className="opened-label">✓</span>
            )}
          </div>
        ))}
      </div>

      {selectedQuestion && (
        <div className="modal">
          <div className="modal-content">
            <h2>Savol {selectedQuestion.id}</h2>
            <p>{selectedQuestion.text}</p>
            <button className="close-btn" onClick={closeModal}>
              Yopish
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default FourQ;
