import React from "react";

const Subtask = ({ subtask, toggleCompleted }) => {
  const subtaskClass = subtask.completed ? "completed" : "";

  return (
    <li className={subtaskClass} key={subtask.id}>
      <h3>{subtask.title}</h3>
      <h3>{subtask.description}</h3>
      <button onClick={() => toggleCompleted(subtask.id)}>
        Пометить как {subtask.completed ? "невыполненную" : "выполненную"}
      </button>
    </li>
  );
};

export default Subtask;
