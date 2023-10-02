import React, { useState } from "react";
import styles from "./EditTaskModal.module.css";
const EditTaskModal = ({ task, onSave, onCancel, isTaskInfoVisible }) => {
  const [editedTitle, setEditedTitle] = useState(task.title);
  const [editedDescription, setEditedDescription] = useState(task.description);

  const handleSaveClick = () => {
    onSave({
      ...task,
      title: editedTitle,
      description: editedDescription,
    });
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        {isTaskInfoVisible && (
          <div>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
          </div>
        )}
        <div className={styles.modalContent}>
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            className={styles.modalInput}
          />
          <textarea
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
            className={styles.modalTextarea}
          />
          <div>
            <button
              onClick={handleSaveClick}
              className={styles.modalButtonSave}
            >
              Сохранить
            </button>
            <button onClick={onCancel} className={styles.modalButtonCancel}>
              Отмена
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditTaskModal;
