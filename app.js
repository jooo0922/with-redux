"use strict";

function reducer(state, action) {
  console.log(state, action); // fire 버튼을 눌러서 콘솔이 찍힌 걸 보면 이전의 state값과 dispatch()를 호출하면서 전달한 action 객체가 보임
  if (state === undefined) {
    return { color: "yellow" };
  }

  let newState;
  if (action.type === "CHANGE_COLOR") {
    newState = Object.assign({}, state, { color: "red" });
  }
  return newState;
}
const store = Redux.createStore(reducer); // 생성한 store를 애플리케이션 어디서든 실행할 수 있게 전역변수에 저장해놓음.
console.log(store.getState()); // state 초기값이 잘 저장됐는지 보기 위해 getState()로 store에 저장된 state를 가져와 콘솔에 찍어봄.

function red() {
  const state = store.getState(); // store에 저장된 state값을 가져올 때는 항상 store.getState()를 사용할 것!
  document.querySelector("#red").innerHTML = `
    <div class="container" id="component_red" style="background-color:${state.color}">
      <h1>red</h1>
      <input type="button" value="fire" onclick="
        store.dispatch({type:'CHANGE_COLOR', color:'red'});
      "/>
    </div>
  `;
}
red();

/**
 * 1. Redux.createStore(reducer)
 *
 * 리덕스를 처음 시작할 때는 Redux.createStore()라는 메서드를 이용해서
 * state값들의 저장소를 만드는 것부터 시작해야 함.
 * 이때, reducer 함수를 인자로 전달해줘야 하는데, 이 함수는 은행으로 치면
 * dispatch(창구 직원)에게 받아온 action data를 실제 장부(state)에 기록 및 수정하는 역할을 하는 함수!
 *
 *
 * 2. reducer(state, action)
 *
 * reducer 함수 작성할 때에는, 기존의 state값과 action을 인자로 받도록 약속되어있음.
 * 또한 우리가 createStore로 저장소를 처음 만들 때 그 안에 있는 state의 초기값이 필요함!
 *
 * 그래서 state에 초기값을 줄 때는,
 * reduce 함수가 호출됨과 동시에 state의 값이 정의되어있지 않은 상태이므로,
 * 아래와 같이 초기값을 지정해야 함.
 *
 * if (state === undefined) {
 *    return {key: value};
 *    // state에 값이 지정되어있지 않았을 때에만(즉, 초기화를 위해서 reducer 함수가 최초로 실행되었다는 뜻)
 *    // if block으로 들어와서 state의 초기값을 지정해주는 방식을 사용할 것!
 *    // 위와 같이 해주면 리턴되는 객체가 state의 초기값으로 지정됨.
 * }
 */

/**
 * 1. store.dispatch(action)
 *
 * store.dispatch(action) 메서드를 사용하면 새로운 state 값을 만들거나 변경할 수 있음.
 * 이 메서드를 실행하면, store를 생성할 때 제공한 reducer 함수를 호출하도록 약속되어있음.
 *
 * 이 때, reducer에는 이전의 state값과 전달된 action 객체가 인자로 전달됨.
 * reducer는 두 값을 받아서 빈 객체에 복사한 다음, 새로운 state값으로 리턴해줄 수 있음!
 *
 *
 * 2. action 객체
 *
 * dispatch(action) 이런 식으로 action 객체를 전달할 때,
 * type이라는 값을 반드시 지정해줘야 한다고 함.
 *
 * 왜냐면, 이 type값을 이용해서 reducer 내에서 조건문을 만든 다음,
 * 전달받은 action의 type이 해당하는 값이라면 해당 if block으로 들어온 다음
 * 원하는 작업을 수행하거나 state를 변경해서 리턴해주기 위함이지!
 *
 *
 * 3. reducer 함수에서 state 변경 시 '복사본'을 변경해서 리턴해줄 것!
 *
 * reducer 함수 내에서 state를 변경할 때,
 *
 * state.color = "red";
 *
 * 이렇게 해도 state가 변경이 가능한 건 맞지만, 이런 식으로 state를 변경해버리면
 * Redux의 시간여행 기능, Hot-module-reloading 등 고급기능을 사용할 수 없게 되므로,
 * 이 방법으로 state를 변경하지는 말 것!
 *
 * 대신, let newState; 라는 변수를 선언한 뒤,
 * newState = Object.assign({}, 현재의 state, 변경하려는(덮어쓰려는) state);
 *
 * 이런 식으로 원본 state 객체(두 번째 인자)를 복사하여 빈 객체(첫 번째 인자)에 복사하고,
 * 그 다음 새롭게 덮어쓰려는 state 객체(세 번째 인자)를 전달해주면,
 * 두 번째 객체를 첫 번째 객체에 복사한 뒤, 세 번째 객체도 마찬가지로 복사(덮어쓰기)해줌.
 *
 * 이처럼 state의 원본을 복사한 '복사본'을 수정 및 변경해서 리턴해주면
 * 위에서 말한 고급기능들도 정상적으로 사용 가능하고,
 * 애플리케이션이 예측 가능하게 동작할 수 있음 -> immutability
 */
