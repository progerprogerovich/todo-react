// ProjectTasks.js
import React from "react";
import { useSelector } from "react-redux";
import Task from "../Tasks/Task";

const ProjectPage = ({ projectId }) => {
  const tasks = useSelector((state) =>
    state.tasks.tasks.filter((task) => task.projectId === projectId)
  );

  return (
    <div>
      <h2>Задачи проекта</h2>
      <ul>
        {tasks.map((task) => (
          <Task key={task.id} task={task} />
        ))}
      </ul>
    </div>
  );
};

export default ProjectPage;
