import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addProjectAction,
  removeProjectAction,
  selectProjectAction,
} from "../../store/projectsReducer";
import styles from "./ProjectSelectionPage.module.scss";

const ProjectSelectionPage = () => {
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const dispatch = useDispatch();

  const projectsState = useSelector((state) => state.projects.projects);

  const maxId =
    projectsState && projectsState.length > 0
      ? Math.max(...projectsState.map((project) => project.id))
      : 0;

  const addProject = (name) => {
    const project = {
      id: maxId + 1,
      name,
    };
    dispatch(addProjectAction(project));
    setSelectedProjectId(project.id);
  };

  const removeProject = (id) => {
    dispatch(removeProjectAction(id));
    setSelectedProjectId(null);
  };

  const handleProjectSelect = (projectId) => {
    setSelectedProjectId(projectId);
    dispatch(selectProjectAction(projectId));
  };

  return (
    <div className={styles.container}>
      <h1>Выберите проект</h1>

      <ul className={styles.project__list}>
        {Array.isArray(projectsState) &&
          projectsState.map((project) => (
            <li key={project.id} className={styles.project__list_item}>
              <Link
                to={`/project/${project.id}`}
                onClick={() => handleProjectSelect(project.id)}
              >
                {project.name}
              </Link>{" "}
              <button
                className={styles.project__remove_button}
                onClick={() => removeProject(project.id)}
              >
                Удалить проект
              </button>
            </li>
          ))}
      </ul>
      <button onClick={() => addProject(prompt("Введите имя проекта"))}>
        Добавить проект
      </button>
    </div>
  );
};

export default ProjectSelectionPage;
