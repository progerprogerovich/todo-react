const initialState = {
  projects: [],
  selectedProjectId: null,
};

export const ADD_PROJECT = "ADD_PROJECT";
export const REMOVE_PROJECT = "REMOVE_PROJECT";
export const SELECT_PROJECT = "SELECT_PROJECT";
export const UPDATE_PROJECT_NAME = "UPDATE_PROJECT_NAME";

export const projectsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PROJECT:
      return { ...state, projects: [...state.projects, action.payload] };
    case REMOVE_PROJECT:
      return {
        ...state,
        projects: state.projects.filter(
          (project) => project.id !== action.payload
        ),
      };
    case UPDATE_PROJECT_NAME:
      const { projectId, newName } = action.payload;
      const updatedProjects = state.projects.map((project) =>
        project.id === projectId ? { ...project, name: newName } : project
      );
      return {
        ...state,
        projects: updatedProjects,
      };
    case SELECT_PROJECT:
      return { ...state, selectedProjectId: action.payload };
    default:
      return state;
  }
};

export const addProjectAction = (payload) => ({ type: ADD_PROJECT, payload });
export const removeProjectAction = (payload) => ({
  type: REMOVE_PROJECT,
  payload,
});
export const selectProjectAction = (projectId) => ({
  type: SELECT_PROJECT,
  payload: projectId,
});

export const updateProjectNameAction = (projectId, newName) => ({
  type: UPDATE_PROJECT_NAME,
  payload: { projectId, newName },
});
