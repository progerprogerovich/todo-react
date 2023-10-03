import styles from "./Input.module.scss";

const Input = ({ onTitleChange, onTaskIdChange }) => {
  return (
    <div>
      <input
        type="text"
        placeholder="Поиск по заголовку"
        onChange={(e) => onTitleChange(e.target.value)}
      />
      <input
        type="text"
        placeholder="Поиск по номеру задачи"
        onChange={(e) => onTaskIdChange(e.target.value)}
      />
    </div>
  );
};

export default Input;
