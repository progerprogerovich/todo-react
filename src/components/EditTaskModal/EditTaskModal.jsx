import React, { useState } from "react";
import styles from "./EditTaskModal.module.scss";

const EditTaskModal = ({ task, onSave, onCancel, isTaskInfoVisible }) => {
  const [editedTitle, setEditedTitle] = useState(task.title);
  const [editedDescription, setEditedDescription] = useState(task.description);
  const [editedCreationDate, setEditedCreationDate] = useState(
    task.creationDate
  );
  const [editedWorkTime, setEditedWorkTime] = useState(task.workTime);
  const [editedEndDate, setEditedEndDate] = useState(task.endDate);
  const [editedPriority, setEditedPriority] = useState(task.priority);

  const handleSaveClick = () => {
    onSave({
      ...task,
      title: editedTitle,
      description: editedDescription,
      creationDate: editedCreationDate,
      workTime: editedWorkTime,
      endDate: editedEndDate,
      priority: editedPriority,
    });
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        {isTaskInfoVisible && (
          <div>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <p>{task.creationDate}</p>
            <p>{task.workTime}</p>
          </div>
        )}
        <div className={styles.modalContent}>
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            className={styles.modalInput}
          />
          <input
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
            className={styles.modalTextarea}
          />
          <input
            type="date"
            value={editedCreationDate}
            onChange={(e) => setEditedCreationDate(e.target.value)}
            className={styles.modalInput}
          />
          <input
            type="text"
            value={editedWorkTime}
            onChange={(e) => setEditedWorkTime(e.target.value)}
            className={styles.modalInput}
          />
          <input
            type="date"
            value={editedEndDate}
            onChange={(e) => setEditedEndDate(e.target.value)}
            className={styles.modalInput}
          />
          <input
            type="text"
            value={editedPriority}
            onChange={(e) => setEditedPriority(e.target.value)}
            className={styles.modalInput}
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
