import React from "react";
import { Route, Routes } from "react-router-dom";
import ProjectSelectionPage from "./components/Projects/ProjectSelectionPage";
import TaskList from "./components/TaskList/TaskList";

const App = () => {
  return (
    <Routes>
      <Route path="/todo-react" element={<ProjectSelectionPage />} />
      <Route path="/project/:projectId" element={<TaskList />} />
    </Routes>
  );
};

export default App;
