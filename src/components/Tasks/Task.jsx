import React, { useState } from "react";
import { useDispatch } from "react-redux";
import EditTaskModal from "../EditTaskModal/EditTaskModal";
import Subtask from "../SubTask/SubTask";
import Comment from "../Comments/Comment";
import {
  updateTaskAction,
  updateTaskOrderAction,
  toggleSubtaskCompletedAction,
} from "../../store/taskReducer";
import { Draggable } from "react-beautiful-dnd";
import styles from "./Task.module.css";

const Task = ({
  task,
  handleFileUpload,
  subtasks,
  addSubTask,
  addComment,
  comments,
  index,
  removeTask,
  taskOrder,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const dispatch = useDispatch();

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = (editedTask) => {
    dispatch(updateTaskAction(editedTask));
    setIsEditing(false);
  };

  const handleDragStart = () => {
    setIsDragging(true);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = () => {
    if (isDragging) {
      const newTaskOrder = [...taskOrder];
      const currentIndex = newTaskOrder.findIndex((t) => t.id === task.id);
      newTaskOrder.splice(currentIndex, 1);
      newTaskOrder.splice(currentIndex, 0, task);
      dispatch(updateTaskOrderAction(newTaskOrder));
      setIsDragging(false);
    }
  };

  // Функция для переключения состояния подзадачи
  const toggleSubtaskCompleted = (subtaskId) => {
    dispatch(toggleSubtaskCompletedAction(subtaskId));
  };

  const taskStatusOptions = ["Queue", "Development", "Done"];
  return (
    <Draggable draggableId={task.id.toString()} index={index}>
      {(provided) => (
        <li
          className={styles.task}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          {isEditing ? (
            <EditTaskModal
              task={task}
              onSave={handleSaveClick}
              onCancel={() => setIsEditing(false)}
            />
          ) : (
            <div>
              <h3>{task.title}</h3>
              <p>{task.description}</p>
            </div>
          )}

          <p>Номер задачи: {task.id}</p>
          <p>Дата создания: {task.creationDate}</p>
          <p>Время в работе: {task.workTime}</p>
          <p>Дата окончания: {task.endDate}</p>
          <p>Приоритет: {task.priority}</p>
          <p>
            Вложенные файлы:{" "}
            {task.attachments.map((attachment, index) => (
              <a
                key={index}
                href={attachment}
                target="_blank"
                rel="noopener noreferrer"
              >
                {attachment}
              </a>
            ))}
          </p>
          <p>
            Текущий статус:{" "}
            <select
              value={task.status}
              onChange={(e) => {
                const newStatus = e.target.value;
                const updatedTask = { ...task, status: newStatus };
                dispatch(updateTaskAction(updatedTask));
              }}
            >
              {taskStatusOptions.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </p>
          <input
            type="file"
            multiple
            onChange={(e) => handleFileUpload(e, task.id)}
          />
          <ul>
            {subtasks.map((subtask) => (
              <Subtask
                key={subtask.id}
                subtask={subtask}
                toggleCompleted={toggleSubtaskCompleted} // Передаем функцию для переключения состояния подзадачи
              />
            ))}
          </ul>
          <div className={styles.task__buttons}>
            <button onClick={() => handleEditClick()}>Редактировать</button>
            <button
              onClick={() =>
                addSubTask(
                  prompt("Введите подзадачу"),
                  prompt("Введите описание подзадачи"),
                  task.id
                )
              }
            >
              Добавить подзадачу
            </button>
            <button
              onClick={() => addComment(prompt("Введите комментарий"), task.id)}
            >
              Добавить комментарий
            </button>
            <ul>
              <h4>Комментарии</h4>
              {comments.map((comment) => (
                <Comment key={comment.id} comment={comment} />
              ))}
              <button onClick={() => removeTask(task.id)}>
                Удалить задачу
              </button>
            </ul>
          </div>
        </li>
      )}
    </Draggable>
  );
};

export default Task;
