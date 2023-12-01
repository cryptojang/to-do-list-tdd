import { fireEvent, render } from "@testing-library/react";
import TodoCard from "./TodoCard";

describe("<TodoCard />", () => {
  const sampleTodo = {
    id: 1,
    title: "전화하기",
    isDone: false,
  }; // dummy 데이터 이걸로 아래 테스트 작성하며 활용

  const setup = (props = {}) => {
    const initialProps = { todo: sampleTodo };
    const { getByText } = render(<TodoCard {...initialProps} {...props} />);

    const todo = props.todo || initialProps.todo; // props todo 있으면 쓰고 없으면 initial의 todo 쓰겠다.

    const span = getByText(todo.title);
    const button = getByText("삭제");

    return {
      span,
      button,
    };
  };

  it("span & button 확인", () => {
    const { span, button } = setup();

    expect(span).toBeTruthy();
    expect(button).toBeTruthy();
  });

  it("isDone이 true 일 때 중간줄 표시", () => {
    const { span } = setup({
      todo: {
        id: 2,
        title: "문자하기",
        isDone: true,
      },
    });

    expect(span).toHaveClass("line-through");
  });

  it("isDone이 false일 때 줄 밑줄 제거", () => {
    const { span } = setup();

    expect(span).not.toHaveClass("line-through");
  });

  it("투두 완료 처리", () => {
    const onToggle = jest.fn();
    const { span } = setup({ onToggle });

    fireEvent.click(span);

    expect(onToggle).toHaveBeenCalledWith(sampleTodo.id);
  });

  it("투두 삭제 처리", () => {
    const onDelete = jest.fn();
    const { button } = setup({ onDelete });

    fireEvent.click(button);

    expect(onDelete).toHaveBeenCalledWith(sampleTodo.id);
  });
});
