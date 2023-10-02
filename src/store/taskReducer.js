const initialState = {
  tasks: [],
  subtasks: [],
  comments: [],
  projectTaskCounters: {},
};

export const ADD_TASK = "ADD_TASK";
export const DELETE_TASK = "DELETE_TASK";
export const ADD_SUBTASK = "ADD_SUBTASK";
export const UPDATE_TASK = "UPDATE_TASK";
export const ADD_COMMENT = "ADD_COMMENT";
export const UPDATE_TASK_ORDER = "UPDATE_TASK_ORDER";
export const TOGGLE_SUBTASK_COMPLETED = "TOGGLE_SUBTASK_COMPLETED";

export const tasksReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TASK:
      const projectTaskCounter =
        state.projectTaskCounters[action.payload.projectId] || 0;
      const newTask = { ...action.payload, id: projectTaskCounter + 1 };
      const updatedProjectTaskCounter = projectTaskCounter + 1;
      const updatedTaskList = [...state.tasks, newTask];
      return {
        ...state,
        tasks: updatedTaskList,
        projectTaskCounters: {
          ...state.projectTaskCounters,
          [action.payload.projectId]: updatedProjectTaskCounter,
        },
      };
    case DELETE_TASK:
      const updatedTasks = state.tasks.filter(
        (task) => task.id !== action.payload
      );
      return {
        ...state,
        tasks: updatedTasks.map((task, index) => ({ ...task, id: index + 1 })),
      };
    case ADD_SUBTASK:
      return { ...state, subtasks: [...state.subtasks, action.payload] };
    case UPDATE_TASK:
      const updatedTaskIndex = state.tasks.findIndex(
        (task) => task.id === action.payload.id
      );
      const updatedTasksArray = [...state.tasks];
      updatedTasksArray[updatedTaskIndex] = action.payload;
      return { ...state, tasks: updatedTasksArray };
    case ADD_COMMENT:
      return { ...state, comments: [...state.comments, action.payload] };
    case UPDATE_TASK_ORDER:
      return { ...state, tasks: action.payload };
    case TOGGLE_SUBTASK_COMPLETED:
      const subtaskIndex = state.subtasks.findIndex(
        (subtask) => subtask.id === action.payload
      );
      const updatedSubtasks = [...state.subtasks];
      updatedSubtasks[subtaskIndex] = {
        ...updatedSubtasks[subtaskIndex],
        completed: !updatedSubtasks[subtaskIndex].completed,
      };
      return { ...state, subtasks: updatedSubtasks };
    default:
      return state;
  }
};

export const addTaskAction = (payload) => ({ type: ADD_TASK, payload });
export const removeTaskAction = (payload) => ({ type: DELETE_TASK, payload });
export const addSubtaskAction = (payload) => ({ type: ADD_SUBTASK, payload });
export const updateTaskAction = (updatedTask) => ({
  type: UPDATE_TASK,
  payload: updatedTask,
});
export const addCommentTaskAction = (payload) => ({
  type: ADD_COMMENT,
  payload,
});
export const updateTaskOrderAction = (newTaskOrder) => ({
  type: UPDATE_TASK_ORDER,
  payload: newTaskOrder,
});
export const toggleSubtaskCompletedAction = (subtaskId) => ({
  type: TOGGLE_SUBTASK_COMPLETED,
  payload: subtaskId,
});
