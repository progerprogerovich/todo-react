import React from "react";
import { Route, Routes } from "react-router-dom";
import TaskList from "./components/TaskList/TaskList";
import ProjectSelectionPage from "./components/Projects/ProjectSelectionPage";

const App = () => {
  return (
    <Routes>
      <Route path="/todo-react" element={<ProjectSelectionPage />} />
      <Route path="/project/:projectId" element={<TaskList />} />
    </Routes>
  );
};

export default App;
