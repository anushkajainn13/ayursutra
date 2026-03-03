import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Stylesheet/PrakritiQuiz.css";

const questions = [
  {
    id: 1,
    text: "How would you describe your physical frame?",
    options: [
      { label: "Thin, bony, or very tall/short", type: "vata" },
      { label: "Medium build, athletic, or well-proportioned", type: "pitta" },
      { label: "Large frame, sturdy, or prone to weight gain", type: "kapha" }
    ]
  },
  {
    id: 2,
    text: "How is your skin usually?",
    options: [
      { label: "Dry, rough, or cold to the touch", type: "vata" },
      { label: "Oily, sensitive, or prone to redness", type: "pitta" },
      { label: "Thick, soft, moist, and cool", type: "kapha" }
    ]
  },
  {
    id: 3,
    text: "How do you typically react to stress?",
    options: [
      { label: "I get anxious, worried, or fearful", type: "vata" },
      { label: "I get irritable, angry, or impatient", type: "pitta" },
      { label: "I remain calm, steady, or detached", type: "kapha" }
    ]
  },
  {
    id: 4,
    text: "What best describes your sleep pattern?",
    options: [
      { label: "Light sleeper, often interrupted", type: "vata" },
      { label: "Moderate, but I feel hot at night", type: "pitta" },
      { label: "Deep, long sleeper, hard to wake up", type: "kapha" }
    ]
  }
];

const PrakritiQuiz = () => {
  const [step, setStep] = useState(0);
  const [scores, setScores] = useState({ vata: 0, pitta: 0, kapha: 0 });
  const navigate = useNavigate();

  const handleAnswer = (type) => {
    const newScores = { ...scores, [type]: scores[type] + 1 };
    setScores(newScores);

    if (step < questions.length - 1) {
      // अगले सवाल पर जाएं
      setStep(step + 1);
    } else {
      // 1. रिज़ल्ट कैलकुलेट करें
      const finalResult = Object.keys(newScores).reduce((a, b) => 
        newScores[a] > newScores[b] ? a : b
      );

      // 2. Prakriti को सेव करें
      localStorage.setItem("userPrakriti", finalResult);
      localStorage.setItem("hasConsulted", "true");
      // 3. बिना रुके सीधे Chatbot/Recommendation पेज पर भेज दें
      navigate("/patient/recommendations");
    }
  };

  return (
    <div className="quiz-page">
      <div className="quiz-container">
        <div className="quiz-header">
          <span>Question {step + 1} of {questions.length}</span>
          <div className="progress-bar-bg">
            <div className="progress-bar-fill" style={{ width: `${((step + 1) / questions.length) * 100}%` }}></div>
          </div>
        </div>
        <h2 className="question-text">{questions[step].text}</h2>
        <div className="options-grid">
          {questions[step].options.map((opt, i) => (
            <button key={i} className="option-btn" onClick={() => handleAnswer(opt.type)}>
              {opt.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PrakritiQuiz;