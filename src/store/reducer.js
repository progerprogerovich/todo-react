// reducer.js
const initialState = {
  projects: [
    { id: 1, name: "Проект 1" },
    { id: 2, name: "Проект 2" },
    { id: 3, name: "Проект 3" },
  ],
  selectedProjectId: null,
};

export const ADD_PROJECT = "ADD_PROJECT";
export const REMOVE_PROJECT = "REMOVE_PROJECT";
export const SELECT_PROJECT = "SELECT_PROJECT";

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
