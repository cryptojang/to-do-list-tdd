import { useState } from "react";

const CreateTodo = ({ onInsert }) => {
  const [createTodo, setCreateTodo] = useState("");

  const onSubmitClear = (e) => {
    e.preventDefault();

    if (!createTodo) return;

    onInsert(createTodo);

    setCreateTodo("");
  };

  return (
    <div className="bg-red-100">
      <form action="" onSubmit={onSubmitClear}>
        <input
          placeholder="할 일 입력!!!"
          type="text"
          value={createTodo}
          onChange={(e) => setCreateTodo(e.target.value)}
        />
        <input type="submit" value="투두생성" />
      </form>
    </div>
  );
};

export default CreateTodo;
