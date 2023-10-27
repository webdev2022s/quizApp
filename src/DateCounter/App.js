// import logo from "./logo.svg";
// import "./App.css";
// import { useReducer } from "react";

// const initialState = { value: 0, range: 1 };

// function reducer(state, action) {
//   console.log(state, action);

//   switch (action.type) {
//     case "dec":
//       return { ...state, value: state.value - state.range };
//     case "inc":
//       return { ...state, value: state.value + state.range };
//     case "setCount":
//       return { ...state, value: action.payload };
//     case "inputValue":
//       return { ...state, range: action.payload };
//     case "reset":
//       return initialState;
//     default:
//       throw new Error("Unknown Action Type");
//   }
// }

// function App() {
//   const [state, dispatch] = useReducer(reducer, initialState);
//   const { value, range } = state;
//   console.log(state);
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <input
//           type="range"
//           min={1}
//           max={10}
//           value={range}
//           name="volume"
//           onChange={(e) =>
//             dispatch({ type: "inputValue", payload: Number(e.target.value) })
//           }
//         />
//         {range}
//         <div>
//           <Button
//             label="-"
//             clickFunction={() => dispatch({ type: "dec", payload: range })}
//           />
//           <Input
//             value={value}
//             clickFunction={(e) =>
//               dispatch({ type: "setCount", payload: Number(e.target.value) })
//             }
//           />
//           <Button
//             label="+"
//             clickFunction={() => dispatch({ type: "inc", payload: range })}
//           />
//         </div>
//         <DateCounter value={value} />
//         <Button
//           label="Reset"
//           clickFunction={() => dispatch({ type: "reset", payload: 0 })}
//         />
//       </header>
//     </div>
//   );
// }

// export default App;

// function Button({ label = "click", clickFunction, className }) {
//   return (
//     <>
//       <button className={className} onClick={clickFunction}>
//         {label}
//       </button>
//     </>
//   );
// }

// function Input({ type = "text", clickFunction, value, className, children }) {
//   return (
//     <>
//       <input
//         tpye={type}
//         value={value}
//         onChange={clickFunction}
//         className={className}
//       />
//       {children}
//     </>
//   );
// }

// function DateCounter({ value }) {
//   const date = new Date();
//   date.setDate(date.getDate() + value);
//   return (
//     <>
//       <div>{date.toDateString()}</div>
//     </>
//   );
// }

import { useReducer } from "react";

const initialState = { difficulty: 0 };

function reducer(state, action) {
  switch (action.type) {
    case "level":
      return { ...state, difficulty: action.payload };
    default:
      throw new Error("UNKNOWNs");
  }
}
export default function App() {
  const [{ difficulty }, dispatch] = useReducer(reducer, initialState);
  return (
    <div className="btn">
      <label htmlFor="level"> Select Difficulty: </label>
      <select
        value={difficulty}
        onChange={(e) =>
          dispatch({
            type: "level",
            payload: e.target.value,
          })
        }
      >
        <option value="es">EASY</option>
        <option value="me">MEDIUM</option>
        <option value="har">HARD</option>
      </select>
    </div>
  );
}
