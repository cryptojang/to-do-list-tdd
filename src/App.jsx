import { useState } from "react";
import CreateTodo from "./components/CreatTodo";
import TodoList from "./components/TodoList";

const initalTodos = [
  {
    id: 1,
    title: "전화하기",
    isDone: false,
  },
  {
    id: 2,
    title: "문자하기",
    isDonge: false,
  },
];

const App = () => {
  const [todos, setTodos] = useState(initalTodos);

  const onInsert = (createTodo) => {
    setTodos([
      ...todos,
      { id: todos.length + 1, title: createTodo, isDone: false },
    ]);
  };

  const onToggle = (todoId) => {
    let temp = todos.map((v, i) => {
      if (v.id === todoId) {
        return { id: v.id, title: v.title, isDone: !v.isDone };
      } else {
        return v;
      }
    });

    setTodos(temp);
  };

  const onDelete = (todoId) => {
    const deleted = todos.filter((v) => {
      if (v.id !== todoId) {
        return v;
      }
    });

    setTodos(deleted);
  };

  return (
    <>
      <CreateTodo onInsert={onInsert} />
      <TodoList todos={todos} onToggle={onToggle} onDelete={onDelete} />
    </>
  );
};

export default App;
