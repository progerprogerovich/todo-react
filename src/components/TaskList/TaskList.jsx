import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Input from "../Input/Input";
import {
  addCommentTaskAction,
  addSubtaskAction,
  addTaskAction,
  removeTaskAction,
  updateTaskOrderAction,
} from "../../store/taskReducer";
import styles from "./TaskList.module.scss";
import Task from "../Tasks/Task";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

const TaskList = () => {
  const tasks = useSelector((state) => state.tasks.tasks);
  const subtasks = useSelector((state) => state.tasks.subtasks);
  const dispatch = useDispatch();
  const selectedProjectId = useSelector(
    (state) => state.projects.selectedProjectId
  );

  const [searchTerm, setSearchTerm] = useState("");
  const [searchTaskId, setSearchTaskId] = useState("");

  const addTask = (title, description, status) => {
    const maxTaskId =
      tasks.length > 0 ? Math.max(...tasks.map((task) => task.id)) : 0;

    const task = {
      id: maxTaskId + 1,
      title,
      description,
      projectId: selectedProjectId,
      creationDate: "",
      workTime: "",
      endDate: "",
      priority: "",
      attachments: [],
      status,
      comments: [],
      subtasks: [],
    };

    dispatch(addTaskAction(task));
  };

  const removeTask = (id) => {
    dispatch(removeTaskAction(id));
  };

  const handleFileUpload = (e, taskId) => {
    const files = e.target.files;
  };

  const filteredTasks = tasks.filter((task) => {
    return (
      task.projectId === selectedProjectId &&
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      task.id.toString().includes(searchTaskId)
    );
  });

  const addSubTask = (title, description, taskId, status) => {
    const maxSubtaskId =
      subtasks.length > 0
        ? Math.max(...subtasks.map((subtask) => subtask.id))
        : 0;

    const subtask = {
      id: maxSubtaskId + 1,
      title,
      description,
      taskId,
    };

    dispatch(addSubtaskAction(subtask, taskId));

    if (status === "Queue") {
    } else if (status === "Development") {
    } else if (status === "Done") {
    }
  };

  const comments = useSelector((state) => state.tasks.comments);

  const addComment = (description, taskId) => {
    const maxCommentId =
      comments.length > 0
        ? Math.max(...comments.map((comment) => comment.id))
        : 0;
    const comment = {
      id: maxCommentId + 1,
      description,
      taskId,
    };
    dispatch(addCommentTaskAction(comment));
  };

  return (
    <div className={styles.container}>
      <h2>Задачи</h2>
      <Input
        onTitleChange={(value) => setSearchTerm(value)}
        onTaskIdChange={(value) => setSearchTaskId(value)}
      />
      <DragDropContext
        onDragEnd={(result) => {
          if (!result.destination) {
            return;
          }
          const newTaskOrder = [...filteredTasks];
          const [movedTask] = newTaskOrder.splice(result.source.index, 1);
          newTaskOrder.splice(result.destination.index, 0, movedTask);
          dispatch(updateTaskOrderAction(newTaskOrder));
        }}
      >
        {["Queue", "Development", "Done"].map((status) => (
          <div key={status}>
            <h3>{status}</h3>
            <Droppable droppableId={status}>
              {(provided) => (
                <ul
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className={styles.task__wrapper}
                >
                  {filteredTasks
                    .filter((task) => task.status === status)
                    .map((task, index) => (
                      <Task
                        key={task.id}
                        task={task}
                        index={index}
                        handleFileUpload={handleFileUpload}
                        subtasks={subtasks.filter(
                          (subtask) => subtask.taskId === task.id
                        )}
                        addSubTask={addSubTask}
                        addComment={addComment}
                        comments={comments.filter(
                          (comment) => comment.taskId === task.id
                        )}
                        removeTask={removeTask}
                        status={status}
                      />
                    ))}
                  {provided.placeholder}
                </ul>
              )}
            </Droppable>
          </div>
        ))}
      </DragDropContext>
      <button
        onClick={() =>
          addTask(
            prompt("Введите задачу"),
            prompt("Введите описание задачи"),
            "Queue"
          )
        }
      >
        Добавить задачу
      </button>
    </div>
  );
};

export default TaskList;
