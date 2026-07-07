import { useState } from "react";

interface TodoItem {
  id: string;
  text: string;
  completed: boolean;
}

type Props = {
  type?: "Itinerary" | "Packing List";
};

const TodoComponent = ({ type }: Props) => {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [newTodo, setNewTodo] = useState("");

  const addTodo = () => {
    if (newTodo !== "") {
      const newId = crypto.randomUUID();
      const newTodoItem: TodoItem = {
        id: newId,
        text: newTodo,
        completed: false,
      };
      setTodos([...todos, newTodoItem]);
      setNewTodo("");
    }
  };

  const removeTodo = (id: string) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  const toggleComplete = (id: string) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, completed: !todo.completed };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  return (
    <div className="todo-section">
      <h2 className="todo-title">{type}</h2>

      <div className="todo-input-container">
        <input
          className="todo-input"
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder={`Add ${type?.toLowerCase()} item...`}
        />

        <button className="todo-add-button" onClick={addTodo}>
          Add
        </button>
      </div>

      <ul className="todo-list">
        {todos.map((todo) => (
          <li
            className={`todo-item ${todo.completed ? "completed" : ""}`}
            key={todo.id}
          >
            <input
              className="todo-checkbox"
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleComplete(todo.id)}
            />

            <span className="todo-text">{todo.text}</span>

            <button className="todo-delete" onClick={() => removeTodo(todo.id)}>
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoComponent;
