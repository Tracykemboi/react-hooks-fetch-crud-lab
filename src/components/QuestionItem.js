import React from "react";

function QuestionItem({ question, onDeleteQuestion, onUpdateQuestion }) {
  const { id, prompt, answers, correctIndex } = question;

  function handleDelete() {
    onDeleteQuestion(id);
  }

  function handleCorrectAnswerChange(event) {
    const updatedQuestion = {
      ...question,
      correctIndex: parseInt(event.target.value),
    };
    onUpdateQuestion(updatedQuestion);
  }

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>{prompt}</h5>
      <label>
        Correct Answer:
        <select 
          value={correctIndex} 
          onChange={handleCorrectAnswerChange}
        >
          {answers.map((answer, index) => (
            <option key={index} value={index}>
              {answer}
            </option>
          ))}
        </select>
      </label>
      <button onClick={handleDelete}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;