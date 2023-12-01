import { fireEvent, render } from "@testing-library/react";
import CreateTodo from "./CreatTodo";

describe("<CreateTodo />", () => {
  //중복제거
  const setup = (props = {}) => {
    const { getByPlaceholderText, getByText } = render(
      <CreateTodo {...props} />
    ); ///,,,props 있으면 있는 대로 들어가고 없으면 없는대로 처리.  // 꺼내오는 문법

    const input = getByPlaceholderText("할 일 입력!!!");
    const submit = getByText("투두생성");

    return {
      // it에서 사용할 애들 배출
      input,
      submit,
    };
  };

  //ui 존재여부 테스트
  it("input & button 확인", () => {
    const { input, submit } = setup();

    expect(input).toBeTruthy(); // 위의 값이 존재하는지 물어보는 toBeTruthy()
    expect(submit).toBeTruthy();
  });

  it("input 입력값 확인", () => {
    const { input } = setup();

    fireEvent.change(input, {
      //input에 담는 이벤트 실행시킨 것이랍니다.
      target: {
        value: "전화하기",
      },
    });

    expect(input).toHaveAttribute("value", "전화하기");
  });

  it("투두생성", () => {
    const onInsert = jest.fn(); //목업(가짜) 함수 만듬
    const { input, submit } = setup({ onInsert }); //꺼내오는 문법

    fireEvent.click(submit);

    expect(input).toHaveAttribute("value", "");
  });
});
