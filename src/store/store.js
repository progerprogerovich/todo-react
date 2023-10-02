import { createStore, combineReducers } from "redux";
import { projectsReducer } from "./reducer";
import { tasksReducer } from "./taskReducer";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

const rootReducer = combineReducers({
  projects: projectsReducer,
  tasks: tasksReducer,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer);

export const persistor = persistStore(store);

export default store;
