import { fireEvent, render } from "@testing-library/react";
import App from "./App";

describe("<App />", () => {
  it("CreateTodo 렌더링 확인", () => {
    const { getByText } = render(<App />); // 앱 렌더하면 자식의 값까지 확인 가능

    getByText("투두생성");
  });

  it("TodoList 렌더링 확인", () => {
    const { getByTestId } = render(<App />); // 앱 렌더하면 자식의 값까지 확인 가능

    getByTestId("TodoList");
  });

  it("투두 리스트 확인", () => {
    const { getByText } = render(<App />);

    getByText("전화하기");
    getByText("문자하기");
  });

  it("투두 생성 확인", () => {
    const { getByPlaceholderText, getByText } = render(<App />);

    const input = getByPlaceholderText("할 일 입력!!!");
    const submit = getByText("투두생성");

    fireEvent.change(input, {
      target: {
        value: "하이",
      },
    });
    fireEvent.submit(submit);

    getByText("하이");
  });

  it("투두 완료 확인", () => {
    const { getByText } = render(<App />);

    const span = getByText("전화하기");

    fireEvent.click(span);
    expect(span).toHaveClass("line-through");

    fireEvent.click(span);
    expect(span).not.toHaveClass("line-through");
  });

  it("투두 삭제 확인", () => {
    const { getByText, queryByText } = render(<App />);

    const span = getByText("전화하기");
    const button = span.nextSibling;

    fireEvent.click(button);

    const removedSpan = queryByText("전화하기");
    expect(removedSpan).toBeNull();
    const existSpan = queryByText("문자하기");
    expect(existSpan).not.toBeNull();
  });
});
