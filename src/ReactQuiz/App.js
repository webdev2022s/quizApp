import { useEffect, useReducer } from "react";
import Header from "../Components/Header";
import logo from "../DateCounter/logo.svg";
import Main from "../Components/Main";
import Loader from "../Components/Loader";
import Error from "../Components/Error";
import Ready from "../Components/Ready";
import Question from "../Components/Question";
import NextButton from "../Components/NextButton";
import Progress from "../Components/Progress";
import Finished from "../Components/Finished";
import Timer from "../Components/Timer";
const initialState = {
  questions: [],
  // 'loading' 'error' 'ready' 'active' 'finished'
  status: "loading",
  backupQuestion: [],
  index: 0,
  answer: [],
  points: 0,
  highScored: JSON.parse(localStorage.getItem("HIGHSCORED")) || 0,
  limitedTimeAnswer: null,
  difficulty: "all",
};

const SECONDS = 30;
function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return {
        ...state,
        questions: action.payload,
        backupQuestion: action.payload,
        status: "ready",
      };
    case "dataFailed":
      return { ...state, status: "error" };

    case "start":
      return {
        ...state,
        status: "active",
        questions:
          state.difficulty === "HARD"
            ? state.backupQuestion
            : state.backupQuestion.filter(
                (question) => question.difficulty === state.difficulty
              ),
        limitedTimeAnswer: state.questions.length * SECONDS,
      };

    case "levelEntry":
      return {
        ...state,
        difficulty: action.payload,
      };
    case "newAnswer":
      const currentQuestion = state.questions.at(state.index);
      const answerExist = state.answer[state.index];
      const collectAnswer = [...state.answer];

      answerExist === action.payload
        ? collectAnswer.splice(state.index, 1, -1)
        : collectAnswer.splice(state.index, 1, action.payload);

      return {
        ...state,
        answer: collectAnswer,
        points:
          action.payload === currentQuestion.correctOption
            ? state.points + currentQuestion.points
            : state.points,
      };
    case "nextQuestions":
      let qAnswer;
      const checkAnswer = state.answer.at(state.index);
      checkAnswer === undefined ? (qAnswer = 1) : (qAnswer = checkAnswer);
      const collectAnswers = [...state.answer];

      return {
        ...state,
        index: state.index + 1,
        answer: collectAnswers,
      };
    case "previousQuestion":
      return { ...state, index: state.index - 1 };
    case "finished":
      return {
        ...state,
        status: "finished",
        highScored:
          state.points > state.highScored ? state.points : state.highScored,
      };
    case "restart":
      return {
        ...initialState,
        questions: state.backupQuestion,
        backupQuestion: state.backupQuestion,
        status: "ready",
        difficulty: "HARD",
      };
    case "timer":
      return {
        ...state,
        limitedTimeAnswer: state.limitedTimeAnswer - 1,
        status: state.limitedTimeAnswer === 0 ? "finished" : state.status,
      };

    default:
      throw new Error("Action Type Unknown");
  }
}

const URL = "http://localhost:9000/questions";

export default function App() {
  const [
    {
      questions,
      status,
      index,
      answer,
      points,
      highScored,
      limitedTimeAnswer,
      difficulty,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  const question = async () => {
    try {
      const res = await fetch(URL);
      const data = await res.json();
      dispatch({ type: "dataReceived", payload: data });
    } catch (err) {
      dispatch({ type: "dataFailed" });
    }
  };
  useEffect(() => {
    question();
    localStorage.setItem("HIGHSCORED", JSON.stringify(highScored));
  }, [highScored, dispatch]);

  return (
    <>
      <div className="app">
        <Header logo={logo} />

        <Main>
          {status === "loading" && <Loader />}
          {status === "error" && <Error status={status} />}
          {status === "ready" && (
            <>
              <Ready
                questions={questions}
                dispatch={dispatch}
                difficulty={difficulty}
              />
            </>
          )}
          {status === "active" && (
            <>
              <Timer
                dispatch={dispatch}
                limitedTimeAnswer={limitedTimeAnswer}
              />
              <Progress
                questions={questions}
                index={index}
                points={points}
                answer={answer}
              />
              <Question
                questions={questions[index]}
                answer={answer}
                dispatch={dispatch}
                index={index}
              />
              <NextButton
                answer={answer}
                dispatch={dispatch}
                index={index}
                questions={questions}
              />
            </>
          )}
          {status === "finished" && (
            <Finished
              points={points}
              questions={questions}
              highScored={highScored}
              dispatch={dispatch}
            />
          )}
        </Main>
      </div>
    </>
  );
}
