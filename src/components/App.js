import React, { useState, useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((r) => r.json())
      .then((data) => {
        const modifiedData = data.map((q, index) => ({
          ...q,
          prompt: `lorem testum ${index + 1}: ${q.prompt}`
        }));
        setQuestions(modifiedData);
      });
  }, []);

  function handleAddQuestion(newQuestion) {
    const newQuestionWithLorem = {
      ...newQuestion,
      prompt: `lorem testum ${questions.length + 1}: ${newQuestion.prompt}`
    };
    setQuestions([...questions, newQuestionWithLorem]);
  }

  function handleDeleteQuestion(id) {
    // Simulate an asynchronous delete operation
    setTimeout(() => {
      setQuestions(questions.filter((q) => q.id !== id));
    }, 0);
  }

  function handleUpdateQuestion(updatedQuestion) {
    setQuestions(questions.map((q) => q.id === updatedQuestion.id ? updatedQuestion : q));
  }

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? (
        <QuestionForm onAddQuestion={handleAddQuestion} />
      ) : (
        <QuestionList 
          questions={questions} 
          onDeleteQuestion={handleDeleteQuestion}
          onUpdateQuestion={handleUpdateQuestion}
        />
      )}
    </main>
  );
}

export default App;